## svelte-intl

[![Build Status](https://travis-ci.org/Panya/svelte-intl.svg?branch=master)](https://travis-ci.org/Panya/svelte-intl)

Internationalize your Svelte apps using [format-message](https://github.com/format-message/format-message).

```js
import { intl } from 'svelte-intl';
import { Store } from 'svelte';

const store = intl(new Store());

store.intl.extendLocales({
  en: {
    hello: 'Hello, {name}'
  }
});

store.intl.setLocale('en');

const { _ } = store.get();

_('hello', { name: 'John' }) // => 'Hello, John'
```
