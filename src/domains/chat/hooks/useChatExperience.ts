import { useCallback, useEffect, useRef, useState } from "react";
import { createMockUsage, PLAN_STEPS } from "@/domains/chat/components/chatMocks";
import type { ChatMessage } from "@/domains/chat/components/chatTypes";

type ReasoningLevel = "soft" | "medium" | "max" | "off";

export function useChatExperience() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Pro");
	const [reasoningLevel, setReasoningLevel] =
		useState<ReasoningLevel>("soft");
	const [attachedImage, setAttachedImage] = useState<string | null>(null);
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const modelButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!messages.length) return;
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	const handleSend = useCallback(() => {
		if (!inputValue.trim() && !attachedImage) return;

		const userMessage: ChatMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: inputValue.trim(),
			imageUrl: attachedImage || undefined,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setAttachedImage(null);
		setIsLoading(true);

		setTimeout(() => {
			const aiMessage: ChatMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `Este é um exemplo de resposta para: "${userMessage.content}".\n\nNa versão completa, os agentes Zane analisariam sua solicitação, fariam grounding e entregariam um plano estruturado.`,
				timestamp: new Date(),
				usage: createMockUsage(userMessage.content),
				executionPlan: PLAN_STEPS,
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsLoading(false);
		}, 1500);
	}, [attachedImage, inputValue]);

	const handleRetry = useCallback(() => {
		if (!messages.length) return;
		const lastUserMessage = [...messages]
			.reverse()
			.find((msg) => msg.role === "user");
		if (!lastUserMessage) return;

		setIsLoading(true);
		setTimeout(() => {
			const aiMessage: ChatMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `Reprocessando o pedido relacionado a "${lastUserMessage.content}" com nova perspectiva.`,
				timestamp: new Date(),
				usage: createMockUsage(lastUserMessage.content),
				executionPlan: PLAN_STEPS,
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsLoading(false);
		}, 1500);
	}, [messages]);

	const handleModelSelect = useCallback((model: string) => {
		setCurrentModel(model);
		setIsModelSelectorOpen(false);
	}, []);

	const handleAttachClick = useCallback((type: "camera" | "photo" | "file") => {
		if (type === "camera" || type === "photo") {
			setAttachedImage(`https://picsum.photos/200/200?random=${Date.now()}`);
			return;
		}
		fileInputRef.current?.click();
	}, []);

	const handleFilePickerAttach = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;
			const reader = new FileReader();
			reader.onloadend = () => {
				setAttachedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
			event.target.value = "";
		},
		[],
	);

	const handleRemoveImage = useCallback(() => {
		setAttachedImage(null);
	}, []);

	const resetConversation = useCallback(() => {
		setMessages([]);
		setInputValue("");
		setAttachedImage(null);
	}, []);

	return {
		messages,
		inputValue,
		isLoading,
		currentModel,
		reasoningLevel,
		isModelSelectorOpen,
		attachedImage,
		setInputValue,
		setReasoningLevel,
		setIsModelSelectorOpen,
		handleSend,
		handleRetry,
		handleAttachClick,
		handleFilePickerAttach,
		handleRemoveImage,
		handleModelSelect,
		resetConversation,
		messagesEndRef,
		inputRef,
		fileInputRef,
		modelButtonRef,
	};
}
