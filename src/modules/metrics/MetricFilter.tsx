import { useId } from "react";
import type { MetricFiltersProps } from "./metric.types";

export function MetricFilters({
	filter,
	onChange,
	events,
	adapters,
	creativeIds,
}: MetricFiltersProps) {
	const eventId = useId();
	const adapterId = useId();
	const creativeId = useId();
	const dateId = useId();
	const hourId = useId();

	const handleReset = () => onChange({});

	return (
		<div className="grid grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow-sm border mb-4">
			<div>
				<label htmlFor={eventId} className="block text-sm font-medium mb-1">
					Event
				</label>
				<select
					id={eventId}
					value={filter.events?.[0] ?? ""}
					onChange={(e) =>
						onChange({
							...filter,
							events: e.target.value ? [e.target.value] : undefined,
						})
					}
					className="w-full border rounded-lg px-2 py-1 bg-white"
				>
					<option value="">All</option>
					{events.map((ev) => (
						<option key={ev} value={ev}>
							{ev}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor={adapterId} className="block text-sm font-medium mb-1">
					Adapter
				</label>
				<select
					id={adapterId}
					value={filter.adapters?.[0] ?? ""}
					onChange={(e) =>
						onChange({
							...filter,
							adapters: e.target.value ? [e.target.value] : undefined,
						})
					}
					className="w-full border rounded-lg px-2 py-1 bg-white"
				>
					<option value="">All</option>
					{adapters.map((a) => (
						<option key={a} value={a}>
							{a}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor={creativeId} className="block text-sm font-medium mb-1">
					Creative ID
				</label>
				<select
					id={creativeId}
					value={filter.creativeIds?.[0] ?? ""}
					onChange={(e) =>
						onChange({
							...filter,
							creativeIds: e.target.value ? [e.target.value] : undefined,
						})
					}
					className="w-full border rounded-lg px-2 py-1 bg-white"
				>
					<option value="">All</option>
					{creativeIds.map((cid) => (
						<option key={cid} value={cid}>
							{cid}
						</option>
					))}
				</select>
			</div>

			<div>
				<label htmlFor={dateId} className="block text-sm font-medium mb-1">
					Date
				</label>
				<input
					id={dateId}
					type="date"
					value={filter.date ?? ""}
					onChange={(e) =>
						onChange({ ...filter, date: e.target.value || undefined })
					}
					className="w-full border rounded-lg px-2 py-1 bg-white"
				/>
			</div>

			<div>
				<label htmlFor={hourId} className="block text-sm font-medium mb-1">
					Hour
				</label>
				<input
					id={hourId}
					type="number"
					min={0}
					max={23}
					value={filter.hour?.toString() ?? ""}
					onChange={(e) =>
						onChange({
							...filter,
							hour: e.target.value ? Number(e.target.value) : undefined,
						})
					}
					className="w-full border rounded-lg px-2 py-1 bg-white"
				/>
			</div>

			<div className="col-span-5 flex justify-end mt-2">
				<button
					type="button"
					onClick={handleReset}
					className="text-sm px-3 py-1 rounded-lg border bg-gray-100 hover:bg-gray-200 transition"
				>
					Reset filters
				</button>
			</div>
		</div>
	);
}
