import type { CanvasArtifact, TokenUsage } from "@/types";

export interface CanvasMessage {
	id: string;
	role: "user" | "ai";
	content: string;
	image?: string | undefined;
	artifact?: CanvasArtifact | undefined;
	usage?: TokenUsage | undefined;
	executionPlan?: string[] | undefined;
}
