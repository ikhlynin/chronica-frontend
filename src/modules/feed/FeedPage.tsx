import { useEffect, useState } from "react";
import FeedList from "./components/FeedList";
import FeedSearch from "./components/FeedSearch";
import { feedService } from "./feed.service";
import { useFeedStore } from "./feed.store";

const FeedPage = () => {
	const { setItems } = useFeedStore();
	const [url, setUrl] = useState("");
	const [force, setForce] = useState(false);

	const { data, isLoading, isError, refetch } = feedService.useFeedQuery(
		url || undefined,
		force,
	);

	useEffect(() => {
		if (data) setItems(data);
	}, [data, setItems]);

	const handleFetch = () => {
		refetch();
	};

	if (isLoading) return <div className="p-6">Loading...</div>;
	if (isError)
		return <div className="p-6 text-red-500">Feed loading failed</div>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">FEED</h1>

			<FeedSearch
				url={url}
				setUrl={setUrl}
				force={force}
				setForce={setForce}
				onFetch={handleFetch}
			/>
			<FeedList />
		</div>
	);
};

export default FeedPage;
