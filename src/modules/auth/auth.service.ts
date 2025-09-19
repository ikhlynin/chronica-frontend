import { useAuthStore } from "./auth.store";

class AuthService {
	async login(_email: string, _password: string): Promise<string> {
		const accessToken = this.generateMockToken("access");
		useAuthStore.getState().setAccessToken(accessToken);
		return accessToken;
	}

	async signup(email: string, name: string, password: string): Promise<string> {
		console.log("test");
		return email + name + password;
	}

	async refresh(): Promise<string> {
		const accessToken = this.generateMockToken("refresh");
		useAuthStore.getState().setAccessToken(accessToken);
		return accessToken;
	}

	async logout(): Promise<void> {
		useAuthStore.getState().logout();
	}

	private generateMockToken(type: "access" | "refresh"): string {
		return `mock-${type}-token-${Date.now()}`;
	}
}

export const authService: AuthService = new AuthService();
