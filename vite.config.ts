	import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [tailwindcss(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: "http://15.164.217.202:8080", // 실제 API 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
