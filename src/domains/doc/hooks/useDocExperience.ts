import { useCallback, useEffect, useRef, useState } from "react";
import {
	ACCEPTED_EXTENSIONS,
	ACCEPTED_TYPES,
	type DocMessage,
	type UploadedDocument,
} from "@/domains/doc/components";
import type { TokenUsage } from "@/types";

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

type ReasoningLevel = "soft" | "medium" | "max" | "off";

export function useDocExperience() {
	const [messages, setMessages] = useState<DocMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Doc Pro");
	const [reasoningLevel, setReasoningLevel] =
		useState<ReasoningLevel>("soft");
	const [attachedFiles, setAttachedFiles] = useState<UploadedDocument[]>([]);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const modelButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	const handleFileUpload = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			const files = e.target.files;
			if (!files) return;

			const validFiles: UploadedDocument[] = [];
			for (const file of Array.from(files)) {
				const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
				const isValidType =
					ACCEPTED_TYPES.includes(file.type) ||
					ACCEPTED_EXTENSIONS.includes(ext);

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
		},
		[],
	);

	const triggerFileUpload = useCallback(() => {
		fileInputRef.current?.click();
	}, []);

	const removeFile = useCallback((id: string) => {
		setAttachedFiles((prev) => prev.filter((f) => f.id !== id));
	}, []);

	const handleSend = useCallback(() => {
		if (!inputValue.trim() && attachedFiles.length === 0) return;

		const userMessage: DocMessage = {
			id: crypto.randomUUID(),
			role: "user",
			content:
				inputValue.trim() || `Analisar ${attachedFiles.length} arquivo(s)`,
			attachedFiles:
				attachedFiles.length > 0 ? [...attachedFiles] : undefined,
			timestamp: new Date(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setAttachedFiles([]);
		setIsLoading(true);

		setTimeout(() => {
			const fileList =
				userMessage.attachedFiles
					?.map((f) => `- ${f.name}`)
					.join("\n") || "";
			const aiMessage: DocMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `## Análise de Documentos\n\nAnalisei: "${userMessage.content}"\n\n${
					fileList ? `### Arquivos\n${fileList}\n\n` : ""
				}Resposta simulada. Em produção, análise detalhada será fornecida.`,
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
	}, [attachedFiles, inputValue]);

	const resetConversation = useCallback(() => {
		setMessages([]);
		setAttachedFiles([]);
	}, []);

	return {
		messages,
		inputValue,
		isLoading,
		isModelSelectorOpen,
		isDrawerOpen,
		currentModel,
		reasoningLevel,
		attachedFiles,
		setInputValue,
		setIsModelSelectorOpen,
		setIsDrawerOpen,
		setCurrentModel,
		setReasoningLevel,
		handleFileUpload,
		triggerFileUpload,
		removeFile,
		handleSend,
		resetConversation,
		messagesEndRef,
		inputRef,
		fileInputRef,
		modelButtonRef,
	};
}
