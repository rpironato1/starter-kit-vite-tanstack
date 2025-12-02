import { createMockUsage, PLAN_STEPS } from "@/domains/chat/components/chatMocks";
import type { ChatMessage } from "@/domains/chat/components/chatTypes";
import { wait } from "@/shared/utils/async";

const CHAT_RESPONSE_DELAY_MS = 1500;

function buildAssistantMessage(userMessage: ChatMessage): ChatMessage {
	return {
		id: crypto.randomUUID(),
		role: "assistant",
		content: `Este é um exemplo de resposta para: "${userMessage.content}".\n\nNa versão completa, os agentes Zane analisariam sua solicitação, fariam grounding e entregariam um plano estruturado.`,
		timestamp: new Date(),
		usage: createMockUsage(userMessage.content),
		executionPlan: PLAN_STEPS,
	};
}

async function generateResponse(userMessage: ChatMessage): Promise<ChatMessage> {
	await wait(CHAT_RESPONSE_DELAY_MS);
	return buildAssistantMessage(userMessage);
}

export const chatAgent = {
	generateResponse,
};

export type ChatAgent = typeof chatAgent;
