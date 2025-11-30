import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CanvasWorkspace } from "@/components/canvas";
import { ArtifactCard } from "@/components/canvas/ArtifactCard";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import { Header } from "@/components/layout/Header";
import { InputBar } from "@/components/layout/InputBar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ModelSelector } from "@/components/selectors/ModelSelector";
import { SettingsModal } from "@/components/settings/SettingsModal";
import type { CanvasArtifact } from "@/types";
import { parseArtifactFromMessage } from "@/utils/canvas";

export const Route = createFileRoute("/canvas")({ component: CanvasPage });

interface CanvasMessage {
	id: string;
	role: "user" | "ai";
	content: string;
	image?: string;
	artifact?: CanvasArtifact;
}

const CANVAS_MODELS = [
	{
		id: "draft",
		name: "Zane Canvas Draft",
		description: "Quick drafts and initial ideation",
	},
	{
		id: "pro",
		name: "Zane Canvas Pro",
		description: "Structured writing and expanded context",
	},
	{
		id: "studio",
		name: "Zane Canvas Studio",
		description: "Complex creative production",
	},
];

function CanvasPage() {
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

	useEffect(
		() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
		[],
	);

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
		if (window.innerWidth < 768) {
			setIsWorkspaceOpen(false);
		}

		// Simulate AI response with code generation
		setTimeout(() => {
			const aiResponseContent = `Aqui está o código que você pediu:

\`\`\`html
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
\`\`\`

O código acima cria uma aplicação web baseada no seu pedido.`;

			// Parse automático do artefato
			const parsedArtifact = parseArtifactFromMessage(aiResponseContent);

			const aiMessage: CanvasMessage = {
				id: `msg-${Date.now()}`,
				role: "ai",
				content: aiResponseContent,
				artifact: parsedArtifact || undefined,
			};

			setMessages((prev) => [...prev, aiMessage]);
			if (parsedArtifact) {
				setActiveArtifact(parsedArtifact);
				setIsWorkspaceOpen(true);
			}
			setIsLoading(false);
		}, 2000);
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
				onModelClick={() => setIsModelSelectorOpen(true)}
				currentModel={currentModel}
			/>

			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				onNewChat={handleNewChat}
				onOpenSettings={() => {
					setIsSidebarOpen(false);
					setIsSettingsOpen(true);
				}}
				currentView="canvas"
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
			/>

			<SettingsModal
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
			/>

			{/* Main Content with Split View */}
			<main className="flex-1 overflow-hidden relative flex">
				{/* Chat Panel */}
				<div
					className={`flex-1 overflow-hidden relative transition-all duration-300 ${
						isWorkspaceOpen ? "w-full md:w-[40%]" : "w-full"
					}`}
				>
					<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
						<div className="max-w-3xl mx-auto py-6 space-y-6">
							<AnimatePresence mode="popLayout">
								{messages.length === 0 && !isLoading ? (
									<EmptyState variant="canvas" />
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
														<div className="max-w-[85%] md:max-w-[65%] bg-bg-surface text-text-primary px-5 py-3.5 rounded-[20px] rounded-tr-[4px] border border-border shadow-sm">
															<p className="text-[15px] leading-relaxed">
																{message.content}
															</p>
														</div>
													</div>
												) : (
													<div className="space-y-2">
														<AIMessage
															content={message.content}
															hideCodeBlocks
														/>
														{message.role === "ai" && message.artifact && (
															<div className="mt-3">
																<ArtifactCard
																	artifact={message.artifact}
																	onClick={() => {
																		if (message.artifact) {
																			setActiveArtifact(message.artifact);
																			setIsWorkspaceOpen(true);
																		}
																	}}
																/>
															</div>
														)}
													</div>
												)}
											</motion.div>
										))}
										{isLoading && (
											<LoadingIndicator text="Generating code..." />
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
						isLoading={isLoading}
						reasoningLevel={reasoningLevel}
						onReasoningChange={setReasoningLevel}
						inputRef={inputRef}
						placeholder="Describe what you want to build..."
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
