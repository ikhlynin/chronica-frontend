import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTER_KEYS } from "@/shared";
import LoginPage from "../modules/auth/pages/LoginPage";
import SignupPage from "../modules/auth/pages/SignupPage";
import FeedPage from "../modules/feed/page/FeedPage";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route
				path={ROUTER_KEYS.ALL_MATCH}
				element={<Navigate to={ROUTER_KEYS.LOGIN} replace />}
			/>
			<Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />
			<Route path={ROUTER_KEYS.SIGNUP} element={<SignupPage />} />
			<Route path={ROUTER_KEYS.FEED} element={<FeedPage />} />
		</Routes>
	);
};
