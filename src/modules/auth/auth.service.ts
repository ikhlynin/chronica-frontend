import { useAuthStore } from "virtual:modules";

class AuthService {
	async login(_email: string, _password: string): Promise<string> {
		const accessToken = this.generateMockToken("access");
		useAuthStore.getState().setAccessToken(accessToken);
		return accessToken;
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
