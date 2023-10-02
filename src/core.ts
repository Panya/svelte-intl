import {writable, derived, get} from 'svelte/store';
import formatMessage, {SetupOptions} from 'format-message';
import {flatObject, DeepStringObj} from './util';

export interface Translations {
  [key: string]: DeepStringObj
}

const flatTranslation = (translations: Translations) => Object.keys(translations).reduce(
  (acc, key) => ({...acc, [key]: flatObject(translations[key])}),
  {} as any);

const merge = (obj1 = {} as any, obj2: any): any => Object.keys(obj2).reduce(
  (acc, key) => {
    if (obj2[key] !== null && typeof obj2[key] === 'object') {
      acc[key] = merge(acc[key], obj2[key]);
    } else {
      acc[key] = obj2[key];
    }
    return acc;
  },
  obj1);

function createMergeableStore<T>(defaultValue: any) {
  const {subscribe, set, update} = writable<T>(defaultValue);

  const updateMerging = (newTranslations: T) => update($translations =>
    merge($translations, newTranslations));

  return {
    set,
    subscribe,
    update: updateMerging,
  };
}

export const defaultOptions: SetupOptions = {
  missingTranslation: 'ignore',
};

export const options = createMergeableStore<SetupOptions>(defaultOptions);
export const translations = createMergeableStore<Translations>({});
export const locales = derived(translations, $translations => Object.keys($translations));

const createLocale = () => {
  const {subscribe, set, update} = writable<string>('');

  const setLocale = (newLocale: string) => {
    if (newLocale !== '' && !get(translations)[newLocale]) {
      console.error(`[svelte-intl] Couldn't find the "${newLocale}" locale.`);
      return false;
    }
    set(newLocale);
    return true;
  };
  return {
    subscribe,
    update,
    set: setLocale,
  };
};

export const locale = createLocale();

export const translate = derived([locale, translations, options], (stores) => {
  const [$locale, $translations, $options] = stores;
  formatMessage.setup({
    ...$options,
    locale: $locale,
    translations: flatTranslation($translations),
  });
  return formatMessage;
});

export const _ = translate;

/** For tests */
export const clear = () => {
  locale.set('');
  translations.set({});
  options.set(defaultOptions);
};
