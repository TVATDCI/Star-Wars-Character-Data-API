import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.dirname(new URL(import.meta.url).pathname));
  console.log("VITE_RENDER_BACKEND_URL:", env.VITE_RENDER_BACKEND_URL);
  console.log("VITE_API_BASE_URL:", env.VITE_API_BASE_URL);
  console.log("VITE_FRONTEND_URL:", env.VITE_FRONTEND_URL);
  console.log("VITE_FRONTEND_URL_PROD:", env.VITE_FRONTEND_URL_PROD);
  console.log("NODE_ENV:", env.NODE_ENV);
  console.log("MONGO_URL:", env.MONGO_URL);
  console.log("Loaded environment variables for mode:", mode);
  console.log("Loaded environment", env);

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_RENDER_BACKEND_URL || "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
