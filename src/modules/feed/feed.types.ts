export interface FeedState {
	items: FeedItemType[];
	setItems: (items: FeedItemType[]) => void;
}

export interface FeedItemType {
	title: string;
	image: string;
	content: string;
	contentSnippet: string;
	creator: string;
	guid: string;
	isoDate: string;
	link: string;
}
