import type { TokenUsage } from "@/types";

export interface PhotoMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
	generatedImageUrl?: string;
	timestamp: Date;
	usage?: TokenUsage;
	executionPlan?: string[];
}
