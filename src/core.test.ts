import {get} from 'svelte/store';
import {locale, _, translations, clear, locales} from './core';

const translate = (message: string, interpolation?: any) => get(_)(message, interpolation);

beforeEach(() => {
  clear();
  translations.update({
    en: {
      name: 'Name',
    },
    pt: {
      name: 'Nome',
    },
  });
  locale.set('en');
});

describe('#translate', () => {
  it('basic example should work', () => {
    expect(translate('name')).toBe('Name');
  });

  it('should set locale', () => {
    expect(get(locale)).toBe('en');
    expect(translate('name')).toBe('Name');
    locale.set('pt');
    expect(get(locale)).toBe('pt');
    expect(translate('name')).toBe('Nome');
  });

  it('should extend translations', () => {
    translations.update({
      en: {
        hello: 'hello',
      },
    });
    expect(translate('name')).toBe('Name');
    expect(translate('hello')).toBe('hello');
  });

  it('should translate nested keys', () => {
    translations.update({
      en: {
        foo: {
          bar: {
            baz: 'hello, {name}',
          },
        },
      },
    });
    expect(translate('foo.bar.baz', {name: 'john'}))
      .toBe('hello, john');
  });

  it('should return path if key is missing', () => {
    expect(translate('missing')).toBe('missing');
  });

  it('should warn if locale messages are missing', () => {
    console.error = jest.fn();
    const log = console.error as jest.Mock;
    locale.set('ru');

    expect(log).toHaveBeenCalledWith('[svelte-intl] Couldn\'t find the "ru" locale.');
    log.mockRestore();
  });

  it('subscribe should work', (done) => {
    const unsubscribe = _.subscribe((format) => {
      if (format('name') === 'Name') {
        return;
      }
      expect(translate('name')).toBe('Nome');
      unsubscribe();
      done();
    });
    locale.set('pt');
  });
  test('#locales', () => {
    expect(get(locales)).toEqual(['en', 'pt']);
    translations.update({
      ru: {
        name: 'название',
      },
    });
    expect(get(locales)).toEqual(['en', 'pt', 'ru']);
  });
});
