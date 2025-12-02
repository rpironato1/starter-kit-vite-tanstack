import {
	CANVAS_EXECUTION_PLAN,
	createCanvasUsage,
	type CanvasMessage,
} from "@/domains/canvas/components";
import { wait } from "@/shared/utils/async";
import type { CanvasArtifact } from "@/types";
import { parseArtifactFromMessage } from "@/utils/canvas";

const CANVAS_RESPONSE_DELAY_MS = 2000;

export interface CanvasBuilderRequest {
	prompt: string;
}

export interface CanvasBuilderResult {
	message: CanvasMessage;
	artifact: CanvasArtifact | null;
}

function buildAssistantContent(prompt: string): string {
	return `Aqui está o código que você pediu:

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
  <div class="text-center p-8">
    <h1 class="text-4xl font-bold mb-4">Hello from Zane Canvas!</h1>
    <p class="text-gray-400">Generated based on: ${prompt}</p>
    <button class="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
      Click me!
    </button>
  </div>
</body>
</html>

O código acima cria uma aplicação web baseada no seu pedido.`;
}

function buildAssistantMessage(
	request: CanvasBuilderRequest,
): CanvasBuilderResult {
	const content = buildAssistantContent(request.prompt);
	const artifact = parseArtifactFromMessage(content);

	const message: CanvasMessage = {
		id: `msg-${Date.now()}`,
		role: "ai",
		content,
		artifact: artifact ?? undefined,
		usage: createCanvasUsage(request.prompt),
		executionPlan: CANVAS_EXECUTION_PLAN,
	};

	return {
		message,
		artifact,
	};
}

async function buildFromPrompt(
	request: CanvasBuilderRequest,
): Promise<CanvasBuilderResult> {
	await wait(CANVAS_RESPONSE_DELAY_MS);
	return buildAssistantMessage(request);
}

export const canvasBuilder = {
	buildFromPrompt,
};

export type CanvasBuilder = typeof canvasBuilder;
