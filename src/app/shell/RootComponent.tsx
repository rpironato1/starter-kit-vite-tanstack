import { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { AppProviders } from "@/app/providers";
import { logRoot } from "@/lib/logger";

/**
 * RootComponent responsavel por montar os providers globais e expor o Outlet.
 */
export function RootComponent() {
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
		<AppProviders>
			<Outlet />
		</AppProviders>
	);
}
