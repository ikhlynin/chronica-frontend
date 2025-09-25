export interface User {
	id: string;
	email: string;
	name: string;
}

export interface AuthState {
	accessToken: string | null;
	isAuth: boolean;
	setIsAuth: (isAuthValue: boolean) => void;
}
