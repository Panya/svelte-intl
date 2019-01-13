import formatMessage from 'format-message';

const getPath = (obj, path) => path.split('.').reduce((acc, key) => (
  key in acc ? acc[key] : null
), obj);

const merge = (obj1 = {}, obj2 = {}) => (
  Object.keys(obj2).reduce((acc, key) => {
    if (obj2[key] !== null && typeof obj2[key] === 'object') {
      acc[key] = merge(acc[key], obj2[key]);
    } else {
      acc[key] = obj2[key];
    }
    return acc;
  }, obj1)
);

export function intl(store, {
  locales, locale
} = { locales: {} }) {
  let currentLocale;

  const getFormattedMessage = (
    path,
    interpolations
  ) => {
    const message = getPath(locales[currentLocale], path);
    if (!message) return path;

    return formatMessage(message, interpolations);
  };

  store.on('locale', newLocale => {
    if (!(newLocale in locales)) {
      console.error(`[svelte-intl] Couldn't find the "${newLocale}" locale.`);
      return;
    }

    formatMessage.setup({
      locale: currentLocale,
      translations: locales
    });

    currentLocale = newLocale;
    store.set({
      locale: newLocale,
      _: getFormattedMessage
    });
  });

  if (locale) {
    store.fire('locale', locale);
  }

  store.intl = {
    setLocale(locale) {
      store.fire('locale', locale);
    },
    extendLocales(newLocales) {
      locales = merge(locales, newLocales);
    }
  };

  return store;
}
