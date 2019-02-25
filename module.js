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
  translations, locale
} = { translations: {} }) {
  let currentLocale;

  const getFormattedMessage = (
    path,
    interpolations
  ) => {
    const message = getPath(translations[currentLocale], path);
    if (!message) return path;

    return formatMessage(message, interpolations);
  };

  store.on('locale', newLocale => {
    if (!(newLocale in translations)) {
      console.error(`[svelte-intl] Couldn't find the "${newLocale}" locale.`);
      return;
    }

    formatMessage.setup({
      locale: newLocale,
      translations,
      missingTranslation: 'ignore'
    });

    currentLocale = newLocale;
    store.set({
      locale: newLocale,
      t: getFormattedMessage
    });
  });

  store.intl = {
    setLocale(newLocale) {
      store.fire('locale', newLocale);
    },
    extendTranslations(newTranslations) {
      translations = merge(translations, newTranslations);
    }
  };

  if (locale) {
    store.intl.setLocale(locale);
  }

  return store;
}
