import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js'

export default () => {
  return defineConfig({
    css: { postcss },
    plugins: [svelte()],
    base: './'
  });
}