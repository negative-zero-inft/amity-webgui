// src/lib/i18n/index.ts
import { browser } from '$app/environment'
import { init, register } from 'svelte-i18n'

const defaultLocale = 'en'


// For languages not found in https://www.techonthenet.com/js/language_tags.php
// use full language name. That will prevent such as Intl from loading it and instead fallback to English.
// "en" and "en-US" are valid
// "ixni" should fallback to English
// don't shorten it to "ix" for "ixni" or "tp" for "tokipona"
register('en', () => import('./locales/en.json'))
register("en-GB", () => import('./locales/en-GB.json'))
register("en-IE", () => import('./locales/en-IE.json'))
register("en-CA", () => import('./locales/en-CA.json'))
register("en-AU", () => import('./locales/en-AU.json'))
register('ro', () => import('./locales/ro.json'))
register('pl', () => import('./locales/pl.json'))
register('es', () => import('./locales/es.json'))
register('it', () => import('./locales/it.json'))
register("ixni", () => import('./locales/ixni.json'))
register("meow", () => import('./locales/meow.json'))
register('valturnian', () => import('./locales/valturnian.json'))
register("tokipona", () => import('./locales/tokipona.json'))

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})