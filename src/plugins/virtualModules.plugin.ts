const modules = [""];

function virtualModules() {
	return {
		name: "virtual-modules",
		resolveId(id: string) {
			if (id === "virtual:modules") {
				return id;
			}
		},
		load(id: string) {
			if (id === "virtual:modules") {
				return modules
					.map(
						(m) =>
							`import { ${m} } from './src/modules/${m}.ts'; export { ${m} };`,
					)
					.join("\n");
			}
		},
	};
}
export default virtualModules;
