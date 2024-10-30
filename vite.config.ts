/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import unfonts from "unplugin-fonts/vite";
import { resolve } from "node:path";

export default defineConfig({
	test: {
		setupFiles: ["./vitest-setup.ts"],
		environment: "jsdom",
		globals: true,
		coverage: {
			provider: "v8",
			exclude: [
				"app.config.ts",
				"postcss.config.js",
				"tailwind.config.ts",
				"src/routeTree.gen.ts",
				"src/main.tsx",
			],
		},
	},
	resolve: {
		alias: {
			"@": resolve("src"),
		},
	},
	plugins: [
		TanStackRouterVite({}),
		react(),
		unfonts({
			custom: {
				families: [
					{
						name: "Geist-Mono",
						src: "./src/assets/fonts/geist-mono/*.woff2",
					},
				],
			},
		}),
	],
});
