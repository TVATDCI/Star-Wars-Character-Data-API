import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});

// #practicing Vite configuration for React application
// This configuration file sets up a Vite project for a React application.
//  No call from vite dev server to proxy in this case, yet. No /api/ is made to the backend server in this configuration.
// There is no need to use `loadEnv` in this case, as the environment variables are not being used in the Vite configuration.
// The http://localhost:5000 is hardcoded in the frontend/src/components/utils/api.js file, which is sufficient for development purposes.
// However, it is centralized using `API_BASE_URL` in the frontend/src/components/utils/api.js file, which can be modified as needed.

{
  /**
    import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.dirname(new URL(import.meta.url).pathname));
  // Load environment variables from .env files based on the mode
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

     */
}
