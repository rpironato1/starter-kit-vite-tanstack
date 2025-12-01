import type { CanvasArtifact, TokenUsage } from "@/types";

export interface CanvasMessage {
	id: string;
	role: "user" | "ai";
	content: string;
	image?: string;
	artifact?: CanvasArtifact;
	usage?: TokenUsage;
	executionPlan?: string[];
}
