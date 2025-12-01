import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beginInitStep, completeInitStep, logQueryClient } from "@/lib/logger";

// Singleton pattern para QueryClient
let queryClientInstance: QueryClient | null = null;
let instanceCount = 0;

export function getContext() {
	const timer = logQueryClient.time();
	timer.start();

	beginInitStep("QueryClient Setup");

	if (queryClientInstance) {
		logQueryClient.debug("Returning existing QueryClient singleton", {
			data: { instanceId: instanceCount },
		});
		completeInitStep("QueryClient Setup");
		timer.end("QueryClient context retrieved (cached)");
		return { queryClient: queryClientInstance };
	}

	instanceCount++;
	logQueryClient.info("Creating new QueryClient instance", {
		data: {
			instanceId: instanceCount,
			timestamp: new Date().toISOString(),
		},
	});

	queryClientInstance = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60, // 1 minute
				gcTime: 1000 * 60 * 5, // 5 minutes
			},
		},
	});

	logQueryClient.success("QueryClient singleton created", {
		data: {
			instanceId: instanceCount,
			defaultStaleTime: "1 minute",
			defaultGcTime: "5 minutes",
		},
	});

	completeInitStep("QueryClient Setup");
	timer.end("QueryClient created");

	return {
		queryClient: queryClientInstance,
	};
}

export function Provider({
	children,
	queryClient,
}: {
	children: React.ReactNode;
	queryClient: QueryClient;
}) {
	logQueryClient.debug("QueryClientProvider rendering", {
		data: { hasClient: !!queryClient },
	});

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
