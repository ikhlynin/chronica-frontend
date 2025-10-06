import api from "@shared/axios";
import type {
	FilterOptions,
	MetricGridRow,
	MetricPayload,
} from "./metric.types";

interface FetchMetricsResult {
	page: number;
	limit: number;
	total: number;
	data: MetricGridRow[];
}

interface FetchMetricsOptions extends FilterOptions {
	page?: number;
	limit?: number;
}

class MetricService {
	private isActive = false;
	private baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;

	init() {
		this.isActive = true;
	}

	destroy() {
		this.isActive = false;
	}

	sendEvent(payload: MetricPayload) {
		if (!this.isActive) return;

		if (navigator.sendBeacon) {
			const blob = new Blob([JSON.stringify(payload)], {
				type: "application/json",
			});
			navigator.sendBeacon(`${this.baseUrl}/metrics/save`, blob);
		} else {
			api.post("metrics/save", payload).catch(console.error);
		}
	}

	async fetchMetrics(
		options: FetchMetricsOptions = {},
	): Promise<FetchMetricsResult> {
		const params = new URLSearchParams();
		params.set("page", (options.page ?? 1).toString());
		params.set("limit", (options.limit ?? 50).toString());

		if (options.events?.length) params.set("events", options.events.join(","));
		if (options.adapters?.length)
			params.set("adapters", options.adapters.join(","));
		if (options.creativeIds?.length)
			params.set("creativeIds", options.creativeIds.join(","));
		if (options.date) params.set("date", options.date);
		if (options.hour !== undefined) params.set("hour", options.hour.toString());

		const response = await api.get("metrics/fetch", { params });
		return response.data as FetchMetricsResult;
	}

	async exportCsv(options: FetchMetricsOptions = {}) {
		const response = await api.post("metrics/export/csv", options, {
			responseType: "blob",
		});
		this.downloadBlob(response.data, "metrics.csv");
	}

	async exportExcel(options: FetchMetricsOptions = {}) {
		const response = await api.post("metrics/export/excel", options, {
			responseType: "blob",
		});
		this.downloadBlob(response.data, "metrics.xlsx");
	}

	private downloadBlob(blob: BlobPart, filename: string) {
		const url = window.URL.createObjectURL(new Blob([blob]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(url);
	}
}

export const metricService = new MetricService();
