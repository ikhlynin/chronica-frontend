import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "virtual:modules";

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	tracesSampleRate: 1.0,
	environment: import.meta.env.MODE,
	sendDefaultPii: true,
	enableLogs: true,
	integrations: [Sentry.browserTracingIntegration()],
});

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Root element not found");
}

const queryClient = new QueryClient();

createRoot(rootElement).render(
	<Sentry.ErrorBoundary fallback={<p>some error</p>}>
		<QueryClientProvider client={queryClient}>
			<StrictMode>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</StrictMode>
		</QueryClientProvider>
		,
	</Sentry.ErrorBoundary>,
);
