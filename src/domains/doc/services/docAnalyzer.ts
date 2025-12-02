import type { DocMessage, UploadedDocument } from "@/domains/doc/components";
import { wait } from "@/shared/utils/async";
import type { TokenUsage } from "@/types";

const DOC_ANALYSIS_DELAY_MS = 1800;

export const DOC_EXECUTION_PLAN = [
	"Indexar documentos recebidos e extrair metadados.",
	"Criar mapa de tópicos relevantes e confirmar intenção.",
	"Redigir resposta com evidências dos arquivos analisados.",
];

export function createDocUsage(
	prompt: string,
	fileCount: number,
): TokenUsage {
	const base = Math.max(prompt.length, 120);
	const inputTokens = 140 + Math.round(base * 0.3) + fileCount * 20;
	const outputTokens = 260;
	const thinkingTokens = 90;
	const cachedContentTokens = fileCount * 15;
	const totalTokens =
		inputTokens +
		outputTokens +
		thinkingTokens -
		Math.floor(cachedContentTokens / 2);

	return {
		inputTokens,
		outputTokens,
		thinkingTokens,
		cachedContentTokens,
		totalTokens,
		steps: [
			{
				stepName: "Indexação",
				tool: "zane-doc-ingest",
				input: Math.round(inputTokens * 0.5),
				output: 72,
				think: 18,
				cache: cachedContentTokens,
			},
			{
				stepName: "Análise",
				tool: "zane-doc-core",
				input: Math.round(inputTokens * 0.5),
				output: outputTokens,
				think: thinkingTokens,
				cache: 0,
			},
		],
	};
}

function formatAttachedFiles(files?: UploadedDocument[]): string {
	if (!files?.length) return "";
	return files.map((file) => `- ${file.name}`).join("\n");
}

function buildAssistantMessage(userMessage: DocMessage): DocMessage {
	const fileList = formatAttachedFiles(userMessage.attachedFiles);
	const attachmentsBlock = fileList
		? `### Arquivos\n${fileList}\n\n`
		: "";

	return {
		id: crypto.randomUUID(),
		role: "assistant",
		content: `## Análise de Documentos\n\nAnalisei: "${userMessage.content}"\n\n${attachmentsBlock}Resposta simulada. Em produção, análise detalhada será fornecida.`,
		timestamp: new Date(),
		usage: createDocUsage(
			userMessage.content,
			userMessage.attachedFiles?.length ?? 0,
		),
		executionPlan: DOC_EXECUTION_PLAN,
	};
}

async function analyze(userMessage: DocMessage): Promise<DocMessage> {
	await wait(DOC_ANALYSIS_DELAY_MS);
	return buildAssistantMessage(userMessage);
}

export const docAnalyzer = {
	analyze,
};

export type DocAnalyzer = typeof docAnalyzer;
