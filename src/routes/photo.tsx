import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ZaneGallery } from "@/components/photo";
import { PhotoInputArea } from "@/components/photo/PhotoInputArea";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";
import { useTokenUsage } from "@/hooks/useTokenUsage";
import PromptEnhancer from "@/services/promptEnhancer";
import type { TokenUsage } from "@/types";

export const Route = createFileRoute("/photo")({ component: PhotoPage });

const PHOTO_MODELS = [
	{
		id: "img-lite",
		name: "Zane img Lite",
		description: "Ilustrações e avatares",
	},
	{ id: "img-pro", name: "Zane img Pro", description: "Realismo e detalhes" },
	{
		id: "img-ultra",
		name: "Zane img Ultra",
		description: "Altíssimo realismo",
	},
];

interface PhotoMessage {
	id: string;
	role: "user" | "assistant";
	content: string;
	imageUrl?: string;
	generatedImageUrl?: string;
	timestamp: Date;
	usage?: TokenUsage;
	executionPlan?: string[];
}

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
				<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
					<div className="max-w-3xl mx-auto py-6 space-y-6">
						<AnimatePresence mode="popLayout">
							{messages.length === 0 && !isLoading ? (
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex flex-col items-center gap-6"
								>
									<EmptyState variant="photo" modelName={currentModel} />
								</motion.div>
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
													<div className="max-w-[85%] md:max-w-[65%] space-y-3 rounded-[20px] rounded-tr-[4px] border border-border-default bg-bg-surface px-5 py-3.5 text-text-primary shadow-sm">
														{message.imageUrl && (
															<img
																src={message.imageUrl}
																alt="Referência enviada"
																className="max-h-48 w-full rounded-xl border border-border-default object-cover"
															/>
														)}
														<p className="text-[15px] leading-relaxed">
															{message.content}
														</p>
													</div>
												</div>
											) : (
												<div className="space-y-3">
													{message.generatedImageUrl && (
														<div className="relative group rounded-2xl overflow-hidden border border-border-default shadow-2xl bg-black/40 max-w-md">
															<img
																src={message.generatedImageUrl}
																alt="Generated"
																className="w-full h-auto object-cover"
															/>
															<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
																<button
																	type="button"
																	title="Baixar imagem"
																	onClick={() =>
																		window.open(
																			message.generatedImageUrl,
																			"_blank",
																		)
																	}
																	className="p-4 bg-white/20 rounded-full hover:scale-110 transition-transform"
																>
																	<Download className="w-6 h-6 text-white" />
																</button>
															</div>
														</div>
													)}
													<AIMessage
														content={message.content}
														usage={message.usage}
														executionPlan={message.executionPlan}
														onTokenDetails={(usage) => openTokenUsage(usage)}
													/>
												</div>
											)}
										</motion.div>
									))}
									{isLoading && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											<LoadingIndicator moduleVariant="photo" />
										</motion.div>
									)}
								</>
							)}
						</AnimatePresence>
						<div ref={messagesEndRef} />
					</div>
				</div>

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