import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ApiAccessProvider } from "@/hooks/useApiAccess";
import { TokenUsagePortal, TokenUsageProvider } from "@/hooks/useTokenUsage";
import {
	beginInitStep,
	completeGlobalInit,
	completeInitStep,
	logEnvironmentInfo,
	logRoot,
} from "@/lib/logger";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Zane Chat AI",
			},
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
	component: RootComponent,
});

/**
 * RootComponent - Componente principal que renderiza o layout com providers
 * Segue padrão TanStack Start: shellComponent para HTML shell, component para conteúdo
 */
function RootComponent() {
	useEffect(() => {
		logRoot.info("RootComponent mounted (CSR)", {
			data: {
				url: window.location.href,
				timestamp: new Date().toISOString(),
			},
		});

		return () => {
			logRoot.debug("RootComponent unmounting");
		};
	}, []);

	return (
		<LanguageProvider>
			<ApiAccessProvider>
				<TokenUsageProvider>
					<Outlet />
					<TokenUsagePortal />
				</TokenUsageProvider>
			</ApiAccessProvider>
		</LanguageProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const timer = logRoot.time();
		timer.start();

		logRoot.group("RootDocument Mount");
		beginInitStep("RootDocument Render");

		logRoot.info("RootDocument mounted", {
			data: {
				url: typeof window !== "undefined" ? window.location.href : "SSR",
				timestamp: new Date().toISOString(),
			},
		});

		// Log environment info on mount
		logEnvironmentInfo();

		completeInitStep("RootDocument Render");
		timer.end("RootDocument initialization complete");
		logRoot.groupEnd();

		// Complete global init sequence
		completeGlobalInit();

		return () => {
			logRoot.debug("RootDocument unmounting");
		};
	}, []);

	logRoot.debug("RootDocument rendering", {
		data: { hasChildren: !!children },
	});

	return (
		<html lang="pt-BR" data-language="pt-BR" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
