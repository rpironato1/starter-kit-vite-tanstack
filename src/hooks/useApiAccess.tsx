import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { ApiKeyGate } from "@/components/gates/ApiKeyGate";

interface ApiAccessContextValue {
	hasApiKey: boolean;
	isChecking: boolean;
	connectApiKey: () => Promise<void>;
}

const ApiAccessContext = createContext<ApiAccessContextValue | undefined>(
	undefined,
);

export function useApiAccess() {
	const context = useContext(ApiAccessContext);

	if (!context) {
		throw new Error("useApiAccess must be used within ApiAccessProvider");
	}

	return context;
}

export function ApiAccessProvider({ children }: { children: ReactNode }) {
	const [hasApiKey, setHasApiKey] = useState(false);
	const [isChecking, setIsChecking] = useState(true);
	const [isConnecting, setIsConnecting] = useState(false);

	useEffect(() => {
		let isMounted = true;

		async function checkApiKey() {
			try {
				const studio = (
					window as Window &
						typeof globalThis & {
							aistudio?: {
								hasSelectedApiKey?: () => Promise<boolean>;
							};
						}
				).aistudio;

				if (studio?.hasSelectedApiKey) {
					const selected = await studio.hasSelectedApiKey();
					if (isMounted) setHasApiKey(selected);
				} else {
					// Ambiente de desenvolvimento sem wrapper do Google AI Studio
					setHasApiKey(true);
				}
			} catch (error) {
				console.error("API key check failed", error);
				setHasApiKey(true);
			} finally {
				if (isMounted) setIsChecking(false);
			}
		}

		// Executar somente no cliente
		if (typeof window !== "undefined") {
			checkApiKey();
		} else {
			setIsChecking(false);
		}

		return () => {
			isMounted = false;
		};
	}, []);

	const connectApiKey = useMemo(
		() => async () => {
			try {
				setIsConnecting(true);
				if (typeof window === "undefined") {
					setHasApiKey(true);
					return;
				}
				const studio = (
					window as Window &
						typeof globalThis & {
							aistudio?: {
								openSelectKey?: () => Promise<void>;
							};
						}
				).aistudio;

				if (studio?.openSelectKey) {
					await studio.openSelectKey();
					setHasApiKey(true);
				} else {
					// Fallback para ambientes de desenvolvimento
					setHasApiKey(true);
				}
			} catch (error) {
				console.error("API key connection failed", error);
			} finally {
				setIsConnecting(false);
			}
		},
		[],
	);

	const contextValue = useMemo(
		() => ({
			hasApiKey,
			isChecking,
			connectApiKey,
		}),
		[connectApiKey, hasApiKey, isChecking],
	);

	if (isChecking) {
		return (
			<ApiAccessContext.Provider value={contextValue}>
				<div className="flex min-h-screen items-center justify-center bg-bg-main text-text-secondary">
					<div className="flex flex-col items-center gap-2">
						<div className="h-3 w-3 animate-pulse rounded-full bg-accent-primary" />
						<span className="text-sm font-medium">Inicializando...</span>
					</div>
				</div>
			</ApiAccessContext.Provider>
		);
	}

	if (!hasApiKey) {
		return (
			<ApiAccessContext.Provider value={contextValue}>
				<ApiKeyGate onConnect={connectApiKey} isConnecting={isConnecting} />
			</ApiAccessContext.Provider>
		);
	}

	return (
		<ApiAccessContext.Provider value={contextValue}>
			{children}
		</ApiAccessContext.Provider>
	);
}
