import api from "@shared/axios";
import type { MetricGridRow, MetricPayload } from "./metric.types";

class MetricService {
	private isActive = false;

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
			navigator.sendBeacon("/metrics", blob);
		} else {
			api.post("/metrics", payload).catch(console.error);
		}
	}

	async fetchMetrics(): Promise<MetricGridRow[]> {
		const { data } = await api.get<MetricGridRow[]>("/metrics");
		return data.map((row, index) => ({
			...row,
			id: `${row.timestamp}-${index}`,
		}));
	}
}

export const metricService = new MetricService();
