import { Link } from "react-router-dom";
import { feedService } from "../feed.service";
import type { FeedItemType } from "../feed.types";

interface FeedItemProps {
	item: FeedItemType;
}

const FeedItem = ({ item }: FeedItemProps) => {
	const shortDesc = feedService.getShortDescription(item.description, 120);

	return (
		<Link
			to={`/news/${item.id}`}
			className="
				cursor-pointer flex gap-4 p-4 
				border border-gray-200 rounded-md 
				shadow-sm hover:shadow-md 
				hover:-translate-y-0.5 
				transition-all duration-200
			"
		>
			{item.image && (
				<img
					src={item.image}
					alt={item.title}
					className="w-40 h-24 object-cover rounded-sm flex-shrink-0"
				/>
			)}
			<div className="flex flex-col justify-between">
				<h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
				<p className="text-gray-600">{shortDesc}</p>
				<span className="text-sm text-gray-400">
					{new Date(item.createdAt).toLocaleString()}
				</span>
			</div>
		</Link>
	);
};

export default FeedItem;
