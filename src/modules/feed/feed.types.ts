export interface FeedState {
	items: FeedItemType[];
	setItems: (items: FeedItemType[]) => void;
}

export interface FeedItemType {
	title: string;
	link?: string;
	guid: string;
	content: string;
	contentSnippet: string;
	isoDate: string;
	image?: string;
}
