import api from "@shared/axios";
import type { ArticleType } from "./article.types";

export const articleService = {
	fetchArticle: async (guid: string): Promise<ArticleType> => {
		try {
			const { data } = await api.get<ArticleType>(`/article/getArticle`, {
				params: { guid },
			});
			return data;
			/* biome-ignore lint: temporary ignore noExplicitAny errors */
		} catch (err: any) {
			console.error(err);
			throw new Error(
				err?.response?.data?.message || "Failed to fetch article",
			);
		}
	},
};
