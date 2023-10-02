import {locales, locale} from './core';
import {get} from 'svelte/store';

interface IENavigatorLanguage  {
  userLanguage?: string
}

export const getBrowserLocale = (defaultLocale = 'en') => {
  const targets = typeof window === 'undefined'
    ? [defaultLocale]  // there is no window (sapper | node/webpack)
    : window.navigator.languages || // user language preferences list
      [
        (window.navigator as IENavigatorLanguage).userLanguage || // IE 10-
        window.navigator.language, // browser ui language
      ];

  const currentLocales = get(locales);

  for (let i = 0; i < targets.length; i = i + 1) {
    if (currentLocales.includes(targets[i])) return targets[i]; // exact match

    const bestMatch = currentLocales.find((locale: any) => targets[i].startsWith(locale));
    if (bestMatch) return bestMatch; // en-US -> en
  }

  const currentLocale = get(locale);
  return currentLocale || currentLocales[0]; // default to current or just first
};
