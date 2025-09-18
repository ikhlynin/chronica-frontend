import type { FeedState } from "virtual:modules";
import { create } from "zustand";

export const useFeedStore = create<FeedState>((set) => ({
	items: [],
	setItems: (items) => set({ items }),
}));
