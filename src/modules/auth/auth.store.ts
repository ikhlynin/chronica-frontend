import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./auth.types";

export const useAuthStore = create<AuthState>()(
	persist<AuthState>(
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
