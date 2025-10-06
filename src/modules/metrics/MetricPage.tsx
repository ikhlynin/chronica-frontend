import { useCallback, useEffect, useState } from "react";
import { MetricFilters } from "./MetricFilter";
import { metricService } from "./metric.service";
import type { FilterOptions, MetricGridRow } from "./metric.types";

export function MetricPage() {
	const [metrics, setMetrics] = useState<MetricGridRow[]>([]);
	const [filter, setFilter] = useState<FilterOptions>({});
	const [page, setPage] = useState(1);
	const [limit] = useState(50);
	const [total, setTotal] = useState(0);
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const result = await metricService.fetchMetrics({
				...filter,
				page,
				limit,
			});
			setMetrics(result.data);
			setTotal(result.total);
		} finally {
			setLoading(false);
		}
	}, [filter, page, limit]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const events = metrics.map((m) => m.event).filter((e): e is string => !!e);
	const adapters = metrics
		.map((m) => m.adapter)
		.filter((a): a is string => !!a);
	const creativeIds = metrics
		.map((m) => m.creativeId)
		.filter((c): c is string => !!c);

	const totalPages = Math.ceil(total / limit);

	return (
		<div className="p-4">
			<h1 className="text-xl font-bold mb-4">Event Metrics</h1>

			<MetricFilters
				filter={filter}
				onChange={(f) => {
					setFilter(f);
					setPage(1);
				}}
				events={Array.from(new Set(events))}
				adapters={Array.from(new Set(adapters))}
				creativeIds={Array.from(new Set(creativeIds))}
			/>
			<div className="flex gap-2 mb-4">
				<div className="flex gap-2 mb-4">
					<button
						type="button"
						className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
						onClick={() => metricService.exportCsv(filter)}
					>
						Export CSV
					</button>
					<button
						type="button"
						className="px-3 py-1 border rounded bg-green-500 text-white hover:bg-green-600"
						onClick={() => metricService.exportExcel(filter)}
					>
						Export Excel
					</button>
				</div>
			</div>

			{loading ? (
				<div>Loading...</div>
			) : (
				<>
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
							{metrics.map((row) => (
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

					<div className="flex justify-between mt-4 items-center">
						<button
							type="button"
							disabled={page <= 1}
							onClick={() => setPage((p) => Math.max(1, p - 1))}
							className="px-3 py-1 border rounded disabled:opacity-50"
						>
							Prev
						</button>
						<span>
							Page {page} of {totalPages} ({total} items)
						</span>
						<button
							type="button"
							disabled={page >= totalPages}
							onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
							className="px-3 py-1 border rounded disabled:opacity-50"
						>
							Next
						</button>
					</div>
				</>
			)}
		</div>
	);
}
