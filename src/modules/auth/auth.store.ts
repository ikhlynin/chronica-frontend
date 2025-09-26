import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState } from "./auth.types";

export const useAuthStore = create<AuthState>()(
	persist<AuthState>(
		(set) => ({
			accessToken: null,
			isAuth: false,
			setIsAuth: (isAuthValue: boolean) => set({ isAuth: isAuthValue }),
		}),
		{ name: "auth-storage" },
	),
);
