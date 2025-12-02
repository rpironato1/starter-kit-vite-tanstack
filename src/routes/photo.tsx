import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import {
	ZaneGallery,
	PhotoInputArea,
	PhotoMessagesPanel,
	PHOTO_MODELS,
	type PhotoMessage,
} from "@/domains/photo/components";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";
import PromptEnhancer from "@/domains/photo/services/promptEnhancer";
import type { TokenUsage } from "@/types";

export const Route = createFileRoute("/photo")({ component: PhotoPage });

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

function PhotoPage() {
	const { openTokenUsage } = useTokenUsage();
	const [messages, setMessages] = useState<PhotoMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
	const messageCount = messages.length;

	useEffect(() => {
		if (messageCount > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messageCount]);

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setAttachedImage(reader.result as string);
		};
		reader.readAsDataURL(file);
		event.target.value = "";
	};

	// Handlers for new PhotoInputArea
	const handleAttachClick = (type: "camera" | "photo" | "gallery") => {
		if (type === "camera") {
			cameraInputRef.current?.click();
		} else if (type === "photo") {
			galleryInputRef.current?.click();
		} else if (type === "gallery") {
			setGalleryOpen(true);
		}
	};

	const canEnhancePrompt =
		(currentModel === "Zane img Lite" || currentModel === "Zane img Pro") &&
		inputValue.trim().length > 0;

	const handleEnhancePrompt = async () => {
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
	};

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
	};

	const handleNewChat = () => {
		setMessages([]);
		setIsSidebarOpen(false);
	};

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<input
				ref={cameraInputRef}
				type="file"
				accept="image/*"
				capture="environment"
				className="hidden"
				onChange={handleFileUpload}
			/>
			<input
				ref={galleryInputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleFileUpload}
			/>
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setModelSelectorOpen((prev) => !prev)}
				currentModel={currentModel}
				modelMenuOpen={modelSelectorOpen}
				modelButtonRef={modelButtonRef}
				onAvatarClick={() => setIsSettingsOpen(true)}
			/>

			<ModelSelector
				isOpen={modelSelectorOpen}
				onClose={() => setModelSelectorOpen(false)}
				currentModel={currentModel}
				onSelect={setCurrentModel}
				models={PHOTO_MODELS}
				anchorRef={modelButtonRef}
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

			<ZaneGallery
				isOpen={galleryOpen}
				onClose={() => setGalleryOpen(false)}
				images={generatedImages}
			/>

			{/* Original toolbar - leaving it or removing? 
          The prototype uses the new InputArea instead of a top toolbar?
          Actually, PhotoToolbar might be redundant or used for other settings.
          Prototype ZanePhotoModule.tsx header only had model selector.
          I'll keep PhotoToolbar if it provides functionality not covered, 
          BUT the instruction was PARITY. 
          The prototype header has: Menu, Model Selector.
          The prototype footer has: Input, Attach, Magic, Ratio, Send.
          So PhotoToolbar (if it's a separate bar) should probably be removed or integrated.
          Looking at `src/routes/photo.tsx` content I read:
          <PhotoToolbar ... /> was there.
          Prototype ZanePhotoModule.tsx DOES NOT HAVE a secondary toolbar.
          I will REMOVE PhotoToolbar to match prototype.
      */}

			<main className="flex-1 overflow-hidden relative">
				<PhotoMessagesPanel
					messages={messages}
					isLoading={isLoading}
					onTokenDetails={(usage) => openTokenUsage(usage)}
					messagesEndRef={messagesEndRef}
				/>

				{/* REPLACED PhotoCommandBar with PhotoInputArea */}
				<PhotoInputArea
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					isLoading={isLoading}
					aspectRatio={aspectRatio}
					onAspectRatioChange={setAspectRatio}
					onAttachClick={handleAttachClick}
					onEnhancePrompt={handleEnhancePrompt}
					canEnhance={canEnhancePrompt}
					isEnhancing={isEnhancing}
					attachedImage={attachedImage}
					onRemoveImage={() => setAttachedImage(null)}
					inputRef={inputRef}
					currentModel={currentModel}
				/>
			</main>
		</div>
	);
}
