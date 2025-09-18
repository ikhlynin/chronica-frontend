import { FeedItem, useFeedStore } from "virtual:modules";

const FeedList = () => {
	const { items } = useFeedStore();

	return (
		<div className="flex flex-col gap-4">
			{items.map((item) => (
				<FeedItem key={item.id} item={item} />
			))}
		</div>
	);
};

export default FeedList;
