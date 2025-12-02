import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChatMessagesPanel } from "@/domains/chat/components/ChatMessagesPanel";
import { ChatInputArea } from "@/domains/chat/components/ChatInputArea";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { useTokenUsage } from "@/hooks/useTokenUsage";
import { createMockUsage, PLAN_STEPS } from "@/domains/chat/components/chatMocks";
import type { ChatMessage } from "@/domains/chat/components/chatTypes";

export const Route = createFileRoute("/")({ component: ChatPage });

function ChatPage() {
	const { openTokenUsage } = useTokenUsage();
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Pro");
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "off"
	>("soft");
	const [attachedImage, setAttachedImage] = useState<string | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const modelButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (messages.length === 0) {
			return;
		}
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = async () => {
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

		// Simulate AI response (replace with actual API call)
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
	};

	const handleRetry = () => {
		if (messages.length === 0) return;
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
	};

	const handleModelSelect = (model: string) => {
		setCurrentModel(model);
		setIsModelSelectorOpen(false);
	};

	// Specific handlers for new ChatInputArea
	const handleAttachClick = (type: "camera" | "photo" | "file") => {
		if (type === "camera") {
			// Mock camera behavior
			setAttachedImage(`https://picsum.photos/200/200?random=${Date.now()}`);
		} else if (type === "photo") {
			// Mock photo picker
			setAttachedImage(`https://picsum.photos/200/200?random=${Date.now()}`);
		} else if (type === "file") {
			// Trigger hidden file input
			fileInputRef.current?.click();
		}
	};

	const handleFilePickerAttach = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onloadend = () => {
			setAttachedImage(reader.result as string);
		};
		reader.readAsDataURL(file);
		event.target.value = "";
	};

	const handleRemoveImage = () => {
		setAttachedImage(null);
	};

	const handleNewChat = () => {
		setMessages([]);
		setIsSidebarOpen(false);
	};

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFilePickerAttach}
				className="hidden"
			/>
			{/* Header */}
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setIsModelSelectorOpen((prev) => !prev)}
				currentModel={currentModel}
				modelMenuOpen={isModelSelectorOpen}
				modelButtonRef={modelButtonRef}
				onAvatarClick={() => setIsSettingsOpen(true)}
			/>

			{/* Sidebar */}
			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onNewChat={handleNewChat}
				onOpenSettings={() => {
					setIsSidebarOpen(false);
					setIsSettingsOpen(true);
				}}
			/>

			{/* Model Selector */}
			<ModelSelector
				isOpen={isModelSelectorOpen}
				onClose={() => setIsModelSelectorOpen(false)}
				currentModel={currentModel}
				onSelect={handleModelSelect}
				anchorRef={modelButtonRef}
			/>

			{/* Settings Modal */}
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden relative">
				<ChatMessagesPanel
					messages={messages}
					isLoading={isLoading}
					onTokenDetails={openTokenUsage}
					onRetry={handleRetry}
					messagesEndRef={messagesEndRef}
				/>

				{/* REPLACED Input Bar with ChatInputArea */}
				<ChatInputArea
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					onAttachClick={handleAttachClick}
					onRemoveImage={handleRemoveImage}
					attachedImage={attachedImage}
					inputRef={inputRef}
				/>
			</main>
		</div>
	);
}
