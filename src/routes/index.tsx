import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import { UserMessage } from "@/components/chat/UserMessage";
import { Header } from "@/components/layout/Header";
import { InputBar } from "@/components/layout/InputBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { useTokenUsage } from "@/hooks/useTokenUsage";
import type { TokenUsage } from "@/types";

export const Route = createFileRoute("/")({ component: ChatPage });

interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
	timestamp: Date;
	usage?: TokenUsage;
	executionPlan?: string[];
}

const PLAN_STEPS = [
	"Interpretar o contexto e identificar o objetivo central.",
	"Selecionar conhecimentos relevantes do repositório Zane.",
	"Gerar resposta estruturada com evidências e tom natural.",
];

function createMockUsage(prompt: string): TokenUsage {
	const normalizedLength = Math.max(prompt.length, 120);
	const inputTokens = 120 + Math.round(normalizedLength * 0.2);
	const thinkingTokens = 80;
	const outputTokens = 240;
	const cachedContentTokens = 36;
	const totalTokens =
		inputTokens + outputTokens + thinkingTokens - cachedContentTokens / 2;

	return {
		inputTokens,
		outputTokens,
		thinkingTokens,
		cachedContentTokens,
		totalTokens,
		steps: [
			{
				stepName: "Planner",
				tool: "zane-planner",
				input: Math.round(inputTokens * 0.6),
				output: 64,
				think: 24,
				cache: 0,
			},
			{
				stepName: "Responder",
				tool: "zane-core",
				input: Math.round(inputTokens * 0.4),
				output: outputTokens,
				think: thinkingTokens,
				cache: cachedContentTokens,
			},
		],
	};
}

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

	const handleImageAttach = (imageUrl: string) => {
		setAttachedImage(imageUrl);
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
			{/* Header */}
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setIsModelSelectorOpen(true)}
				currentModel={currentModel}
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
			/>

			{/* Settings Modal */}
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden relative">
				{/* Messages Area */}
				<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
					<div className="max-w-3xl mx-auto py-6 space-y-6">
						<AnimatePresence mode="popLayout">
							{messages.length === 0 && !isLoading ? (
								<EmptyState variant="chat" />
							) : (
								<>
									{messages.map((message) => (
										<motion.div
											key={message.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
											}}
										>
											{message.role === "user" ? (
												<UserMessage
													content={message.content}
													imageUrl={message.imageUrl}
												/>
											) : (
												<AIMessage
													content={message.content}
													usage={message.usage}
													executionPlan={message.executionPlan}
													onTokenDetails={(usage) => openTokenUsage(usage)}
													onRetry={handleRetry}
													isLastMessage={
														messages[messages.length - 1]?.id === message.id
													}
												/>
											)}
										</motion.div>
									))}
									{isLoading && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<LoadingIndicator moduleVariant="chat" />
										</motion.div>
									)}
								</>
							)}
						</AnimatePresence>
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input Bar */}
				<InputBar
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					onImageAttach={handleImageAttach}
					attachedImage={attachedImage}
					onRemoveImage={handleRemoveImage}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					inputRef={inputRef}
				/>
			</main>
		</div>
	);
}
