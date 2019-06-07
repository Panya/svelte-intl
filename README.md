# svelte-intl

[![NPM Version](https://img.shields.io/npm/v/svelte-3-intl.svg)](https://npm.im/svelte-intl)
[![Package Size](https://badgen.net/bundlephobia/minzip/svelte-3-intl)](https://bundlephobia.com/result?p=svelte-intl@latest)
[![Package Size](https://badgen.net/bundlephobia/minzip/svelte-3-intl)](https://bundlephobia.com/result?p=format-message@latest)

Internationalize your Svelte 3 apps using [format-message](https://github.com/format-message/format-message).

## Installation
```sh
npm i svelte-3-intl format-message # format message is a peer dependency
```

## Usage

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

  locale.set(getBrowserLocale('en')) // try to use window.navigator.language
</script>

<script>
  // use _ or translate
  import { _ } from 'svelte-intl'

  export let name = 'John'
</script>

<h1> {$_('hello', { name })} </h1>
```

## API

## `translate` (or "`_`")
> Translation store
- Type: `svelte.Readable<typeof formatMessage>`

### Example

```html
<script>
  import { get } from 'svelte/store'
  import { translate } from 'svelte-3-intl'

  const title = get(translate)('title')
</script>

<h1> Title: {title} </h1>
<h1> Reactive Title: {$translate('title')} </h1>
```

## `translations`
> Available translations
- Type: Object
  - `set(translations) => void` : Replace translations (avoid this)
  - `update(translations) => void` : Add more translations
  -  `subscribe` : Store subscription, avoid using this directly

## `locale`
> Current locale
- Type: like `svelte.Readable<string>`, but with safe update and set (logs error if locale is not found)
- Note: Set and update return a `boolean` indicating if the locale was found

## `locales`
> Available locales, derived from translation
- Type: `svelte.Readable<string[]>`

### Usage
```html
<!-- LanguageSelector.svelte -->
<script>
  import { locale, locales } from 'svelte-3-intl'

	const setLocale = e => locale.set(e.target.value)
</script>

<select value={$locale} on:change={setLocale}>
  {#each $locales as l}
    <option value={l}> {l} </option>
  {/each}
</select>
```

## options
> See [format-message options](https://github.com/format-message/format-message/tree/master/packages/format-message#formatmessagesetupoptions) \
  Just call `options.set({  })` :)
- Type: `svelte.Readable<formatMessage.SetupOptions>` (but update merges with current config)

## `getBrowserLocale`
> Tries to match the `window.navigator.language` to the available dictionaries
- Params:
  - defaultLocale {string}: If no match is found, returns this
