import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" so the built site works when served from any sub-path
// (e.g. GitHub Pages under a version directory).
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    target: "es2019",
  },
});
