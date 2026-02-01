// If in production (Vite sets import.meta.env.PROD to true)
// Use the full production URL. Use in dev '/api' to trigger the Vite Proxy in vite.config.js
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://star-wars-character-data-api.vercel.app/api/v1'
  : '/api';
