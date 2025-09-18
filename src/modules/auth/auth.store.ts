import type { AuthState } from "virtual:modules";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>(
	persist(
		(set) => ({
			accessToken: null,
			isAuth: false,
			setAccessToken: (token: string | null) =>
				set({ accessToken: token, isAuth: true }),
			logout: () => set({ accessToken: null, isAuth: false }),
		}),
		{ name: "auth-storage" },
	),
);
