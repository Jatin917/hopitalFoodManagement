import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { fileURLToPath } from "url";
import path from "path";

// Shim for `__dirname`
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Ensure this matches your project structure
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
