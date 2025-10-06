import { metricService } from "@modules/metrics/metric.service";
import { adUnits } from "./adUnits";
import { loadPrebid } from "./prebidLoader";

const initPrebid = async () => {
	await loadPrebid();
	window.pbjs = window.pbjs || {};
	const pbjs = window.pbjs;
	pbjs.que = pbjs.que || [];

	metricService.sendEvent({
		event: "adLoad",
		timestamp: new Date().toISOString(),
		pageUrl: window.location.href,
	});

	pbjs.onEvent("auctionInit", (_data) => {
		metricService.sendEvent({
			event: "auctionInit",
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
		});
	});

	pbjs.onEvent("bidRequested", (data) => {
		metricService.sendEvent({
			event: "bidRequested",
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
			adapter: data?.bidderCode,
		});
	});

	pbjs.onEvent("bidResponse", (bid) => {
		metricService.sendEvent({
			event: "bidResponse",
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
			adId: bid?.adId,
			creativeId: bid?.creativeId,
			cpm: bid?.cpm,
			adapter: bid?.bidder,
		});
	});

	pbjs.onEvent("auctionEnd", (_data) => {
		metricService.sendEvent({
			event: "auctionEnd",
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
		});
	});

	pbjs.onEvent("bidWon", (bid) => {
		metricService.sendEvent({
			event: "bidWon",
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
			adId: bid?.adId,
			creativeId: bid?.creativeId,
			cpm: bid?.cpm,
			adapter: bid?.bidder,
		});
	});

	const renderWinningBids = (adUnitCode, expectedType = "banner") => {
		const winners = pbjs.getHighestCpmBids(adUnitCode);

		winners.forEach((bid) => {
			if (bid.mediaType === expectedType) {
				const iframe = document.getElementById(bid.adUnitCode);
				if (iframe) {
					const doc = iframe.contentDocument || iframe.contentWindow?.document;
					if (doc) {
						doc.open();
						doc.write(bid.ad);
						doc.close();
					} else {
						console.warn("Iframe document not ready for", bid.adUnitCode);
					}
				} else {
					console.warn("Iframe not found for", bid.adUnitCode);
				}
			}
		});
	};

	const requestBids = () => {
		pbjs.requestBids({
			timeout: 2500,
			bidsBackHandler: () => {
				adUnits.forEach((adUnit) => {
					renderWinningBids(adUnit.code, "banner");
				});
			},
		});
	};

	pbjs.que.push(() => {
		pbjs.addAdUnits(adUnits);
		requestBids();
	});
};

initPrebid();
