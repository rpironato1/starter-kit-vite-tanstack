import {
	createContext,
	type ReactNode,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import {
	detectBrowserLanguage,
	getSavedLanguage,
	type Language,
	saveLanguage,
	type Translations,
	translations,
} from "@/lib/i18n";

interface LanguageContextValue {
	language: Language;
	setLanguage: (language: Language) => void;
	t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const useIsomorphicLayoutEffect =
	typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface LanguageProviderProps {
	children: ReactNode;
	defaultLanguage?: Language;
}

/**
 * Provider que gerencia o estado do idioma da aplicação
 * - Detecta idioma do navegador como default
 * - Persiste preferência no localStorage
 * - Fornece traduções através do contexto
 */
export function LanguageProvider({
	children,
	defaultLanguage,
}: LanguageProviderProps) {
	const [language, setLanguageState] = useState<Language>(() => {
		// Prioridade: default fornecido → dataset pré-hidratado → localStorage → navegador
		if (defaultLanguage) {
			return defaultLanguage;
		}

		if (typeof document !== "undefined") {
			const datasetLanguage = document.documentElement.dataset.language;
			if (datasetLanguage === "pt-BR" || datasetLanguage === "en-US") {
				return datasetLanguage;
			}
		}

		const saved = getSavedLanguage();
		if (saved) {
			return saved;
		}

		return detectBrowserLanguage();
	});

	// Hidratar imediatamente com o idioma salvo para evitar flicker
	useIsomorphicLayoutEffect(() => {
		const saved = getSavedLanguage();
		if (saved) {
			setLanguageState(saved);
		}
	}, []);

	// Sincroniza com localStorage quando muda
	useEffect(() => {
		saveLanguage(language);
	}, [language]);

	// Atualiza atributos do HTML imediatamente após mudança
	useIsomorphicLayoutEffect(() => {
		if (typeof document === "undefined") {
			return;
		}
		document.documentElement.lang = language;
		document.documentElement.dataset.language = language;
	}, [language]);

	const setLanguage = useCallback((newLanguage: Language) => {
		setLanguageState(newLanguage);
	}, []);

	const value = useMemo<LanguageContextValue>(
		() => ({
			language,
			setLanguage,
			t: translations[language],
		}),
		[language, setLanguage],
	);

	return (
		<LanguageContext.Provider value={value}>
			{children}
		</LanguageContext.Provider>
	);
}
