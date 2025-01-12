import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dtsPlugin from "vite-plugin-dts";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.ts"),
      name: "Ecency Renderer",
      fileName: (format) => `ecency-renderer.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "clsx"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react(), dtsPlugin({ rollupTypes: true }), nodePolyfills()],
});
