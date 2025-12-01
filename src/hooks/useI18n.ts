import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import type { Language, Translations } from "@/lib/i18n";

interface UseTranslationReturn {
	/** Objeto com todas as traduções no idioma atual */
	t: Translations;
	/** Idioma atual */
	language: Language;
	/** Função para alterar o idioma */
	setLanguage: (language: Language) => void;
}

/**
 * Hook para acessar as traduções e gerenciar o idioma
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, language, setLanguage } = useTranslation();
 *
 *   return (
 *     <div>
 *       <h1>{t.welcome.line1}</h1>
 *       <button onClick={() => setLanguage('en-US')}>English</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTranslation(): UseTranslationReturn {
	const context = useContext(LanguageContext);

	if (!context) {
		throw new Error(
			"useTranslation must be used within a LanguageProvider. " +
				"Make sure to wrap your app with <LanguageProvider>.",
		);
	}

	return {
		t: context.t,
		language: context.language,
		setLanguage: context.setLanguage,
	};
}

/**
 * Hook simplificado que retorna apenas o objeto de traduções
 * Útil quando você não precisa alterar o idioma
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const t = useT();
 *   return <h1>{t.sidebar.chats}</h1>;
 * }
 * ```
 */
export function useT(): Translations {
	const { t } = useTranslation();
	return t;
}
