export type MetricEvent =
	| "pageLoad"
	| "adLoad"
	| "auctionInit"
	| "auctionEnd"
	| "bidRequested"
	| "bidResponse"
	| "bidWon";

export interface MetricPayload {
	event: MetricEvent;
	timestamp: string;
	pageUrl: string;
	userId?: string;
	adId?: string;
	creativeId?: string;
	cpm?: number;
	adapter?: string;
}

export interface FilterOptions {
	events?: string[];
	adapters?: string[];
	creativeIds?: string[];
	date?: string;
	hour?: number;
}

export type MetricGridRow = MetricPayload & {
	id: string;
};
