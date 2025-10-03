import type { FC } from "react";

interface FeedSearchProps {
	url: string;
	setUrl: (url: string) => void;
	force: boolean;
	setForce: (force: boolean) => void;
	onFetch: () => void;
}

const FeedSearch: FC<FeedSearchProps> = ({
	url,
	setUrl,
	force,
	setForce,
	onFetch,
}) => {
	return (
		<div className="mb-6 flex gap-2 items-center">
			<input
				type="text"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter custom feed URL"
				className="border p-2 rounded flex-1"
			/>
			<label className="flex items-center gap-1">
				<input
					type="checkbox"
					checked={force}
					onChange={(e) => setForce(e.target.checked)}
				/>
				Force fetch
			</label>
			<button
				type="button"
				onClick={onFetch}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Fetch
			</button>
		</div>
	);
};

export default FeedSearch;
