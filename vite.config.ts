import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import sveltesvg from '@poppanator/sveltekit-svg';

export default defineConfig({
	plugins: [sveltekit(), 	sveltesvg({
		includePaths: ["./src/lib/icons/"]
	})],
	server: {
		allowedHosts: true
	},
});
