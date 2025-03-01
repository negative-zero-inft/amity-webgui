import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import sveltesvg from '@poppanator/sveltekit-svg';
import { sveltekitSprite } from 'sveltekit-sprite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit(), 	
		sveltesvg({
			includePaths: ["./src/lib/icons/"]
		}),
		sveltekitSprite({svgSource: "static/icons"})
	],
	server: {
		allowedHosts: true
	},
});
