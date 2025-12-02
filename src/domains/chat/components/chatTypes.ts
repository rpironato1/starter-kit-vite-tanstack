import type { TokenUsage } from "@/types";

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string | undefined;
	timestamp: Date;
	usage?: TokenUsage | undefined;
	executionPlan?: string[] | undefined;
}
