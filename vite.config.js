import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {},
    watch: {
      usePoolling: true,
    },
    host: true,
    port: 5111,
  },
});
