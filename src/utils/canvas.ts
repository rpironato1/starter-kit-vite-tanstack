import type { CanvasArtifact } from "@/types";

/** Mapa de linguagens para títulos legíveis */
const titleMap: Record<string, string> = {
	html: "Aplicação Web",
	css: "Estilos CSS",
	javascript: "Script JavaScript",
	js: "Script JavaScript",
	typescript: "Script TypeScript",
	ts: "Script TypeScript",
	tsx: "Componente React",
	jsx: "Componente React",
	react: "Componente React",
	python: "Script Python",
	py: "Script Python",
	json: "Dados JSON",
	markdown: "Documento Markdown",
	md: "Documento Markdown",
	sql: "Query SQL",
	bash: "Script Shell",
	sh: "Script Shell",
	latex: "Documento LaTeX",
	tex: "Documento LaTeX",
};

/** Tipos considerados documentos (não código) */
const documentTypes = ["markdown", "md", "txt", "text", "latex", "tex"];

/**
 * Extrai artefato de código de uma mensagem AI
 * Procura por blocos de código ``` e deduz linguagem/título
 */
export function parseArtifactFromMessage(
	content: string,
): CanvasArtifact | null {
	const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
	const match = content.match(codeBlockRegex);

	if (!match) {
		return null;
	}

	const language = match[1] || "plaintext";
	const code = (match[2] ?? "").trim();
	const langLower = language.toLowerCase();

	const title = titleMap[langLower] || `Snippet ${language.toUpperCase()}`;
	const type = documentTypes.includes(langLower) ? "document" : "code";

	return {
		id: `artifact-${Date.now()}`,
		title,
		type,
		language,
		content: code,
		isVisible: true,
	};
}

/**
 * Extrai múltiplos artefatos de uma mensagem
 */
export function parseAllArtifacts(content: string): CanvasArtifact[] {
	const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
	const artifacts: CanvasArtifact[] = [];

	for (const match of content.matchAll(codeBlockRegex)) {
		const artifact = parseArtifactFromMessage(match[0]);
		if (artifact) {
			artifacts.push({
				...artifact,
				id: `artifact-${Date.now()}-${artifacts.length}`,
			});
		}
	}

	return artifacts;
}

/**
 * Remove blocos de código do conteúdo (para exibição limpa)
 */
export function stripCodeBlocks(content: string): string {
	return content.replace(/```(\w+)?\n[\s\S]*?```/g, "").trim();
}
