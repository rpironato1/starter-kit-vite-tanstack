import type { TokenUsage } from "@/types";

export const CANVAS_EXECUTION_PLAN = [
	"Compreender o objetivo criativo e definir requisitos.",
	"Gerar esboço estruturado do artefato com contexto adicional.",
	"Converter o resultado em código executável no workspace.",
];

interface CanvasModel {
	id: string;
	name: string;
	description: string;
}

export const CANVAS_MODELS: ReadonlyArray<CanvasModel> = [
	{
		id: "draft",
		name: "Zane Canvas Draft",
		description: "Quick drafts and initial ideation",
	},
	{
		id: "pro",
		name: "Zane Canvas Pro",
		description: "Structured writing and expanded context",
	},
	{
		id: "studio",
		name: "Zane Canvas Studio",
		description: "Complex creative production",
	},
];

export function createCanvasUsage(prompt: string): TokenUsage {
	const base = Math.max(prompt.length, 140);
	const inputTokens = 160 + Math.round(base * 0.35);
	const outputTokens = 320;
	const thinkingTokens = 110;
	const cachedContentTokens = 40;
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
				stepName: "Briefing",
				tool: "zane-canvas-planner",
				input: Math.round(inputTokens * 0.5),
				output: 80,
				think: 30,
				cache: 0,
			},
			{
				stepName: "Render",
				tool: "zane-canvas-renderer",
				input: Math.round(inputTokens * 0.5),
				output: outputTokens,
				think: thinkingTokens,
				cache: cachedContentTokens,
			},
		],
	};
}
