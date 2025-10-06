export interface MetricPayload {
	event?: string;
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

export interface MetricFiltersProps {
	filter: FilterOptions;
	onChange: (next: FilterOptions) => void;
	events: string[];
	adapters: string[];
	creativeIds: string[];
}

export type MetricGridRow = MetricPayload & { id: string };
