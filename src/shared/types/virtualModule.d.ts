declare module "virtual:modules" {
	import type { AuthSwitchProps } from "../modules/auth/components/AuthSwitch";
	import type { LoginFormProps } from "../modules/auth/components/LoginForm";
	import type { RegisterFormProps } from "../modules/auth/components/RegisterForm";
	import type useAuthStoreType from "../modules/auth/store";

	export const LoginForm: React.FC<LoginFormProps>;
	export const RegisterForm: React.FC<RegisterFormProps>;
	export const AuthSwitch: React.FC<AuthSwitchProps>;
	export const useAuthStore: typeof useAuthStoreType;
	export const authService: typeof import("../modules/auth/service");
}
