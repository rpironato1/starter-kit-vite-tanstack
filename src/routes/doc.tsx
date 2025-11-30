import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import { Header } from "@/components/layout/Header";
import { InputBar } from "@/components/layout/InputBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { SettingsModal } from "@/components/settings/SettingsModal";

export const Route = createFileRoute("/doc")({ component: DocPage });

interface DocMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	attachedFiles?: Array<{ name: string; type: string }>;
	timestamp: Date;
}

function DocPage() {
	const [messages, setMessages] = useState<DocMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "disabled"
	>("soft");
	const [attachedFiles, setAttachedFiles] = useState<
		Array<{ name: string; type: string }>
	>([]);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleSend = async () => {
		if (!inputValue.trim() && attachedFiles.length === 0) return;

		const userMessage: DocMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content: inputValue.trim() || `Analyze ${attachedFiles.length} file(s)`,
			attachedFiles: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setAttachedFiles([]);
		setIsLoading(true);

		setTimeout(() => {
			const aiMessage: DocMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `## Document Analysis\n\nI've analyzed your request regarding: "${userMessage.content}"\n\n${userMessage.attachedFiles ? `### Files Processed\n${userMessage.attachedFiles.map((f) => `- ${f.name}`).join("\n")}\n\n` : ""}This is a simulated response. In production, Zane Doc would provide detailed document analysis, summaries, and insights.`,
				timestamp: new Date(),
			};
			setMessages((prev) => [...prev, aiMessage]);
			setIsLoading(false);
		}, 1800);
	};

	const handleNewChat = () => {
		setMessages([]);
		setAttachedFiles([]);
		setIsSidebarOpen(false);
	};

	const handleFileAttach = () => {
		// Simulate file selection
		const fakeFile = {
			name: `document_${Date.now()}.pdf`,
			type: "application/pdf",
		};
		setAttachedFiles((prev) => [...prev, fakeFile]);
	};

	const removeFile = (index: number) => {
		setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				currentModel="Zane Doc"
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
				currentView="doc"
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
								<EmptyState variant="doc" />
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
														{message.attachedFiles &&
															message.attachedFiles.length > 0 && (
																<div className="flex flex-wrap gap-2 mb-3">
																	{message.attachedFiles.map((file, idx) => (
																		<div
																			key={`${file.name}-${idx}`}
																			className="flex items-center gap-2 px-3 py-1.5 bg-bg-hover rounded-lg text-xs"
																		>
																			<FileText className="w-3 h-3 text-blue-400" />
																			<span className="text-text-secondary truncate max-w-[150px]">
																				{file.name}
																			</span>
																		</div>
																	))}
																</div>
															)}
														<p className="text-[15px] leading-relaxed">
															{message.content}
														</p>
													</div>
												</div>
											) : (
												<AIMessage content={message.content} />
											)}
										</motion.div>
									))}
									{isLoading && (
										<LoadingIndicator text="Analyzing documents..." />
									)}
								</>
							)}
						</AnimatePresence>
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Attached Files Preview */}
				{attachedFiles.length > 0 && (
					<div className="absolute bottom-24 left-0 right-0 px-4">
						<div className="max-w-3xl mx-auto flex flex-wrap gap-2">
							{attachedFiles.map((file, idx) => (
								<motion.div
									key={`${file.name}-${idx}`}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									className="flex items-center gap-2 px-3 py-2 bg-bg-surface border border-border rounded-lg"
								>
									<FileText className="w-4 h-4 text-blue-400" />
									<span className="text-sm text-text-primary truncate max-w-[150px]">
										{file.name}
									</span>
									<button
										type="button"
										onClick={() => removeFile(idx)}
										className="p-0.5 hover:bg-bg-hover rounded text-text-secondary hover:text-red-400 transition-colors"
									>
										<X className="w-3 h-3" />
									</button>
								</motion.div>
							))}
						</div>
					</div>
				)}

				<InputBar
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					onImageAttach={handleFileAttach}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					inputRef={inputRef}
					placeholder="Ask about your documents..."
				/>
			</main>
		</div>
	);
}
