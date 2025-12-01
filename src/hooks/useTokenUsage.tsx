import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import { createContext, type ReactNode, useContext, useMemo } from "react";
import { type TokenUsage, TokenUsageModal } from "@/components/modals";

interface TokenUsageState {
	currentUsage: TokenUsage | null;
}

interface TokenUsageContextValue {
	openTokenUsage: (usage: TokenUsage) => void;
	closeTokenUsage: () => void;
	currentUsage: TokenUsage | null;
}

const tokenUsageStore = new Store<TokenUsageState>({
	currentUsage: null,
});

const TokenUsageContext = createContext<TokenUsageContextValue | undefined>(
	undefined,
);

function openUsage(usage: TokenUsage) {
	tokenUsageStore.setState(() => ({ currentUsage: usage }));
}

function closeUsage() {
	tokenUsageStore.setState(() => ({ currentUsage: null }));
}

export function useTokenUsage() {
	const context = useContext(TokenUsageContext);

	if (!context) {
		throw new Error("useTokenUsage must be used within TokenUsageProvider");
	}

	return context;
}

export function TokenUsageProvider({ children }: { children: ReactNode }) {
	const currentUsage = useStore(tokenUsageStore, (state) => state.currentUsage);

	const value = useMemo(
		() => ({
			openTokenUsage: openUsage,
			closeTokenUsage: closeUsage,
			currentUsage,
		}),
		[currentUsage],
	);

	return (
		<TokenUsageContext.Provider value={value}>
			{children}
			{currentUsage && (
				<TokenUsageModal isOpen onClose={closeUsage} usage={currentUsage} />
			)}
		</TokenUsageContext.Provider>
	);
}
