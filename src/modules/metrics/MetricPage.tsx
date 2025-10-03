import { useEffect, useState } from "react";
import { metricService } from "./metric.service";
import type { FilterOptions, MetricGridRow } from "./metric.types";

export function MetricPage() {
	const [metrics, setMetrics] = useState<MetricGridRow[]>([]);
	const [filter, _setFilter] = useState<FilterOptions>({});

	useEffect(() => {
		metricService.fetchMetrics().then(setMetrics);
	}, []);

	const filteredMetrics = metrics.filter((row) => {
		if (filter.events && !filter.events.includes(row.event)) return false;
		if (
			filter.adapters &&
			row.adapter &&
			!filter.adapters.includes(row.adapter)
		)
			return false;
		if (
			filter.creativeIds &&
			row.creativeId &&
			!filter.creativeIds.includes(row.creativeId)
		)
			return false;
		if (filter.date && !row.timestamp.startsWith(filter.date)) return false;
		if (
			filter.hour !== undefined &&
			new Date(row.timestamp).getHours() !== filter.hour
		)
			return false;
		return true;
	});

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Event metrics</h1>

			<table className="w-full border-collapse border border-gray-300">
				<thead>
					<tr className="bg-gray-100">
						<th className="border p-2">Time</th>
						<th className="border p-2">Event</th>
						<th className="border p-2">Adapter</th>
						<th className="border p-2">Creative</th>
						<th className="border p-2">CPM</th>
						<th className="border p-2">Page URL</th>
					</tr>
				</thead>
				<tbody>
					{filteredMetrics.map((row) => (
						<tr key={row.id} className="hover:bg-gray-50">
							<td className="border p-2">
								{new Date(row.timestamp).toLocaleString()}
							</td>
							<td className="border p-2">{row.event}</td>
							<td className="border p-2">{row.adapter || "-"}</td>
							<td className="border p-2">{row.creativeId || "-"}</td>
							<td className="border p-2">{row.cpm ?? "-"}</td>
							<td className="border p-2">{row.pageUrl}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
