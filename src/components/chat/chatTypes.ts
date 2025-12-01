import type { TokenUsage } from "@/types";

export interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
	timestamp: Date;
	usage?: TokenUsage;
	executionPlan?: string[];
}
