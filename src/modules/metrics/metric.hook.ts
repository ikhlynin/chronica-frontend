import { useEffect } from "react";
import { metricService } from "./metric.service";
import type { MetricEvent, MetricPayload } from "./metric.types";

export function useMetric(event: MetricEvent, extra?: Partial<MetricPayload>) {
	useEffect(() => {
		const payload: MetricPayload = {
			event,
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
			...extra,
		};
		metricService.sendEvent(payload);
	});
}
