import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/domains/chat/components/chatTypes";
import { chatAgent } from "@/domains/chat/services";

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

		void (async () => {
			try {
				const aiMessage = await chatAgent.generateResponse(userMessage);
				setMessages((prev) => [...prev, aiMessage]);
			} catch (error) {
				console.error("Chat agent response failed", error);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [attachedImage, inputValue]);

	const handleRetry = useCallback(() => {
		if (!messages.length) return;
		const lastUserMessage = [...messages]
			.reverse()
			.find((msg) => msg.role === "user");
		if (!lastUserMessage) return;

		setIsLoading(true);

		void (async () => {
			try {
				const aiMessage = await chatAgent.generateResponse(lastUserMessage);
				setMessages((prev) => [...prev, aiMessage]);
			} catch (error) {
				console.error("Chat agent retry failed", error);
			} finally {
				setIsLoading(false);
			}
		})();
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
