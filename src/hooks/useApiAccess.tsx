import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { ApiKeyGate } from "@/components/gates/ApiKeyGate";
import {
	beginInitStep,
	completeInitStep,
	failInitStep,
	logApiAccess,
} from "@/lib/logger";

// Timeout de segurança para evitar travamento infinito
const API_CHECK_TIMEOUT_MS = 5000;

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
	// Estado inicial consistente entre SSR e CSR para evitar hydration mismatch
	// Padrão recomendado pelo TanStack Start: iniciar com estado "falso" e mudar após mount
	const [hasApiKey, setHasApiKey] = useState(false);
	const [isChecking, setIsChecking] = useState(false); // Começa false para SSR
	const [isConnecting, setIsConnecting] = useState(false);
	const [mounted, setMounted] = useState(false); // Track se está montado no cliente

	useEffect(() => {
		// Marcar como montado no cliente
		setMounted(true);
		setIsChecking(true); // Agora podemos mostrar loading

		let isMounted = true;
		let timeoutId: ReturnType<typeof setTimeout> | null = null;

		const timer = logApiAccess.time();
		timer.start();

		logApiAccess.group("API Key Check");
		beginInitStep("API Access Check");

		async function checkApiKey() {
			logApiAccess.info("Starting API key verification", {
				data: {
					context: typeof window !== "undefined" ? "client" : "server",
					timestamp: new Date().toISOString(),
				},
			});

			// Promise de timeout para evitar travamento
			const timeoutPromise = new Promise<never>((_, reject) => {
				timeoutId = setTimeout(() => {
					reject(
						new Error(`API check timeout after ${API_CHECK_TIMEOUT_MS}ms`),
					);
				}, API_CHECK_TIMEOUT_MS);
			});

			try {
				const studio = (
					window as Window &
						typeof globalThis & {
							aistudio?: {
								hasSelectedApiKey?: () => Promise<boolean>;
							};
						}
				).aistudio;

				logApiAccess.debug("Checking for aistudio global", {
					data: {
						hasAistudio: !!studio,
						hasMethod: !!studio?.hasSelectedApiKey,
					},
				});

				if (studio?.hasSelectedApiKey) {
					logApiAccess.info("Calling aistudio.hasSelectedApiKey()");

					// Race entre a verificação e o timeout
					const selected = await Promise.race([
						studio.hasSelectedApiKey(),
						timeoutPromise,
					]);

					logApiAccess.success("API key check completed", {
						data: { hasKey: selected },
					});

					if (isMounted) setHasApiKey(selected);
				} else {
					// Ambiente de desenvolvimento sem wrapper do Google AI Studio
					logApiAccess.info(
						"No aistudio wrapper detected - development mode, defaulting to true",
					);
					setHasApiKey(true);
				}

				completeInitStep("API Access Check");
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);

				logApiAccess.warn("API key check failed/timeout, defaulting to true", {
					data: { error: errorMessage },
				});

				// Em caso de erro ou timeout, permitir acesso para não travar a aplicação
				setHasApiKey(true);
				failInitStep("API Access Check", errorMessage);
			} finally {
				if (timeoutId) clearTimeout(timeoutId);

				if (isMounted) {
					setIsChecking(false);
					timer.end("API key verification complete");
					logApiAccess.groupEnd();
				}
			}
		}

		// Executar verificação (sempre no cliente após mount)
		logApiAccess.debug("Running on client, starting check");
		checkApiKey();

		return () => {
			isMounted = false;
			if (timeoutId) clearTimeout(timeoutId);
			logApiAccess.debug("ApiAccessProvider cleanup");
		};
	}, []);

	const connectApiKey = useMemo(
		() => async () => {
			const timer = logApiAccess.time();
			timer.start();

			logApiAccess.info("Initiating API key connection");

			try {
				setIsConnecting(true);
				if (typeof window === "undefined") {
					logApiAccess.debug("Server context - setting hasApiKey to true");
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
					logApiAccess.info("Opening aistudio key selector");
					await studio.openSelectKey();
					logApiAccess.success("API key connected successfully");
					setHasApiKey(true);
				} else {
					// Fallback para ambientes de desenvolvimento
					logApiAccess.info("No aistudio.openSelectKey - dev mode fallback");
					setHasApiKey(true);
				}

				timer.end("API key connection complete");
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : String(error);
				logApiAccess.error("API key connection failed", {
					data: { error: errorMessage },
				});
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

	// SSR e primeiro render CSR: renderiza children (sem loading)
	// Após mount e durante verificação: mostra loading
	if (mounted && isChecking) {
		logApiAccess.debug("Rendering loading state (client mounted)", {
			data: { isChecking, hasApiKey, mounted },
		});

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

	// Após verificação: se não tem API key, mostra gate
	if (mounted && !hasApiKey) {
		logApiAccess.info("Rendering ApiKeyGate", {
			data: { hasApiKey, isConnecting },
		});

		return (
			<ApiAccessContext.Provider value={contextValue}>
				<ApiKeyGate onConnect={connectApiKey} isConnecting={isConnecting} />
			</ApiAccessContext.Provider>
		);
	}

	// SSR, primeiro render, ou após verificação bem-sucedida: renderiza children
	logApiAccess.debug("Rendering children - API access granted or SSR");

	return (
		<ApiAccessContext.Provider value={contextValue}>
			{children}
		</ApiAccessContext.Provider>
	);
}
