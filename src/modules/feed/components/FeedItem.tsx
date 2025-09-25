import { useNavigate } from "react-router-dom";
import type { FeedItemType } from "../feed.types";

interface FeedItemProps {
	item: FeedItemType;
}

const FeedItem = ({ item }: FeedItemProps) => {
	const navigate = useNavigate();
	return (
		<button
			type="button"
			onClick={() => navigate(`/article/${encodeURIComponent(item.guid)}`)}
			className="
  			  flex gap-4 p-4 
  			  border border-gray-200 rounded-md 
  			  shadow-sm hover:shadow-md 
  			  hover:-translate-y-1 
  			  transition-transform duration-200
  			  w-full text-left
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
				<p className="text-gray-600">{item.contentSnippet}</p>
				<span className="text-sm text-gray-400">
					{new Date(item.isoDate).toLocaleString()}
				</span>
			</div>
		</button>
	);
};

export default FeedItem;
