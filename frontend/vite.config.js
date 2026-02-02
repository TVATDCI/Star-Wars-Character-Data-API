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
      '/api/v1': {
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,
      },
    },
  },
});

// Notes: Once the proxy applied, update api.js to avoid hitting undefined or the wrong port:
// utils/api.js
// Set to empty string because the proxy handles the destination
// const API_BASE_URL = '';
// Then apiRequest will now naturally call "/login" on the current origin (Vite),
// and Vite will pass it to port 5000.
