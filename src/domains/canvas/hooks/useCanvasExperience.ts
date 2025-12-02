import { useCallback, useEffect, useRef, useState } from "react";
import type { CanvasMessage } from "@/domains/canvas/components";
import { canvasBuilder } from "@/domains/canvas/services";
import type { CanvasArtifact } from "@/types";

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

		void (async () => {
			try {
				const { message: aiMessage, artifact } =
					await canvasBuilder.buildFromPrompt({
						prompt: userMessage.content,
					});
				setMessages((prev) => [...prev, aiMessage]);
				const resolvedArtifact = artifact ?? aiMessage.artifact ?? null;
				if (resolvedArtifact) {
					setActiveArtifact(resolvedArtifact);
					setIsWorkspaceOpen(true);
				}
			} catch (error) {
				console.error("Canvas builder failed", error);
			} finally {
				setIsLoading(false);
			}
		})();
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
