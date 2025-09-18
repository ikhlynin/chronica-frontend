import { create } from "zustand";
import type { FeedState } from "./feed.types";

export const useFeedStore = create<FeedState>()((set) => ({
	items: [],
	setItems: (items) => set({ items }),
}));
