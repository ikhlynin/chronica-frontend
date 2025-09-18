import { useAuthStore } from "@modules/auth/auth.store";
import Header from "@shared/components/header/Header";
import type React from "react";
import { privateRoutes, publicRoutes } from "./Routes";

export const AppRouter: React.FC = () => {
	const { isAuth } = useAuthStore();

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">{isAuth ? privateRoutes : publicRoutes}</main>
		</div>
	);
};
