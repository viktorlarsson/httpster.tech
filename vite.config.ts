import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import unfonts from "unplugin-fonts/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
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