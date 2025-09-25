import ArticlePage from "@modules/article/ArticlePage";
import AuthPage from "@modules/auth/AuthPage";
import { useAuthStore } from "@modules/auth/auth.store";
import FeedPage from "@modules/feed/FeedPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTER_KEYS } from "../keys/keys";
import AppLayout from "../layouts/AppLayout";

export const AppRouter: React.FC = () => {
	const isAuth = useAuthStore((state) => state.isAuth);

	return (
		<Routes>
			{isAuth ? (
				<Route path={ROUTER_KEYS.ROOT} element={<AppLayout />}>
					<Route index element={<Navigate to={ROUTER_KEYS.FEED} replace />} />
					<Route path={ROUTER_KEYS.FEED} element={<FeedPage />} />
					<Route path={ROUTER_KEYS.ARTICLE} element={<ArticlePage />} />
					<Route
						path={ROUTER_KEYS.ALL_MATCH}
						element={<Navigate to="/feed" replace />}
					/>
				</Route>
			) : (
				<Route path={ROUTER_KEYS.ROOT} element={<AppLayout />}>
					<Route index element={<Navigate to={ROUTER_KEYS.AUTH} replace />} />
					<Route path={ROUTER_KEYS.AUTH} element={<AuthPage />} />
					<Route
						path={ROUTER_KEYS.ALL_MATCH}
						element={<Navigate to={ROUTER_KEYS.AUTH} replace />}
					/>
				</Route>
			)}
		</Routes>
	);
};
