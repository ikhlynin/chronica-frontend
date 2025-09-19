import { useQuery } from "@tanstack/react-query";
import type { FeedItemType } from "./feed.types";

const mockFeed: FeedItemType[] = [
	{
		id: "1",
		title: "Town revamp plan inspired by Sweden's capital",
		description:
			"Plans for a new town neighbourhood is taking inspiration from a Swedish city. Wirral Council said it was looking at the Royal Seaport in Stockholm as a possible blueprint for the planned Dock Branch Park in Birkenhead.",
		image:
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQgZcL6ut3eJd2joDAhrz7m3wrVgsD4_dbOw&s",
		createdAt: "2025-09-18T12:00:00Z",
	},
	{
		id: "2",
		title: "Change building rules to boost homes, report urges",
		description:
			"The mayor of London should slash affordable housing requirements and release swathes of green belt land to solve the capital's housing crisis, a new report has urged.",
		image:
			"https://media.cntraveller.com/photos/63f37018ea053d878b345cb2/3:2/w_3870,h_2580,c_limit/London-GettyImages-585295947.jpeg",
		createdAt: "2025-09-17T18:30:00Z",
	},
];

class FeedService {
	async getFeed(): Promise<FeedItemType[]> {
		return new Promise((resolve) => {
			setTimeout(() => resolve(mockFeed), 500);
		});
	}

	getShortDescription(text: string, maxLength = 120) {
		if (text.length <= maxLength) return text;

		return `${text.slice(0, maxLength).trimEnd()}...`;
	}

	useFeedQuery() {
		return useQuery<FeedItemType[]>({
			queryKey: ["feed"],
			queryFn: () => this.getFeed(),
			staleTime: 1000 * 60 * 5,
			retry: 3,
		});
	}
}

export const feedService: FeedService = new FeedService();
