import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const modules: string[] = ["src/modules/ad/prebid/prebid.js"];

const generateModuleImports = (modules: string[]) => {
	if (!modules || modules.length === 0) return "";

	const filtered = modules.filter((mod) => {
		if (!mod) return false;
		const fullPath = path.resolve(process.cwd(), mod);
		return fs.existsSync(fullPath);
	});
	if (filtered.length === 0) return "";

	return modules.map((mod) => `import "${mod}";`).join("\n");
};

const virtualModules = (): Plugin => {
	return {
		name: "virtual-modules",

		resolveId(id: string) {
			return id === "virtual:modules" ? id : null;
		},

		load(id: string) {
			if (id === "virtual:modules") {
				return generateModuleImports(modules);
			}
			return null;
		},
	};
};
export default virtualModules;
