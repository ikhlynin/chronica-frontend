import { useFeedStore } from "virtual:modules";
import { useNavigate, useParams } from "react-router-dom";

const NewsPage = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { items } = useFeedStore();

	const news = items.find((n) => n.id === id);

	if (!news) {
		return (
			<div className="p-6 max-w-3xl mx-auto text-center text-red-500">
				News not found
			</div>
		);
	}

	return (
		<div className="p-6 max-w-3xl mx-auto">
			<button
				type="button"
				onClick={() => navigate(-1)}
				className="
					inline-flex items-center 
					gap-2 px-4 py-2 mb-6 text-sm 
					font-medium text-white bg-blue-500 
					rounded-lg hover:bg-blue-600 transition
				"
			>
				← Back
			</button>

			{news.image && (
				<img
					src={news.image}
					alt={news.title}
					className="mb-6 w-full rounded-lg shadow-md object-cover"
				/>
			)}

			<h1 className="text-3xl font-bold mb-4 text-gray-800">{news.title}</h1>

			<p className="ttext-gray-700 leading-relaxed mb-6">{news.description}</p>

			<span className="text-sm text-gray-500">
				{new Date(news.createdAt).toLocaleString()}
			</span>
		</div>
	);
};

export default NewsPage;
