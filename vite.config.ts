import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    /** Path Alias */
    alias: {
      "@": path.resolve(__dirname, "./src"), // '@'をsrcディレクトリにマッピング
    },
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
