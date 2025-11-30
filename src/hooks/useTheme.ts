import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import { useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeState {
	theme: Theme;
}

// Store global para tema
const themeStore = new Store<ThemeState>({
	theme: "dark", // Dark mode é o padrão
});

// Funções para manipular o store
export function setTheme(theme: Theme) {
	themeStore.setState((state) => ({
		...state,
		theme,
	}));
}

export function toggleTheme() {
	themeStore.setState((state) => ({
		...state,
		theme: state.theme === "dark" ? "light" : "dark",
	}));
}

// Hook para usar o tema
export function useTheme() {
	const theme = useStore(themeStore, (state) => state.theme);
	const isDark = theme === "dark";

	// Efeito para aplicar classe no body
	useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Persistir no localStorage
		localStorage.setItem("zane-theme", theme);
	}, [theme]);

	// Inicializar do localStorage
	useEffect(() => {
		const saved = localStorage.getItem("zane-theme") as Theme | null;
		if (saved) {
			setTheme(saved);
		}
	}, []);

	return {
		theme,
		isDark,
		setTheme,
		toggleTheme,
	};
}
