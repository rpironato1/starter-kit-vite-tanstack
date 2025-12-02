import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChatMessagesPanel } from "@/domains/chat/components/ChatMessagesPanel";
import { ChatInputArea } from "@/domains/chat/components/ChatInputArea";
import { useChatExperience } from "@/domains/chat/hooks";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";

export const Route = createFileRoute("/")({ component: ChatPage });

function ChatPage() {
	const { openTokenUsage } = useTokenUsage();
	const {
		messages,
		isLoading,
		inputValue,
		setInputValue,
		currentModel,
		reasoningLevel,
		setReasoningLevel,
		isModelSelectorOpen,
		setIsModelSelectorOpen,
		attachedImage,
		handleSend,
		handleRetry,
		handleAttachClick,
		handleFilePickerAttach,
		handleRemoveImage,
		handleModelSelect,
		resetConversation,
		messagesEndRef,
		inputRef,
		fileInputRef,
		modelButtonRef,
	} = useChatExperience();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const handleNewChat = () => {
		resetConversation();
		setIsSidebarOpen(false);
	};

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				onChange={handleFilePickerAttach}
				className="hidden"
			/>
			{/* Header */}
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setIsModelSelectorOpen((prev) => !prev)}
				currentModel={currentModel}
				modelMenuOpen={isModelSelectorOpen}
				modelButtonRef={modelButtonRef}
				onAvatarClick={() => setIsSettingsOpen(true)}
			/>

			{/* Sidebar */}
			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onNewChat={handleNewChat}
				onOpenSettings={() => {
					setIsSidebarOpen(false);
					setIsSettingsOpen(true);
				}}
			/>

			{/* Model Selector */}
			<ModelSelector
				isOpen={isModelSelectorOpen}
				onClose={() => setIsModelSelectorOpen(false)}
				currentModel={currentModel}
				onSelect={handleModelSelect}
				anchorRef={modelButtonRef}
			/>

			{/* Settings Modal */}
			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden relative">
				<ChatMessagesPanel
					messages={messages}
					isLoading={isLoading}
					onTokenDetails={openTokenUsage}
					onRetry={handleRetry}
					messagesEndRef={messagesEndRef}
				/>

				{/* REPLACED Input Bar with ChatInputArea */}
				<ChatInputArea
					value={inputValue}
					onChange={setInputValue}
					onSend={handleSend}
					isLoading={isLoading}
					reasoningLevel={reasoningLevel}
					onReasoningChange={setReasoningLevel}
					onAttachClick={handleAttachClick}
					onRemoveImage={handleRemoveImage}
					attachedImage={attachedImage}
					inputRef={inputRef}
				/>
			</main>
		</div>
	);
}
