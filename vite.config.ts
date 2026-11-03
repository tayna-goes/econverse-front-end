import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        privacidade: 'privacidade/index.html',
        termos: 'termos/index.html',
        trocas: 'trocas/index.html',
        cookies: 'cookies/index.html',
        '404': '404.html',
        '500': '500.html',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
  },
});
