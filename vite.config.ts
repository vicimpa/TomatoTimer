import unfont from "unplugin-fonts/vite";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import paths from "vite-tsconfig-paths";

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
    viteSingleFile(),
    unfont({
      google: {
        families: [
          'Roboto Mono'
        ]
      }
    })
  ]
});