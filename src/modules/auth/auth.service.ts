import api from "@shared/axios";
import { useAuthStore } from "./auth.store";

class AuthService {
	async login(email: string, password: string): Promise<void> {
		try {
			await api.post("/auth/login", { email, password });
			useAuthStore.getState().setIsAuth(true);
			/* biome-ignore lint: temporary ignore noExplicitAny errors */
		} catch (err: any) {
			console.error("Login failed:", err.response?.data || err.message);
			throw new Error(err.response.data.error || "Login failed");
		}
	}

	async signup(email: string, name: string, password: string): Promise<void> {
		try {
			await api.post("/auth/signup", { email, name, password });
			useAuthStore.getState().setIsAuth(true);
			/* biome-ignore lint: temporary ignore noExplicitAny errors */
		} catch (err: any) {
			console.error("Signup failed:", err.response?.data || err.message);
			throw new Error(err.response?.data?.message || "Signup failed");
		}
	}

	async refresh(): Promise<void> {
		try {
			await api.post("/auth/refresh");
			useAuthStore.getState().setIsAuth(true);
			/* biome-ignore lint: temporary ignore noExplicitAny errors */
		} catch (err: any) {
			console.error("Refresh failed:", err.response?.data || err.message);
			throw new Error(err.response?.data?.message || "Refresh failed");
		}
	}

	async logout(): Promise<void> {
		try {
			await api.post("/auth/logout");
			useAuthStore.getState().setIsAuth(false);
			/* biome-ignore lint: temporary ignore noExplicitAny errors */
		} catch (err: any) {
			console.error("Logout failed:", err.response?.data || err.message);
			throw new Error(err.response?.data?.message || "Logout failed");
		}
	}
}

export const authService: AuthService = new AuthService();
