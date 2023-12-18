import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://115.85.181.222",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
      { find: "@stores", replacement: path.resolve(__dirname, "src/stores") },
      { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
      { find: "@types", replacement: path.resolve(__dirname, "src/types") },
      { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
    ],
  },
});
