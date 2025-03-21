import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import sveltesvg from '@poppanator/sveltekit-svg';
import { sveltekitSprite } from 'sveltekit-sprite';


export default defineConfig({
	plugins: [
		sveltekit(),
		sveltesvg({
			includePaths: ["./src/lib/icons/"]
		}),
		sveltekitSprite({ svgSource: "static/icons" })
	],
	server: {
		fs: {
			allow: ["locales"]
		},
		allowedHosts: true
	},
	esbuild: {
		minify: true
	}
});
