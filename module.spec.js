const { intl } = require('.');
const { Store } = require('svelte/store.umd');

describe('intl', () => {
  it('should start with a clean store', () => {
    const store = new Store();
    const { _, locale } = store.get();

    expect(locale).toBeFalsy();
    expect(_).toBeFalsy();
  });

  it('should return decorated store', () => {
    const store = intl(new Store());

    expect(store.intl.setLocale).toBeInstanceOf(Function);
    expect(store.intl.extendLocales).toBeInstanceOf(Function);
  });

  it('should set locale', () => {
    const store = intl(new Store(), { locales: { en: {} } });
    store.intl.setLocale('en');
    const { _, locale } = store.get();

    expect(locale).toBe('en');
    expect(_).toBeInstanceOf(Function);
  });

  it('should extend locales', () => {
    const store = intl(new Store(), { locales: { en: {} } });
    store.intl.setLocale('en');
    store.intl.extendLocales({
      en: {
        hello: 'hello',
        message: 'message'
      }
    });
    const { _ } = store.get();

    expect(_('hello')).toBe('hello');
    expect(_('message')).toBe('message');
  });

  it('should translate nested keys', () => {
    const store = intl(new Store(), { locales: { en: {} } });
    store.intl.setLocale('en');
    store.intl.extendLocales({
      en: {
        foo: {
          bar: {
            baz: 'hello, {name}'
          }
        }
      }
    });
    const { _ } = store.get();

    expect(
      _('foo.bar.baz', { name: 'john' })
    ).toBe('hello, john');
  });

  it('should return path if key is missing', () => {
    const store = intl(new Store(), { locales: { en: {} } });
    store.intl.setLocale('en');
    store.intl.extendLocales({
      en: {
        foo: {
          bar: {
            baz: 'hello, {name}'
          }
        }
      }
    });
    const { _ } = store.get();

    expect(_('foo.baz')).toBe('foo.baz');
  });

  it('should warn if locale messages are missing', () => {
    const store = intl(new Store());
    console.error = jest.fn();
    store.intl.setLocale('ru');

    expect(console.error).toHaveBeenCalledWith('[svelte-intl] Couldn\'t find the "ru" locale.');
    console.error.mockRestore();
  });

  it('should set locale from options', () => {
    const store = intl(new Store(), {
      locales: {
        ru: {}
      },
      locale: 'ru'
    });

    expect(store.get().locale).toBe('ru');
  });
});
