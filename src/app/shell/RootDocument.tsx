import type { ReactNode } from "react";
import { useEffect } from "react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { HeadContent, Scripts } from "@tanstack/react-router";
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools";
import {
	beginInitStep,
	completeGlobalInit,
	completeInitStep,
	logEnvironmentInfo,
	logRoot,
} from "@/lib/logger";

interface RootDocumentProps {
	children: ReactNode;
}

/**
 * Document shell que encapsula `<html>`/`<body>` e devtools globais.
 */
export function RootDocument({ children }: RootDocumentProps) {
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

		logEnvironmentInfo();

		completeInitStep("RootDocument Render");
		timer.end("RootDocument initialization complete");
		logRoot.groupEnd();

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
