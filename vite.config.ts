import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    // framer-motion & motion are ESM-native — pre-bundling them breaks chunk hashes
    exclude: ["framer-motion", "motion"],
    // Pre-include everything else so Vite bundles them all at startup,
    // preventing mid-session re-optimization and chunk hash mismatches
    include: [
      "react",
      "react-dom",
      "react-router",
      "react-redux",
      "@reduxjs/toolkit",
      "@tanstack/react-query",
      "@tanstack/react-query-devtools",
      "axios",
      "zod",
      "react-hook-form",
      "@hookform/resolvers",
      "react-hot-toast",
      "lucide-react",
      "react-markdown",
      "remark-gfm",
      "@gradio/client",
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://ieee.runasp.net",
        changeOrigin: true,
      },
    },
  },
});
