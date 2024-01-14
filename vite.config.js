import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  root: './src',
  base: './',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    paths({ root: '../' }),
    viteSingleFile()
  ]
});