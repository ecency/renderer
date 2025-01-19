import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dtsPlugin from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "Ecency Renderer",
      formats: ["es"],
      fileName: (format) => `ecency-renderer.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-dom/client",
        "scheduler",
        "clsx",
        "@ecency/render-helper",
        "medium-zoom",
        "react/jsx-runtime",
        "@hiveio/dhive",
      ],
    },
  },
  plugins: [react(), dtsPlugin({ rollupTypes: true }), nodePolyfills()],
});
