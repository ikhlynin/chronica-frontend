import { useEffect } from "react";
import FeedList from "../components/FeedList";
import { feedService } from "../feed.service";
import { useFeedStore } from "../feed.store";

const FeedPage = () => {
	const { setItems } = useFeedStore();
	const { data, isLoading, isError } = feedService.useFeedQuery();

	useEffect(() => {
		if (data) setItems(data);
	}, [data, setItems]);

	if (isLoading) return <div className="p-6">Loading...</div>;
	if (isError)
		return <div className="p-6 text-red-500">Feed loading failed</div>;

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">FEED</h1>
			<FeedList />
		</div>
	);
};

export default FeedPage;
