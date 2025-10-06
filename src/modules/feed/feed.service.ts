import api from "@shared/axios";
import { useQuery } from "@tanstack/react-query";
import type { FeedItemType } from "./feed.types";

class FeedService {
	async getFeed(url?: string, force = false): Promise<FeedItemType[]> {
		const params: Record<string, string> = {};
		if (url) params.url = url;
		if (force) params.force = "1";

		const res = await api.get("/feed/getFeed", { params });
		const items = res.data.items;
		if (!items) {
			throw new Error("Feed response missing items");
		}
		return items;
	}

	useFeedQuery(url?: string, force = false) {
		return useQuery<FeedItemType[]>({
			queryKey: ["feed", url, force],
			queryFn: () => this.getFeed(url, force),
			staleTime: 1000 * 60 * 5,
		});
	}
}

export const feedService: FeedService = new FeedService();
