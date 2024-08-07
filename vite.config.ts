import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api-reacteur": {
        target: "https://lereacteur-marvel-api.herokuapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-reacteur/, ""),
      },
    },
  },
});
