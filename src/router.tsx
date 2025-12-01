import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ApiAccessProvider } from "@/hooks/useApiAccess";
import { TokenUsageProvider } from "@/hooks/useTokenUsage";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const rqContext = TanstackQuery.getContext();

	const router = createRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: "intent",
		Wrap: (props: { children: React.ReactNode }) => (
			<TanstackQuery.Provider {...rqContext}>
				<ApiAccessProvider>
					<TokenUsageProvider>{props.children}</TokenUsageProvider>
				</ApiAccessProvider>
			</TanstackQuery.Provider>
		),
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	return router;
};
