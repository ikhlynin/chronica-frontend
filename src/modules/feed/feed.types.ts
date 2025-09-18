export interface FeedState {
	items: FeedItemType[];
	setItems: (items: FeedItemType[]) => void;
}

export interface FeedItemType {
	id: string;
	title: string;
	description: string;
	image: string;
	createdAt: string;
}
