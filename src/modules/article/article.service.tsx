import api from "@shared/axios";
import type { ArticleType } from "./article.types";

interface FetchArticleResponse {
	ok: boolean;
	article: ArticleType;
}

export const articleService = {
	fetchArticle: async (guid: string): Promise<ArticleType> => {
		try {
			const { data } = await api.get<FetchArticleResponse>(
				`/article/getArticle`,
				{
					params: { guid },
				},
			);
			return data.article;
		} catch (err: unknown) {
			console.error(err);
			throw new Error("Failed to fetch article");
		}
	},
};
