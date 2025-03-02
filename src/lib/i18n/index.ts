// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en'


// For languages not found in https://www.techonthenet.com/js/language_tags.php
// use full language name. That will prevent such as Intl from loading it and instead fallback to English.
// "en" and "en-US" are valid
// "ixni" should fallback to English
// don't shorten it to "ix" for "ixni" or "tp" for "tokipona"
const locales = import.meta.glob("./locales/*.json");

Object.entries(locales).forEach(([path, loader]) => {
  const locale = path.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    register(locale, loader);
  }
});


init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})