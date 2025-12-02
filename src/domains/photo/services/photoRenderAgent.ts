import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import type { PhotoMessage } from "@/domains/photo/components";
import { wait } from "@/shared/utils/async";
import type { TokenUsage } from "@/types";

const PHOTO_RENDER_DELAY_MS = 2000;

export const PHOTO_EXECUTION_PLAN = [
	"Interpretar o prompt e identificar os elementos principais.",
	"Aprimorar o briefing visual com detalhes de estilo e luz.",
	"Solicitar renderização no modelo de imagem selecionado.",
];

export interface PhotoRenderRequest {
	prompt: string;
	model: string;
	aspectRatio: AspectRatio;
}

function createPhotoUsage(prompt: string, ratio: AspectRatio): TokenUsage {
	const base = Math.max(prompt.length, 60);
	const inputTokens = 80 + Math.round(base * 0.25);
	const outputTokens = 110;
	const thinkingTokens = 50;
	const cachedContentTokens = ratio === "1:1" ? 20 : 32;
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
				stepName: "Briefing Visual",
				tool: "zane-photo-brief",
				input: Math.round(inputTokens * 0.6),
				output: 48,
				think: 18,
				cache: 0,
			},
			{
				stepName: "Render",
				tool: "zane-img-core",
				input: Math.round(inputTokens * 0.4),
				output: outputTokens,
				think: thinkingTokens,
				cache: cachedContentTokens,
			},
		],
	};
}

function buildAssistantMessage(
	request: PhotoRenderRequest,
): PhotoMessage {
	const generatedImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;

	return {
		id: crypto.randomUUID(),
		role: "assistant",
		content: `Imagem gerada com ${request.model} (${request.aspectRatio}).`,
		generatedImageUrl,
		timestamp: new Date(),
		usage: createPhotoUsage(request.prompt, request.aspectRatio),
		executionPlan: PHOTO_EXECUTION_PLAN,
	};
}

async function renderImage(
	request: PhotoRenderRequest,
): Promise<PhotoMessage> {
	await wait(PHOTO_RENDER_DELAY_MS);
	return buildAssistantMessage(request);
}

export const photoRenderAgent = {
	renderImage,
};

export type PhotoRenderAgent = typeof photoRenderAgent;
