import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
	CanvasWorkspace,
	CanvasInputArea,
	CanvasMessagesPanel,
	CANVAS_EXECUTION_PLAN,
	CANVAS_MODELS,
	createCanvasUsage,
	type CanvasMessage,
} from "@/domains/canvas/components";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/domains/settings/components";
import { useTokenUsage } from "@/app/providers/token-usage";
import { cn } from "@/lib/utils";
import type { CanvasArtifact } from "@/types";
import { parseArtifactFromMessage } from "@/utils/canvas";

export const Route = createFileRoute("/canvas")({ component: CanvasPage });

function CanvasPage() {
	const { openTokenUsage } = useTokenUsage();
	const [messages, setMessages] = useState<CanvasMessage[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isModelSelectorOpen, setIsModelSelectorOpen] = useState(false);
	const [currentModel, setCurrentModel] = useState("Zane Canvas Pro");
	const [reasoningLevel, setReasoningLevel] = useState<
		"soft" | "medium" | "max" | "off"
	>("soft");
	const [activeArtifact, setActiveArtifact] = useState<CanvasArtifact | null>(
		null,
	);
	const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const modelButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (messages.length === 0) {
			return;
		}
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages.length]);

	const handleSend = () => {
		if (!inputValue.trim() || isLoading) return;

		const userMessage: CanvasMessage = {
			id: `msg-${Date.now()}`,
			role: "user",
			content: inputValue.trim(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		// Close workspace on mobile when sending
		if (typeof window !== "undefined" && window.innerWidth < 768) {
			setIsWorkspaceOpen(false);
		}

		// Simulate AI response with code generation
		setTimeout(() => {
			const aiResponseContent = `Aqui está o código que você pediu:

\
\
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
  <div class="text-center p-8">
    <h1 class="text-4xl font-bold mb-4">Hello from Zane Canvas!</h1>
    <p class="text-gray-400">Generated based on: ${userMessage.content}</p>
    <button class="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
      Click me!
    </button>
  </div>
</body>
</html>
\
\

O código acima cria uma aplicação web baseada no seu pedido.`;

			// Parse automático do artefato
			const parsedArtifact = parseArtifactFromMessage(aiResponseContent);

			const aiMessage: CanvasMessage = {
				id: `msg-${Date.now()}`,
				role: "ai",
				content: aiResponseContent,
				artifact: parsedArtifact || undefined,
				usage: createCanvasUsage(userMessage.content),
				executionPlan: CANVAS_EXECUTION_PLAN,
			};

			setMessages((prev) => [...prev, aiMessage]);
			if (parsedArtifact) {
				setActiveArtifact(parsedArtifact);
				setIsWorkspaceOpen(true);
			}
			setIsLoading(false);
		}, 2000);
	};

	// Placeholder for attach (integrate camera/photo/file when storage backend is ready)
	const handleAttachClick = (type: "camera" | "photo" | "file") => {
		void type;
	};

	const handleNewChat = () => {
		setMessages([]);
		setActiveArtifact(null);
		setIsWorkspaceOpen(false);
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
						onArtifactSelect={(artifact) => {
							setActiveArtifact(artifact);
							setIsWorkspaceOpen(true);
						}}
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
            onClose={() => setIsWorkspaceOpen(false)}
          />
        )}
			</main>
		</div>
	);
}
