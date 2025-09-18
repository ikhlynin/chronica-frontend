export interface User {
	id: string;
	email: string;
	name: string;
}

export interface AuthState {
	accessToken: string | null;
	isAuth: boolean;
	setAccessToken: (accessToken: string) => void;
	logout: () => void;
}
