import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { type TokenUsage, TokenUsageModal } from "@/components/modals";

interface TokenUsageContextValue {
	openTokenUsage: (usage: TokenUsage) => void;
	closeTokenUsage: () => void;
}

const TokenUsageContext = createContext<TokenUsageContextValue | undefined>(
	undefined,
);

export function useTokenUsage() {
	const context = useContext(TokenUsageContext);

	if (!context) {
		throw new Error("useTokenUsage must be used within TokenUsageProvider");
	}

	return context;
}

export function TokenUsageProvider({ children }: { children: ReactNode }) {
	const [currentUsage, setCurrentUsage] = useState<TokenUsage | null>(null);

	const openTokenUsage = useCallback((usage: TokenUsage) => {
		setCurrentUsage(usage);
	}, []);

	const closeTokenUsage = useCallback(() => {
		setCurrentUsage(null);
	}, []);

	const value = useMemo(
		() => ({
			openTokenUsage,
			closeTokenUsage,
		}),
		[closeTokenUsage, openTokenUsage],
	);

	return (
		<TokenUsageContext.Provider value={value}>
			{children}
			{currentUsage && (
				<TokenUsageModal
					isOpen
					onClose={closeTokenUsage}
					usage={currentUsage}
				/>
			)}
		</TokenUsageContext.Provider>
	);
}
