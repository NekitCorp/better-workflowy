import { crx } from '@crxjs/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import manifest from './src/manifest.config';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte(), crx({ manifest })],
});
