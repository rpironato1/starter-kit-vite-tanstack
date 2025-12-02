import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "lucide-react";
import { useState } from "react";
import {
	ContextDrawer,
	DocInputArea,
	DocMessagesPanel,
	DOC_MODELS,
	ACCEPTED_EXTENSIONS,
} from "@/domains/doc/components";
import { useDocExperience } from "@/domains/doc/hooks";
import { Header } from "@/components/layout/Header";
import { Sidebar as AppSidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";

export const Route = createFileRoute("/doc")({ component: DocPage });

function DocPage() {
	const { openTokenUsage } = useTokenUsage();
	const {
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
	} = useDocExperience();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const handleNewChat = () => {
		resetConversation();
		setIsSidebarOpen(false);
	};

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
