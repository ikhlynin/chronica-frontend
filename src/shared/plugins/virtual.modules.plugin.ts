import type { Plugin } from "vite";

const modules: Record<string, string> = {
	auth: "/src/modules/auth/index",
	feed: "/src/modules/feed/index",
	news: "/src/modules/news/index",
	shared: "/src/shared/index",
};

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
				return Object.values(modules)
					.map((path) => `export * from "${path}";`)
					.join("\n");
			}
		},
	};
}
export default virtualModules;
