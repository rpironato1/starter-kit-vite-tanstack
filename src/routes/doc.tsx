import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	ContextDrawer,
	type UploadedDocument,
	DocInputArea,
	DocMessagesPanel,
	DOC_MODELS,
	ACCEPTED_EXTENSIONS,
	ACCEPTED_TYPES,
	type DocMessage,
} from "@/domains/doc/components";
import { Header } from "@/components/layout/Header";
import { Sidebar as AppSidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";
import type { TokenUsage } from "@/types";

export const Route = createFileRoute("/doc")({ component: DocPage });

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
			<DocMessagesPanel
				messages={messages}
				isLoading={isLoading}
				onTokenDetails={(usage) => openTokenUsage(usage)}
				onFileUpload={handleFileUpload}
				accept={ACCEPTED_EXTENSIONS.join(",")}
				messagesEndRef={messagesEndRef}
			/>

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
