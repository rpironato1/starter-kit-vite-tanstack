import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import { useEffect } from "react";
import { beginInitStep, completeInitStep, logTheme } from "@/lib/logger";

type Theme = "light" | "dark";

interface ThemeState {
	theme: Theme;
}

// Store global para tema
const themeStore = new Store<ThemeState>({
	theme: "dark", // Dark mode é o padrão
});

logTheme.debug("ThemeStore initialized", {
	data: { defaultTheme: "dark" },
});

// Funções para manipular o store
export function setTheme(theme: Theme) {
	logTheme.info("Setting theme", { data: { newTheme: theme } });
	themeStore.setState((state) => ({
		...state,
		theme,
	}));
}

export function toggleTheme() {
	const currentTheme = themeStore.state.theme;
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	logTheme.info("Toggling theme", {
		data: { from: currentTheme, to: newTheme },
	});
	themeStore.setState((state) => ({
		...state,
		theme: newTheme,
	}));
}

// Safe localStorage access
function safeLocalStorageGet(key: string): string | null {
	try {
		if (typeof window === "undefined") return null;
		return localStorage.getItem(key);
	} catch (error) {
		logTheme.warn("localStorage.getItem failed", {
			data: { key, error: String(error) },
		});
		return null;
	}
}

function safeLocalStorageSet(key: string, value: string): boolean {
	try {
		if (typeof window === "undefined") return false;
		localStorage.setItem(key, value);
		return true;
	} catch (error) {
		logTheme.warn("localStorage.setItem failed", {
			data: { key, error: String(error) },
		});
		return false;
	}
}

// Hook para usar o tema
export function useTheme() {
	const theme = useStore(themeStore, (state) => state.theme);
	const isDark = theme === "dark";

	// Efeito para aplicar classe no body
	useEffect(() => {
		logTheme.debug("Applying theme class to document", {
			data: { theme, isDark },
		});

		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Persistir no localStorage
		const saved = safeLocalStorageSet("zane-theme", theme);
		if (saved) {
			logTheme.debug("Theme persisted to localStorage", { data: { theme } });
		}
	}, [theme, isDark]);

	// Inicializar do localStorage
	useEffect(() => {
		beginInitStep("Theme Initialization");

		const saved = safeLocalStorageGet("zane-theme") as Theme | null;

		logTheme.info("Loading theme from localStorage", {
			data: {
				savedTheme: saved,
				willApply: !!saved,
			},
		});

		if (saved) {
			setTheme(saved);
		}

		completeInitStep("Theme Initialization");
	}, []);

	return {
		theme,
		isDark,
		setTheme,
		toggleTheme,
	};
}
