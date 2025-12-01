import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Sidebar, UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import { ContextDrawer, type UploadedDocument } from "@/components/doc";
import { DocInputArea } from "@/components/doc/DocInputArea";
import { Header } from "@/components/layout/Header";
import { Sidebar as AppSidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { useTokenUsage } from "@/hooks/useTokenUsage";
import type { TokenUsage } from "@/types";

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
	usage?: TokenUsage;
	executionPlan?: string[];
}

const DOC_EXECUTION_PLAN = [
	"Indexar documentos recebidos e extrair metadados.",
	"Criar mapa de tópicos relevantes e confirmar intenção.",
	"Redigir resposta com evidências dos arquivos analisados.",
];

function createDocUsage(prompt: string, fileCount: number): TokenUsage {
	const base = Math.max(prompt.length, 120);
	const inputTokens = 140 + Math.round(base * 0.3) + fileCount * 20;
	const outputTokens = 260;
	const thinkingTokens = 90;
	const cachedContentTokens = fileCount * 15;
	const totalTokens =
		inputTokens +
		outputTokens +
		thinkingTokens -
		Math.floor(cachedContentTokens / 2);

	return {
		inputTokens,
		outputTokens,
		thinkingTokens,
		cachedContentTokens,
		totalTokens,
		steps: [
			{
				stepName: "Indexação",
				tool: "zane-doc-ingest",
				input: Math.round(inputTokens * 0.5),
				output: 72,
				think: 18,
				cache: cachedContentTokens,
			},
			{
				stepName: "Análise",
				tool: "zane-doc-core",
				input: Math.round(inputTokens * 0.5),
				output: outputTokens,
				think: thinkingTokens,
				cache: 0,
			},
		],
	};
}

function DocPage() {
	const { openTokenUsage } = useTokenUsage();
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
	const modelButtonRef = useRef<HTMLButtonElement>(null);

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
		if (validFiles.length > 0) {
			setIsDrawerOpen(true);
		}
		e.target.value = "";
	};

	const triggerFileUpload = () => fileInputRef.current?.click();

	const handleSend = async () => {
		if (!inputValue.trim() && attachedFiles.length === 0) return;

		const userMessage: DocMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content:
				issue.trim() || `Analisar ${attachedFiles.length} arquivo(s)`,
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
				usage: createDocUsage(
					userMessage.content,
					userMessage.attachedFiles?.length ?? 0,
				),
				executionPlan: DOC_EXECUTION_PLAN,
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

	const contextButton =
		<button
			type="button"
			onClick={() => setIsDrawerOpen(true)}
			className="relative rounded-full p-2 text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
			title="Abrir contexto"
		>
			<Sidebar className="h-5 w-5" />
			{attachedFiles.length > 0 && (
				<span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white">
					{attachedFiles.length}
				</span>
			)}
		</button>;

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
				onModelClick={() => setIsModelSelectorOpen((prev) => !prev)}
				currentModel={currentModel}
				modelMenuOpen={isModelSelectorOpen}
				modelButtonRef={modelButtonRef}
				onAvatarClick={() => setIsSettingsOpen(true)}
				rightSlot={contextButton}
			/>

			<AppSidebar
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
				anchorRef={modelButtonRef}
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
										<AIMessage
												content={message.content}
												usage={message.usage}
												executionPlan={message.executionPlan}
												onTokenDetails={(usage) => openTokenUsage(usage)}
										/>
									)}
										</motion.div>
									))}
									{isLoading && (
										<LoadingIndicator
											moduleVariant="doc"
											text="Analisando documentos..."
										/>
									)}
								</>
							)}
						</AnimatePresence>
						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* REPLACED DocCommandBar with DocInputArea */}
				<DocInputArea
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					onFileSelect={handleFileUpload}
					inputRef={inputRef}
				/>
			</main>
		</div>
	);
}