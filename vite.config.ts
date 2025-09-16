import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import virtualModules from "./src/plugins/virtualModules.plugin.ts";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), virtualModules()],
});
