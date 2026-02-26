/**
 * Vite config for the SSR prerender build.
 * Produces a Node-compatible bundle that exports a render(url) function.
 */
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    ssr: path.resolve(import.meta.dirname, "client", "src", "entry-prerender.tsx"),
    outDir: path.resolve(import.meta.dirname, "dist", "prerender"),
    emptyOutDir: true,
  },
});
