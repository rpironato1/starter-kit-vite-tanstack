import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { Header } from "@/components/layout/Header";
import { InputBar } from "@/components/layout/InputBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsModal } from "@/components/settings/SettingsModal";

export const Route = createFileRoute("/photo")({ component: PhotoPage });

interface PhotoMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
	generatedImageUrl?: string;
	timestamp: Date;
}

function PhotoPage() {
	const [messages, setMessages] = useState<PhotoMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "disabled"
	>("soft");
	const [attachedImage, setAttachedImage] = useState<string | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleSend = async () => {
		if (!inputValue.trim()) return;

		const userMessage: PhotoMessage = {
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

		// Simulate image generation
		setTimeout(() => {
			const aiMessage: PhotoMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `Image generated based on: "${userMessage.content}"`,
				generatedImageUrl: `https://picsum.photos/512/512?random=${Date.now()}`,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsLoading(false);
		}, 2000);
	};

	const handleNewChat = () => {
		setMessages([]);
		setIsSidebarOpen(false);
	};

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				currentModel="Zane Photo"
				hideModelSelector
			/>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onNewChat={handleNewChat}
				onOpenSettings={() => {
					setIsSidebarOpen(false);
					setIsSettingsOpen(true);
				}}
				currentView="photo"
			/>

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			<main className="flex-1 overflow-hidden relative">
				<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
					<div className="max-w-3xl mx-auto py-6 space-y-6">
						<AnimatePresence mode="popLayout">
							{messages.length === 0 && !isLoading ? (
								<EmptyState variant="photo" />
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
												<div className="flex justify-end">
													<div className="max-w-[85%] md:max-w-[65%] bg-bg-surface text-text-primary px-5 py-3.5 rounded-[20px] rounded-tr-[4px] border border-border shadow-sm">
														<p className="text-[15px] leading-relaxed">
															{message.content}
														</p>
													</div>
												</div>
											) : (
												<div className="space-y-3">
													{message.generatedImageUrl && (
														<div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-black/40 max-w-md">
															<img
																src={message.generatedImageUrl}
																alt="Generated"
																className="w-full h-auto object-cover"
															/>
														</div>
													)}
													<AIMessage content={message.content} />
												</div>
											)}
										</motion.div>
									))}
									{isLoading && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex flex-col items-center gap-3 text-accent-primary"
										>
											<div className="relative w-12 h-12">
												<div className="absolute inset-0 border-4 border-accent-primary/20 rounded-full" />
												<div className="absolute inset-0 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
											</div>
											<span className="text-sm font-medium">
												Creating your artwork...
											</span>
										</motion.div>
									)}
								</>
							)}
						</AnimatePresence>
						<div ref={messagesEndRef} />
					</div>
				</div>

				<InputBar
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					onImageAttach={(url) => setAttachedImage(url)}
					attachedImage={attachedImage}
					onRemoveImage={() => setAttachedImage(null)}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					inputRef={inputRef}
					placeholder="Describe the image you want to create..."
				/>
			</main>
		</div>
	);
}
