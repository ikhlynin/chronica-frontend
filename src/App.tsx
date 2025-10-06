import { useEffect } from "react";
import { metricService } from "./modules/metrics/metric.service";
import { AppRouter } from "./shared/router/AppRouter";

const App = () => {
	useEffect(() => {
		metricService.init();

		metricService.sendEvent({
			event: "pageLoad",
			timestamp: new Date().toISOString(),
			pageUrl: window.location.href,
		});

		return () => metricService.destroy();
	}, []);

	return <AppRouter />;
};

export default App;
