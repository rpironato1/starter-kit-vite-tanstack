import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import {
	type Language,
	type Translations,
	detectBrowserLanguage,
	getSavedLanguage,
	saveLanguage,
	translations,
} from "@/lib/i18n";

interface LanguageContextValue {
	language: Language;
	setLanguage: (language: Language) => void;
	t: Translations;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

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
		// Prioridade: 1. defaultLanguage prop, 2. localStorage, 3. navegador
		if (defaultLanguage) {
			return defaultLanguage;
		}

		const saved = getSavedLanguage();
		if (saved) {
			return saved;
		}

		return detectBrowserLanguage();
	});

	// Sincroniza com localStorage quando muda
	useEffect(() => {
		saveLanguage(language);
	}, [language]);

	// Atualiza o atributo lang do HTML
	useEffect(() => {
		document.documentElement.lang = language;
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
