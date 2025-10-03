import { adUnits } from "./adUnits";
import { loadPrebid } from "./prebidLoader";

console.log("[prebid] module file loaded");

const initPrebid = async () => {
	await loadPrebid();
	const pbjs = window.pbjs || {};
	pbjs.que = pbjs.que || [];

	const renderWinningBids = (adUnitCode, expectedType = "banner") => {
		const winners = pbjs.getHighestCpmBids(adUnitCode);

		for (const bid of winners) {
			if (bid.mediaType === expectedType) {
				const iframe = document.getElementById(bid.adUnitCode);
				if (iframe?.contentWindow) {
					const doc = iframe.contentWindow.document;
					pbjs.renderAd(doc, bid.adId);
				}
			}
		}
	};

	const requestBids = () => {
		pbjs.requestBids({
			timeout: 1500,
			bidsBackHandler: () => {
				for (const adUnit of adUnits) {
					renderWinningBids(adUnit.code, "banner");
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
		requestBids();
	});
};

initPrebid();
