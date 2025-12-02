import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
	CanvasWorkspace,
	CanvasInputArea,
	CanvasMessagesPanel,
	CANVAS_MODELS,
	CANVAS_EXECUTION_PLAN,
} from "@/domains/canvas/components";
import { useCanvasExperience } from "@/domains/canvas/hooks";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/canvas")({ component: CanvasPage });

function CanvasPage() {
	const { openTokenUsage } = useTokenUsage();
	const {
		messages,
		inputValue,
		isLoading,
		currentModel,
		reasoningLevel,
		isModelSelectorOpen,
		activeArtifact,
		isWorkspaceOpen,
		setInputValue,
		setCurrentModel,
		setReasoningLevel,
		setIsModelSelectorOpen,
		handleSend,
		handleAttachClick,
		openWorkspaceWithArtifact,
		closeWorkspace,
		resetConversation,
		messagesEndRef,
		inputRef,
		modelButtonRef,
	} = useCanvasExperience();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	const handleNewChat = () => {
		resetConversation();
		setIsSidebarOpen(false);
	};

	return (
		<div className="h-screen flex flex-col bg-bg-main overflow-hidden">
			<Header
				onMenuClick={() => setIsSidebarOpen(true)}
				onModelClick={() => setIsModelSelectorOpen((prev) => !prev)}
				currentModel={currentModel}
				modelMenuOpen={isModelSelectorOpen}
				modelButtonRef={modelButtonRef}
				onAvatarClick={() => setIsSettingsOpen(true)}
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

			<ModelSelector
				isOpen={isModelSelectorOpen}
				onClose={() => setIsModelSelectorOpen(false)}
				currentModel={currentModel}
				onSelect={(model) => {
					setCurrentModel(model);
					setIsModelSelectorOpen(false);
				}}
				models={CANVAS_MODELS.map((m) => ({
					id: m.id,
					name: m.name,
					description: m.description,
				}))}
				anchorRef={modelButtonRef}
			/>

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			{/* Main Content with Split View */}
			<main className="relative flex flex-1 overflow-hidden">
				{/* Chat Panel */}
				<div
					className={cn(
						"relative flex-1 basis-full overflow-hidden transition-all duration-300",
						isWorkspaceOpen ? "md:basis-[45%] md:max-w-[45%]" : "md:basis-full",
					)}
				>
						<CanvasMessagesPanel
							messages={messages}
							isLoading={isLoading}
						executionPlan={CANVAS_EXECUTION_PLAN}
							onTokenDetails={openTokenUsage}
						onArtifactSelect={openWorkspaceWithArtifact}
							messagesEndRef={messagesEndRef}
						/>

					{/* REPLACED CanvasCommandBar with CanvasInputArea */}
					<CanvasInputArea
						value={inputValue}
						onChange={setInputValue}
						onSend={handleSend}
						isLoading={isLoading}
						reasoningLevel={reasoningLevel}
						onReasoningChange={setReasoningLevel}
						onAttachClick={handleAttachClick}
						inputRef={inputRef}
					/>
				</div>

				{/* Canvas Workspace */}
        {activeArtifact && (
          <CanvasWorkspace
            artifact={activeArtifact}
            isOpen={isWorkspaceOpen}
            onClose={closeWorkspace}
          />
        )}
			</main>
		</div>
	);
}
