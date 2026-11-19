import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// El punto de entrada de desarrollo es dev.html. El index.html y assets/ de la
// raíz son la versión compilada que publica GitHub Pages (npm run publish:pages).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { open: '/dev.html' },
  build: { rollupOptions: { input: fileURLToPath(new URL('./dev.html', import.meta.url)) } },
});
