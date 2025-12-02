import type { TokenUsage } from "@/types";

export interface PhotoMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string | undefined;
	generatedImageUrl?: string | undefined;
	timestamp: Date;
	usage?: TokenUsage | undefined;
	executionPlan?: string[] | undefined;
}
