import type { Plugin } from "vite";

const modules = ["auth"];

function virtualModules(): Plugin {
	const virtualModuleId = "virtual:modules";
	const resolvedVirtualModuleId = `\0${virtualModuleId}`;

	return {
		name: "virtual-modules",
		resolveId(id: string) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		load(id: string) {
			if (id === resolvedVirtualModuleId) {
				return modules
					.map((m) => `export * from "/src/modules/${m}/index";`)
					.join("\n");
			}
		},
	};
}
export default virtualModules;
