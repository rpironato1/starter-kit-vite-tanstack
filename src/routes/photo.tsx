import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Image as ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { Header } from "@/components/layout/Header";
import { InputBar } from "@/components/layout/InputBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ZaneGallery } from "@/components/photo";
import {
	type AspectRatio,
	AspectRatioSelector,
} from "@/components/selectors/AspectRatioSelector";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";

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
}

function PhotoPage() {
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
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "off"
	>("soft");
	const [attachedImage, setAttachedImage] = useState<string | null>(null);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const messageCount = messages.length;

	useEffect(() => {
		if (messageCount > 0) {
			messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		}
	}, [messageCount]);

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
				content: `Imagem gerada com ${currentModel} (${aspectRatio})`,
				generatedImageUrl: imageUrl,
				timestamp: new Date(),
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
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setModelSelectorOpen(true)}
				currentModel={currentModel}
				modelMenuOpen={modelSelectorOpen}
			/>

			<ModelSelector
				isOpen={modelSelectorOpen}
				onClose={() => setModelSelectorOpen(false)}
				currentModel={currentModel}
				onSelect={setCurrentModel}
				models={PHOTO_MODELS}
			/>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onNewChat={handleNewChat}
				onOpenSettings={() => {
					setIsSidebarOpen(false);
					setIsSettingsOpen(true);
				}}
				currentView="photo"
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
									<EmptyState variant="photo" />
									<AspectRatioSelector
										value={aspectRatio}
										onChange={setAspectRatio}
									/>
									<button
										type="button"
										onClick={() => setGalleryOpen(true)}
										className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface text-text-secondary hover:bg-bg-hover hover:text-text-primary transition-colors"
									>
										<ImageIcon className="w-4 h-4" />
										<span className="text-sm font-medium">Ver Galeria</span>
									</button>
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
													<div className="max-w-[85%] md:max-w-[65%] bg-bg-surface text-text-primary px-5 py-3.5 rounded-[20px] rounded-tr-[4px] border border-border-default shadow-sm">
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
															{/* Download overlay */}
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
													<AIMessage content={message.content} />
												</div>
											)}
										</motion.div>
									))}
									{isLoading && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex flex-col items-center gap-3"
										>
											<div className="w-12 h-12 rounded-full border-4 border-bg-surface border-t-accent-primary animate-spin" />
											<span className="text-sm font-medium text-text-secondary">
												Criando sua obra de arte...
											</span>
										</motion.div>
									)}
								</>
							)}
						</AnimatePresence>
						<div ref={messagesEndRef} />
					</div>
				</div>

				<InputBar
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					onImageAttach={(url) => setAttachedImage(url)}
					attachedImage={attachedImage}
					onRemoveImage={() => setAttachedImage(null)}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					inputRef={inputRef}
					placeholder="Descreva a imagem que você quer criar..."
				/>
			</main>
		</div>
	);
}
