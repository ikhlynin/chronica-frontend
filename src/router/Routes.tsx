import {
	FeedPage,
	LoginPage,
	NewsPage,
	ROUTER_KEYS,
	SignupPage,
} from "virtual:modules";
import { Navigate, Route, Routes } from "react-router-dom";

export const publicRoutes = (
	<Routes>
		<Route path={ROUTER_KEYS.LOGIN} element={<LoginPage />} />
		<Route path={ROUTER_KEYS.SIGNUP} element={<SignupPage />} />
		<Route
			path={ROUTER_KEYS.ALL_MATCH}
			element={<Navigate to={ROUTER_KEYS.LOGIN} replace />}
		/>
	</Routes>
);

export const privateRoutes = (
	<Routes>
		<Route path={ROUTER_KEYS.FEED} element={<FeedPage />} />
		<Route path={ROUTER_KEYS.NEWS} element={<NewsPage />} />
		<Route
			path={ROUTER_KEYS.ALL_MATCH}
			element={<Navigate to={ROUTER_KEYS.FEED} replace />}
		/>
	</Routes>
);
