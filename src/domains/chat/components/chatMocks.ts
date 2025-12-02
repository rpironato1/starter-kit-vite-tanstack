import type { TokenUsage } from "@/types";

export const PLAN_STEPS = [
	"Interpretar o contexto e identificar o objetivo central.",
	"Selecionar conhecimentos relevantes do repositório Zane.",
	"Gerar resposta estruturada com evidências e tom natural.",
];

export function createMockUsage(prompt: string): TokenUsage {
	const normalizedLength = Math.max(prompt.length, 120);
	const inputTokens = 120 + Math.round(normalizedLength * 0.2);
	const thinkingTokens = 80;
	const outputTokens = 240;
	const cachedContentTokens = 36;
	const totalTokens =
		inputTokens + outputTokens + thinkingTokens - cachedContentTokens / 2;

	return {
		inputTokens,
		outputTokens,
		thinkingTokens,
		cachedContentTokens,
		totalTokens,
		steps: [
			{
				stepName: "Planner",
				tool: "zane-planner",
				input: Math.round(inputTokens * 0.6),
				output: 64,
				think: 24,
				cache: 0,
			},
			{
				stepName: "Responder",
				tool: "zane-core",
				input: Math.round(inputTokens * 0.4),
				output: outputTokens,
				think: thinkingTokens,
				cache: cachedContentTokens,
			},
		],
	};
}
