import { useEffect, useRef } from "react";

interface AdSlotProps {
	adCode: string;
}

export const AdSlot = ({ adCode }: AdSlotProps) => {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		const waitForPbjs = setInterval(() => {
			/* biome-ignore lint: temporary ignore noExplicitAny errors */
			if (iframeRef.current && (window as any).pbjs?.loadAndRenderAd) {
				/* biome-ignore lint: temporary ignore noExplicitAny errors */
				(window as any).pbjs.loadAndRenderAd(adCode, iframeRef.current);
				clearInterval(waitForPbjs);
			}
		}, 100);

		return () => clearInterval(waitForPbjs);
	}, [adCode]);

	return (
		<iframe
			ref={iframeRef}
			title={adCode}
			id={adCode}
			style={{ border: 0 }}
			className="border-0 block max-w-full max-h-full"
			scrolling="no"
		/>
	);
};
