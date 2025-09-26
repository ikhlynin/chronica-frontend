export const loadPrebid = () => {
	return new Promise((resolve, reject) => {
		if (window.pbjs) return resolve();

		const script = document.createElement("script");
		script.src = "/prebid.js";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load Prebid.js"));
		document.head.appendChild(script);
	});
};
