import { AppRoutes } from "@/router/AppRoutes";
import { Header } from "@/shared/components";

const App = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<AppRoutes />
		</div>
	);
};

export default App;
