
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess({preserveComments: false}),

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: ''
		},
		alias: {
			"lib": "src/lib"
		}
	}
};

export default config;
