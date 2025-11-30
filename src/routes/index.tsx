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

export const Route = createFileRoute("/")({ component: ChatPage });

interface ChatMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
	timestamp: Date;
}

function ChatPage() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Pro");
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "disabled"
	>("soft");
	const [attachedImage, setAttachedImage] = useState<string | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

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
				content: `This is a simulated response to: "${userMessage.content}"\n\nIn production, this would be powered by Claude via the Anthropic API.`,
				timestamp: new Date(),
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
				currentView="chat"
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
												<AIMessage content={message.content} />
											)}
										</motion.div>
									))}
									{isLoading && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<LoadingIndicator />
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
