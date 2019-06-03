import { locales, locale } from './core'
import { get } from 'svelte/store'

export const getBrowserLocale = (defaultLocale = 'en') => {
  if (typeof window === 'undefined') return defaultLocale // ssr or node (sapper)

  const target = window.navigator.language || window.navigator.languages[0]
  if (target) {
    const currentLocales = get(locales)
    if (currentLocales.includes(target)) return target // exact match

    const bestMatch = currentLocales.find(locale => target.startsWith(locale))
    if (bestMatch) return bestMatch // en-US -> en
  }

  const currentLocale = get(locale)
  return currentLocale || defaultLocale // default to current or param
}
