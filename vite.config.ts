import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [tailwindcss(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: "http://43.201.240.13:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
