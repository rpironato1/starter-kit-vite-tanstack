import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import {
	beginInitStep,
	completeInitStep,
	logRouter,
	startGlobalInit,
} from "@/lib/logger";
import * as TanstackQuery from "./integrations/tanstack-query/root-provider";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const timer = logRouter.time();
	timer.start();

	// Start global initialization sequence
	startGlobalInit();

	logRouter.group("Router Creation");
	beginInitStep("Router Setup");

	logRouter.info("Getting TanStack Query context");
	const rqContext = TanstackQuery.getContext();

	logRouter.info("Creating router with route tree", {
		data: {
			defaultPreload: "intent",
			hasRouteTree: !!routeTree,
		},
	});

	const router = createRouter({
		routeTree,
		context: { ...rqContext },
		defaultPreload: "intent",
		// Wrap apenas com QueryProvider - os outros providers estão no RootComponent
		Wrap: (props: { children: React.ReactNode }) => {
			logRouter.debug("Router Wrap component rendering (QueryProvider only)");
			return (
				<TanstackQuery.Provider {...rqContext}>
					{props.children}
				</TanstackQuery.Provider>
			);
		},
	});

	logRouter.info("Setting up SSR Query integration");
	setupRouterSsrQueryIntegration({
		router,
		queryClient: rqContext.queryClient,
	});

	completeInitStep("Router Setup");
	timer.end("Router created successfully");
	logRouter.groupEnd();

	return router;
};
