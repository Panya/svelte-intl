## svelte-intl

[![Build Status](https://travis-ci.org/Panya/svelte-intl.svg?branch=svelte2)](https://travis-ci.org/Panya/svelte-intl)
[![Package Size](https://badgen.net/bundlephobia/minzip/svelte-intl)](https://bundlephobia.com/result?p=svelte-intl@0.1.0)

Internationalize your Svelte 2 apps using [format-message](https://github.com/format-message/format-message).

```js
import { intl } from 'svelte-intl';
import { Store } from 'svelte';

const store = intl(new Store(), {
  locale: 'en',
  translations: {
    en: {
      hello: 'Hello, {name}'
    }
  }
});

store.intl.extendTranslations({
  ru: {
    hello: 'Привет, {name}'
  }
});

const { t } = store.get();

console.log(t('hello', { name: 'John' })); // => 'Hello, John'

store.intl.setLocale('ru');

console.log(t('hello', { name: 'Вася' })); // => 'Привет, Вася'
```
