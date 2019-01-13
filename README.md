## svelte-intl

[![Build Status](https://travis-ci.org/Panya/svelte-intl.svg?branch=master)](https://travis-ci.org/Panya/svelte-intl)
[![NPM Version](https://img.shields.io/npm/v/svelte-intl.svg)](https://npm.im/svelte-intl)
[![Package Size](https://badgen.net/bundlephobia/minzip/svelte-intl)](https://bundlephobia.com/result?p=svelte-intl@latest)

Internationalize your Svelte apps using [format-message](https://github.com/format-message/format-message).

```js
import { intl } from 'svelte-intl';
import { Store } from 'svelte';

const store = intl(new Store(), {
  locale: 'en',
  locales: {
    en: {
      hello: 'Hello, {name}'
    }
  }
});

store.intl.extendLocales({
  ru: {
    hello: 'Привет, {name}'
  }
});

const { _ } = store.get();

console.log(_('hello', { name: 'John' })); // => 'Hello, John'

store.intl.setLocale('ru');

console.log(_('hello', { name: 'Вася' })); // => 'Привет, Вася'
```
