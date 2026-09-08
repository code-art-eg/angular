import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		server: {
			deps: {
				inline: ['@code-art-eg/globalite'],
			},
		},
		passWithNoTests: true,
	},
	server: {
		deps: {
			inline: ['@code-art-eg/globalite'],
		},
	},
	ssr: {
		noExternal: ['@code-art-eg/globalite'],
	},
});
