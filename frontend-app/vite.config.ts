import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@router": fileURLToPath(new URL("./src/router", import.meta.url)),
    },
  },
  define: {
    "process.env": {
      BE_BASE_URL: process.env.BACKEND_URL,
    },
  },
});
