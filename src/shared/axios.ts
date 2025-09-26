import { useAuthStore } from "@modules/auth/auth.store";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3000",
	headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
	const token = useAuthStore.getState().accessToken;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
