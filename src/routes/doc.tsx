import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import { ContextDrawer, type UploadedDocument } from "@/components/doc";
import { Header } from "@/components/layout/Header";
import { InputBar } from "@/components/layout/InputBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";

export const Route = createFileRoute("/doc")({ component: DocPage });

const DOC_MODELS = [
	{ id: "doc-lite", name: "Zane Doc Lite", description: "Leitura rápida" },
	{ id: "doc-pro", name: "Zane Doc Pro", description: "Análise profunda" },
	{
		id: "doc-ultra",
		name: "Zane Doc Ultra",
		description: "Raciocínio complexo",
	},
];

const ACCEPTED_TYPES = [
	"text/plain",
	"text/markdown",
	"application/json",
	"text/csv",
	"text/javascript",
	"application/javascript",
];
const ACCEPTED_EXTENSIONS = [
	".txt",
	".md",
	".json",
	".csv",
	".js",
	".ts",
	".tsx",
	".py",
];

interface DocMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	attachedFiles?: UploadedDocument[];
	timestamp: Date;
}

function DocPage() {
	const [messages, setMessages] = useState<DocMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Doc Pro");
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "off"
	>("soft");
	const [attachedFiles, setAttachedFiles] = useState<UploadedDocument[]>([]);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files) return;

		const validFiles: UploadedDocument[] = [];
		for (const file of Array.from(files)) {
			const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
			const isValidType =
				ACCEPTED_TYPES.includes(file.type) || ACCEPTED_EXTENSIONS.includes(ext);

			if (isValidType) {
				const content = await file.text();
				validFiles.push({
					id: `doc-${Date.now()}-${validFiles.length}`,
					name: file.name,
					type: file.type || ext,
					content,
					size: file.size,
				});
			}
		}
		setAttachedFiles((prev) => [...prev, ...validFiles]);
		e.target.value = "";
	};

	const triggerFileUpload = () => fileInputRef.current?.click();

	const handleSend = async () => {
		if (!inputValue.trim() && attachedFiles.length === 0) return;

		const userMessage: DocMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content:
				inputValue.trim() || `Analisar ${attachedFiles.length} arquivo(s)`,
			attachedFiles: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setAttachedFiles([]);
		setIsLoading(true);

		// Simulated response - replace with actual API call
		setTimeout(() => {
			const fileList =
				userMessage.attachedFiles?.map((f) => `- ${f.name}`).join("\n") || "";
			const aiMessage: DocMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `## Análise de Documentos\n\nAnalisei: "${userMessage.content}"\n\n${fileList ? `### Arquivos\n${fileList}\n\n` : ""}Resposta simulada. Em produção, análise detalhada será fornecida.`,
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
	const removeFile = (id: string) =>
		setAttachedFiles((prev) => prev.filter((f) => f.id !== id));

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<input
				ref={fileInputRef}
				type="file"
				multiple
				accept=".txt,.md,.json,.csv,.js,.ts,.tsx,.py"
				onChange={handleFileUpload}
				className="hidden"
				aria-label="Upload de arquivos"
			/>

			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setIsModelSelectorOpen(true)}
				currentModel={currentModel}
			/>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onNewChat={handleNewChat}
				onOpenSettings={() => {
					setIsSidebarOpen(false);
					setIsSettingsOpen(true);
				}}
			/>

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			<ModelSelector
				isOpen={isModelSelectorOpen}
				onClose={() => setIsModelSelectorOpen(false)}
				models={DOC_MODELS}
				currentModel={currentModel}
				onSelect={(model) => {
					setCurrentModel(model);
					setIsModelSelectorOpen(false);
				}}
			/>

			<ContextDrawer
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				documents={attachedFiles}
				onRemoveDocument={removeFile}
				onAddDocument={triggerFileUpload}
			/>

			<main className="flex-1 overflow-hidden relative">
				<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
					<div className="max-w-3xl mx-auto py-6 space-y-6">
						<AnimatePresence mode="popLayout">
							{messages.length === 0 && !isLoading ? (
								<div className="flex flex-col items-center justify-center min-h-[60vh]">
									<EmptyState variant="doc" />
									<label className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 text-blue-400 rounded-full cursor-pointer hover:bg-blue-600/20 transition-colors border border-blue-500/30">
										<UploadCloud className="w-5 h-5" />
										<span>Adicionar arquivos</span>
										<input
											type="file"
											multiple
											accept=".txt,.md,.json,.csv,.js,.ts,.tsx,.py"
											onChange={handleFileUpload}
											className="hidden"
										/>
									</label>
								</div>
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
																	{message.attachedFiles.map((file) => (
																		<div
																			key={file.id}
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
										<LoadingIndicator text="Analisando documentos..." />
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
							{attachedFiles.map((file) => (
								<motion.div
									key={file.id}
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
										onClick={() => removeFile(file.id)}
										className="p-0.5 hover:bg-bg-hover rounded text-text-secondary hover:text-red-400 transition-colors"
										aria-label={`Remover ${file.name}`}
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
					onImageAttach={triggerFileUpload}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					inputRef={inputRef}
					placeholder="Pergunte sobre seus documentos..."
				/>
			</main>
		</div>
	);
}
