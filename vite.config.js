import { defineConfig } from "vite";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    outDir: '../dist'
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    paths({ root: '../' })
  ]
});