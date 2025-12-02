import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import type { PhotoMessage } from "@/domains/photo/components";
import { PromptEnhancer, photoRenderAgent } from "@/domains/photo/services";

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

	const handleRemoveImage = useCallback(() => {
		setAttachedImage(null);
	}, []);

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

		void (async () => {
			try {
				const aiMessage = await photoRenderAgent.renderImage({
					prompt: userMessage.content,
					model: currentModel,
					aspectRatio,
				});
				setMessages((prev) => [...prev, aiMessage]);
				const generatedImageUrl = aiMessage.generatedImageUrl;
				if (generatedImageUrl) {
					setGeneratedImages((prev) => [...prev, generatedImageUrl]);
				}
			} catch (error) {
				console.error("Photo render agent failed", error);
			} finally {
				setIsLoading(false);
			}
		})();
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
		handleRemoveImage,
		resetConversation,
		messagesEndRef,
		inputRef,
		cameraInputRef,
		galleryInputRef,
		modelButtonRef,
		canEnhancePrompt,
	};
}
