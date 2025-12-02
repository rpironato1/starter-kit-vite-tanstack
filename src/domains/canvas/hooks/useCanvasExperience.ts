import { useCallback, useEffect, useRef, useState } from "react";
import {
	CANVAS_EXECUTION_PLAN,
	CANVAS_MODELS,
	createCanvasUsage,
	type CanvasMessage,
} from "@/domains/canvas/components";
import type { CanvasArtifact } from "@/types";
import { parseArtifactFromMessage } from "@/utils/canvas";

type ReasoningLevel = "soft" | "medium" | "max" | "off";

export function useCanvasExperience() {
	const [messages, setMessages] = useState<CanvasMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Canvas Pro");
	const [reasoningLevel, setReasoningLevel] =
		useState<ReasoningLevel>("soft");
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [activeArtifact, setActiveArtifact] = useState<CanvasArtifact | null>(
		null,
	);
	const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const modelButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!messages.length) return;
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	const handleSend = useCallback(() => {
		if (!inputValue.trim()) return;

		const userMessage: CanvasMessage = {
			id: `msg-${Date.now()}`,
			role: "user",
			content: inputValue.trim(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		if (typeof window !== "undefined" && window.innerWidth < 768) {
			setIsWorkspaceOpen(false);
		}

		setTimeout(() => {
			const aiResponseContent = `Aqui está o código que você pediu:

\
\
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
    <p class="text-gray-400">Generated based on: ${userMessage.content}</p>
    <button class="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
      Click me!
    </button>
  </div>
</body>
</html>
\
\

O código acima cria uma aplicação web baseada no seu pedido.`;

			const parsedArtifact = parseArtifactFromMessage(aiResponseContent);

			const aiMessage: CanvasMessage = {
				id: `msg-${Date.now()}`,
				role: "ai",
				content: aiResponseContent,
				artifact: parsedArtifact || undefined,
				usage: createCanvasUsage(userMessage.content),
				executionPlan: CANVAS_EXECUTION_PLAN,
			};

			setMessages((prev) => [...prev, aiMessage]);
			if (parsedArtifact) {
				setActiveArtifact(parsedArtifact);
				setIsWorkspaceOpen(true);
			}
			setIsLoading(false);
		}, 2000);
	}, [inputValue]);

	const handleAttachClick = useCallback((type: "camera" | "photo" | "file") => {
		void type;
	}, []);

	const openWorkspaceWithArtifact = useCallback((artifact: CanvasArtifact) => {
		setActiveArtifact(artifact);
		setIsWorkspaceOpen(true);
	}, []);

	const closeWorkspace = useCallback(() => {
		setIsWorkspaceOpen(false);
	}, []);

	const resetConversation = useCallback(() => {
		setMessages([]);
		setActiveArtifact(null);
		setIsWorkspaceOpen(false);
	}, []);

	return {
		messages,
		inputValue,
		isLoading,
		currentModel,
		reasoningLevel,
		isModelSelectorOpen,
		activeArtifact,
		isWorkspaceOpen,
		setInputValue,
		setCurrentModel,
		setReasoningLevel,
		setIsModelSelectorOpen,
		handleSend,
		handleAttachClick,
		openWorkspaceWithArtifact,
		closeWorkspace,
		resetConversation,
		messagesEndRef,
		inputRef,
		modelButtonRef,
	};
}
