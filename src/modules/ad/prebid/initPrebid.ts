import { adUnits } from "./adUnits";
import { loadPrebid } from "./prebidLoader";

export const initPrebid = async () => {
	await loadPrebid();
	// после 5 таска разберусь с типами, не успел к сожалению (((
	/* biome-ignore lint: temporary ignore noExplicitAny errors */
	const pbjs = (window as any).pbjs || {};
	pbjs.que = pbjs.que || [];

	pbjs.loadAndRenderAd = (code: string, iframe: HTMLIFrameElement) => {
		pbjs.requestBids({
			adUnitCodes: [code],
			timeout: 1500,
			bidsBackHandler: () => {
				const winners = pbjs.getHighestCpmBids(code);
				if (!winners?.length) return;

				const bid = winners[0];
				if (iframe.contentWindow) {
					const doc = iframe.contentWindow.document;
					doc.open();
					doc.write(bid.ad);
					doc.close();

					console.log(
						`[Prebid] Rendered ${code} | Bidder: ${bid.bidderCode} | CPM: ${bid.cpm}`,
					);
				}
			},
		});
	};

	pbjs.que.push(() => {
		pbjs.addAdUnits(
			adUnits.map((adUnit) => ({
				code: adUnit.code,
				mediaTypes: { banner: { sizes: adUnit.sizes } },
				bids: [{ bidder: adUnit.bidder, params: adUnit.params }],
			})),
		);
	});

	console.log("[Prebid] Initialization finished");
};
