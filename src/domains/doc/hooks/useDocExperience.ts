import { useCallback, useEffect, useRef, useState } from "react";
import {
	ACCEPTED_EXTENSIONS,
	ACCEPTED_TYPES,
	type DocMessage,
	type UploadedDocument,
} from "@/domains/doc/components";
import { docAnalyzer } from "@/domains/doc/services";

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
		if (!messages.length) {
			return;
		}
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

		void (async () => {
			try {
				const aiMessage = await docAnalyzer.analyze(userMessage);
				setMessages((prev) => [...prev, aiMessage]);
			} catch (error) {
				console.error("Doc analyzer failed", error);
			} finally {
				setIsLoading(false);
			}
		})();
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
