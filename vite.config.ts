import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import virtualModules from "./src/shared/plugins/virtual-modules.plugin";

export default defineConfig({
	plugins: [react(), tailwindcss(), virtualModules()],
	resolve: {
		alias: {
			"src": path.resolve(__dirname, "src"),
      "@modules" : path.resolve(__dirname, "src/modules"),
      "@shared": path.resolve(__dirname, "src/shared")
		},
	},
	build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
  },
});
