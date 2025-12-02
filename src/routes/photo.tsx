import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import {
	ZaneGallery,
	PhotoInputArea,
	PhotoMessagesPanel,
	PHOTO_MODELS,
} from "@/domains/photo/components";
import { usePhotoExperience } from "@/domains/photo/hooks";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";

export const Route = createFileRoute("/photo")({ component: PhotoPage });

function PhotoPage() {
	const { openTokenUsage } = useTokenUsage();
	const {
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
	} = usePhotoExperience();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const handleNewChat = () => {
		resetConversation();
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
					onRemoveImage={handleRemoveImage}
					inputRef={inputRef}
					currentModel={currentModel}
				/>
			</main>
		</div>
	);
}
