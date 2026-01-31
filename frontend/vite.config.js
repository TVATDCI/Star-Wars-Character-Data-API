import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: 'brotliCompress', // Use Brotli compression
      ext: '.br', // File extension for Brotli compressed files
      threshold: 1024, // Only compress files larger than 1KB
    }),
  ],
  server: {
    proxy: {
      '/api': {
        // This will catch /api/characters, /api/public
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // Rewrite /api to /api/v1 for the backend
      },
      '/login': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: () => '/api/v1/auth/login', // Rewrite /login to /api/v1/auth/login
      },
      '/register': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: () => '/api/v1/auth/register', // Rewrite /register to /api/v1/auth/register
      },
      // Note: If the frontend starts making calls to /api/v1/ directly,
      // It might need a separate entry for that which doesn't rewrite the /api/v1 part.
    },
  },
});

// Notes: Once the proxy applied, update api.js to avoid hitting undefined or the wrong port:
// utils/api.js
// Set to empty string because the proxy handles the destination
// const API_BASE_URL = '';
// Then apiRequest will now naturally call "/login" on the current origin (Vite),
// and Vite will pass it to port 5000.
