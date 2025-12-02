import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import {
	PHOTO_MODELS,
	type PhotoMessage,
} from "@/domains/photo/components";
import PromptEnhancer from "@/domains/photo/services/promptEnhancer";
import type { TokenUsage } from "@/types";

const PHOTO_EXECUTION_PLAN = [
	"Interpretar o prompt e identificar os elementos principais.",
	"Aprimorar o briefing visual com detalhes de estilo e luz.",
	"Solicitar renderização no modelo de imagem selecionado.",
];

function createPhotoUsage(prompt: string, ratio: AspectRatio): TokenUsage {
	const base = Math.max(prompt.length, 60);
	const inputTokens = 80 + Math.round(base * 0.25);
	const outputTokens = 110;
	const thinkingTokens = 50;
	const cachedContentTokens = ratio === "1:1" ? 20 : 32;
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
				stepName: "Briefing Visual",
				tool: "zane-photo-brief",
				input: Math.round(inputTokens * 0.6),
				output: 48,
				think: 18,
				cache: 0,
			},
			{
				stepName: "Render",
				tool: "zane-img-core",
				input: Math.round(inputTokens * 0.4),
				output: outputTokens,
				think: thinkingTokens,
				cache: cachedContentTokens,
			},
		],
	};
}

export function usePhotoExperience() {
	const [messages, setMessages] = useState<PhotoMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
	const [galleryOpen, setGalleryOpen] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane img Pro");
	const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
	const [generatedImages, setGeneratedImages] = useState<string[]>([]);
	const [attachedImage, setAttachedImage] = useState<string | null>(null);
	const [isEnhancing, setIsEnhancing] = useState(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const cameraInputRef = useRef<HTMLInputElement>(null);
	const galleryInputRef = useRef<HTMLInputElement>(null);
	const modelButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!messages.length) return;
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	const handleFileUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			const reader = new FileReader();
			reader.onloadend = () => {
				setAttachedImage(reader.result as string);
			};
			reader.readAsDataURL(file);
			event.target.value = "";
		},
		[],
	);

	const handleAttachClick = useCallback(
		(type: "camera" | "photo" | "gallery") => {
			if (type === "camera") {
				cameraInputRef.current?.click();
				return;
			}
			if (type === "photo") {
				galleryInputRef.current?.click();
				return;
			}
			setGalleryOpen(true);
		},
		[],
	);

	const canEnhancePrompt = useMemo(() => {
		return (
			(currentModel === "Zane img Lite" || currentModel === "Zane img Pro") &&
			inputValue.trim().length > 0
		);
	}, [currentModel, inputValue]);

	const handleEnhancePrompt = useCallback(async () => {
		if (!canEnhancePrompt || isEnhancing) return;
		try {
			setIsEnhancing(true);
			const enhanced = await PromptEnhancer.enhance(inputValue);
			if (enhanced) {
				setInputValue(enhanced);
			}
		} catch (error) {
			console.error("Prompt enhancement failed", error);
		} finally {
			setIsEnhancing(false);
		}
	}, [canEnhancePrompt, inputValue, isEnhancing]);

	const handleSend = useCallback(() => {
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

		setTimeout(() => {
			const imageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
			const aiMessage: PhotoMessage = {
				id: crypto.randomUUID(),
				role: "assistant",
				content: `Imagem gerada com ${currentModel} (${aspectRatio}).`,
				generatedImageUrl: imageUrl,
				timestamp: new Date(),
				usage: createPhotoUsage(userMessage.content, aspectRatio),
				executionPlan: PHOTO_EXECUTION_PLAN,
			};
			setMessages((prev) => [...prev, aiMessage]);
			setGeneratedImages((prev) => [...prev, imageUrl]);
			setIsLoading(false);
		}, 2000);
	}, [aspectRatio, attachedImage, currentModel, inputValue]);

	const resetConversation = useCallback(() => {
		setMessages([]);
		setGeneratedImages([]);
		setAttachedImage(null);
		setInputValue("");
	}, []);

	return {
		messages,
		inputValue,
		isLoading,
		modelSelectorOpen,
		galleryOpen,
		currentModel,
		aspectRatio,
		generatedImages,
		attachedImage,
		isEnhancing,
		setModelSelectorOpen,
		setGalleryOpen,
		setCurrentModel,
		setAspectRatio,
		setInputValue,
		handleFileUpload,
		handleAttachClick,
		handleEnhancePrompt,
		handleSend,
		resetConversation,
		messagesEndRef,
		inputRef,
		cameraInputRef,
		galleryInputRef,
		modelButtonRef,
		canEnhancePrompt,
	};
}
