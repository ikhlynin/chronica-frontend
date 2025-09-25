export const loadPrebid = (): Promise<void> => {
	return new Promise((resolve, reject) => {
		/* biome-ignore lint: temporary ignore noExplicitAny errors */
		if ((window as any).pbjs) return resolve();

		const script = document.createElement("script");
		script.src = "/prebid.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load Prebid.js"));
		document.head.appendChild(script);
	});
};
