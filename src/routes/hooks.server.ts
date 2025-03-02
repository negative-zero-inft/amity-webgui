// hooks.server.ts
import type { Handle } from '@sveltejs/kit'
// get this package
import { locale } from 'svelte-i18n'

export const handle: Handle = async ({ event, resolve }) => {
	const lang = event.request.headers.get('accept-language')?.split(',')[0]
	if (lang) {
		locale.set(lang)
	}
	return resolve(event)
}