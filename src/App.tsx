import { useEffect } from "react";
import { initPrebid } from "./modules/ad/prebid/initPrebid";
import { AppRouter } from "./shared/router/AppRouter";

const App = () => {
	useEffect(() => {
		initPrebid();
	});
	return <AppRouter />;
};

export default App;
