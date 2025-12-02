import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ApiAccessProvider } from "@/app/providers/api-access";
import {
	TokenUsagePortal,
	TokenUsageProvider,
} from "@/app/providers/token-usage";

interface AppProvidersProps {
	children: ReactNode;
}

/**
 * Composes all global providers required by the application shell.
 * Mantém dependências do App Shell isoladas da camada de domínio.
 */
export function AppProviders({ children }: AppProvidersProps) {
	return (
		<LanguageProvider>
			<ApiAccessProvider>
				<TokenUsageProvider>
					{children}
					<TokenUsagePortal />
				</TokenUsageProvider>
			</ApiAccessProvider>
		</LanguageProvider>
	);
}
