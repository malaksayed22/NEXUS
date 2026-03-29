import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@tokens": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  test: {
    environment: "jsdom",
    include: [
      "src/**/test.tsx",
      "src/**/*.{test,spec}.ts",
      "src/**/*.{test,spec}.tsx",
    ],
  },
});
