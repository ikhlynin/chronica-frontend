const virtualModules = (prebidEnabled: boolean) => {
	const name = "virtual:modules";
	const modules: string[] = [];
	return {
		name: "virtual-modules",
		resolveId(id: string) {
			if (id === name) return name;
			return null;
		},
		load(id: string) {
			if (id !== name) return null;
			if (prebidEnabled) modules.push("ad/prebid/initPrebid");

			const imports = modules
				.map((m) => `import "/src/modules/${m}.js";`)
				.join("\n");
			return `${imports}\n`;
		},
	};
};

export default virtualModules;
