/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
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
        "app/routeTree.gen.ts",
        "app/main.tsx",
        "app/**/*.d.ts",
        "app/**/*types/*",
        "**/*config.ts",
        "app/**/*routes/*",
        "tests/setup.js",
        // open panel, I guess they have tests
        "app/shared/utils/op.ts",
        // Just a static file, no need for testing
        "app/features/terminal/data/fileSystem.ts",
        "postcss.config.cjs",
        "tailwind.config.cjs",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [TanStackRouterVite({}), react()],
});
