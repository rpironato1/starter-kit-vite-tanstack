import type { TokenUsage } from "@/types";
import type { UploadedDocument } from "@/components/doc";

export interface DocMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	attachedFiles?: UploadedDocument[] | undefined;
	timestamp: Date;
	usage?: TokenUsage | undefined;
	executionPlan?: string[] | undefined;
}
