## svelte-intl

[![NPM Version](https://img.shields.io/npm/v/svelte-intl.svg)](https://npm.im/svelte-intl)
[![Package Size](https://badgen.net/bundlephobia/minzip/svelte-intl)](https://bundlephobia.com/result?p=svelte-intl@latest)

Internationalize your Svelte 3 apps using [format-message](https://github.com/format-message/format-message).

```html
<script context="module">
  import { locale, translations, getBrowserLocale } from 'svelte-intl';

  // If you want to split your bundle, you can call this multiple times,
  // the dictionaries will be merged.
  translations.update({
    en: {
      hello: 'Hello, {name}',
    },
    pt: {
      hello: 'Olá, {name}',
    },
  })

  locale.set(getBrowserLocale())
</script>

<script>
  // use _ or translate
  import { _ } from 'svelte-intl'

  export let name = 'John'
</script>

<h1> {$_('hello', { name })} </h1>
```
