"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Code, Copy, RefreshCw, X } from "lucide-react";
import { useState } from "react";
import { CodeEditor } from "./CodeEditor";
import { Preview } from "./Preview";

export interface CanvasArtifact {
	id: string;
	title: string;
	type: "code" | "document";
	language: string;
	content: string;
}

interface CanvasWorkspaceProps {
	artifact: CanvasArtifact;
	onClose: () => void;
	isOpen: boolean;
}

export function CanvasWorkspace({
	artifact: initialArtifact,
	onClose,
	isOpen,
}: CanvasWorkspaceProps) {
	const [artifact, setArtifact] = useState(initialArtifact);
	const [activeTab, setActiveTab] = useState<"code" | "preview">(
		["html", "react", "javascript"].includes(initialArtifact.language)
			? "preview"
			: "code",
	);
	const [isCopied, setIsCopied] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(artifact.content);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	const handleRefresh = () => {
		setRefreshKey((prev) => prev + 1);
	};

	const handleCodeChange = (newContent: string) => {
		setArtifact((prev) => ({ ...prev, content: newContent }));
	};

	const isWebPreviewable = [
		"html",
		"react",
		"javascript",
		"jsx",
		"tsx",
	].includes(artifact.language);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ x: "100%" }}
					animate={{ x: 0 }}
					exit={{ x: "100%" }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed inset-0 z-50 md:static md:z-0 md:flex-1 md:h-full md:border-l md:border-border bg-bg-modal flex flex-col"
				>
					{/* Header */}
					<div className="h-14 border-b border-border flex items-center justify-between px-4 bg-bg-sidebar shrink-0">
						<div className="flex items-center gap-3">
							<div className="p-1.5 bg-bg-surface rounded-lg">
								<Code className="w-4 h-4 text-purple-400" />
							</div>
							<div>
								<h3 className="text-sm font-medium text-text-primary">
									{artifact.title}
								</h3>
								<span className="text-[10px] text-text-secondary uppercase">
									{artifact.language}
								</span>
							</div>
						</div>

						<div className="flex items-center gap-2">
							{/* Tab Switcher */}
							<div className="flex items-center gap-1 bg-bg-surface rounded-lg p-1">
								<button
									type="button"
									onClick={() => setActiveTab("code")}
									className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
										activeTab === "code"
											? "bg-bg-hover text-text-primary shadow-sm"
											: "text-text-secondary hover:text-text-primary"
									}`}
								>
									Code
								</button>
								{isWebPreviewable && (
									<button
										type="button"
										onClick={() => setActiveTab("preview")}
										className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
											activeTab === "preview"
												? "bg-bg-hover text-text-primary shadow-sm"
												: "text-text-secondary hover:text-text-primary"
										}`}
									>
										Preview
									</button>
								)}
							</div>

							{/* Actions */}
							<button
								type="button"
								onClick={handleRefresh}
								className="p-2 text-text-secondary hover:text-text-primary transition-colors"
							>
								<RefreshCw className="w-4 h-4" />
							</button>
							<button
								type="button"
								onClick={handleCopy}
								className="p-2 text-text-secondary hover:text-text-primary transition-colors"
							>
								{isCopied ? (
									<Check className="w-4 h-4 text-accent-primary" />
								) : (
									<Copy className="w-4 h-4" />
								)}
							</button>
							<button
								type="button"
								onClick={onClose}
								className="p-2 text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-lg transition-colors"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="flex-1 overflow-hidden">
						{activeTab === "code" ? (
							<CodeEditor
								content={artifact.content}
								language={artifact.language}
								onChange={handleCodeChange}
							/>
						) : (
							<Preview content={artifact.content} refreshKey={refreshKey} />
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
