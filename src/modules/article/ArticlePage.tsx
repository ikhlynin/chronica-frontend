import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articleService } from "./article.service";
import type { ArticleType } from "./article.types";

const ArticlePage = () => {
	const { guid } = useParams<{ guid: string }>();
	const [article, setArticle] = useState<ArticleType | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!guid) return;

		const fetchArticle = async () => {
			setLoading(true);
			try {
				const data = await articleService.fetchArticle(guid);
				setArticle(data);
				/* biome-ignore lint: temporary ignore noExplicitAny errors */
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchArticle();
	}, [guid]);

	if (loading) return <div className="p-6">Loading...</div>;
	if (error) return <div className="p-6 text-red-500">{error}</div>;
	if (!article) return <div className="p-6">No article found</div>;

	return (
		<article className="max-w-3xl mx-auto p-6 text-gray-800">
			<h1 className="text-3xl font-bold mb-4 leading-tight">{article.title}</h1>

			{article.creator || article.pubDate ? (
				<div className="text-sm text-gray-500 mb-6">
					{article.creator && <span>By {article.creator}</span>}
					{article.creator && article.pubDate && <span> • </span>}
					{article.pubDate && (
						<span>{new Date(article.pubDate).toLocaleString()}</span>
					)}
				</div>
			) : null}

			{article.image && (
				<img
					src={article.image}
					alt={article.title}
					className="mb-6 w-full max-h-[500px] object-cover rounded"
				/>
			)}

			<div className="space-y-4 text-lg leading-relaxed">
				{article.content.split("\n\n").map((paragraph, idx) => (
					/* biome-ignore lint: temporary ignore noExplicitAny errors */
					<p key={idx}>{paragraph}</p>
				))}
			</div>

			<a
				href={article.url}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-block mt-6 text-blue-600 hover:underline"
			>
				Read original article
			</a>
		</article>
	);
};

export default ArticlePage;
