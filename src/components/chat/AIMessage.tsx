import { motion } from "framer-motion";
import {
	Activity,
	Check,
	Copy,
	ExternalLink,
	RotateCcw,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TokenUsage } from "@/types";
import { MessageRenderer } from "./MessageRenderer";
import { TodoListPanel } from "./TodoListPanel";

interface AIMessageProps {
	content: string;
	timestamp?: Date;
	isLoading?: boolean;
	image?: string;
	sources?: Array<{ title: string; uri: string }>;
	usage?: TokenUsage;
	executionPlan?: string[];
	hideCodeBlocks?: boolean;
	onCopy?: () => void;
	onLike?: () => void;
	onDislike?: () => void;
	onRetry?: () => void;
	onTokenDetails?: (usage: TokenUsage) => void;
	isLastMessage?: boolean;
}

export function AIMessage({
	content,
	timestamp,
	isLoading = false,
	image,
	sources,
	usage,
	executionPlan,
	hideCodeBlocks = false,
	onCopy,
	onLike,
	onDislike,
	onRetry,
	onTokenDetails,
	isLastMessage = false,
}: AIMessageProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			onCopy?.();
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
			className="group mr-auto max-w-[90%] md:max-w-2xl"
		>
			{/* Header with Zane AI badge */}
			<div className="mb-2">
				<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
					Zane AI
				</span>
			</div>

			{/* Message content */}
			<div className="px-1">
				{isLoading ? (
					<div className="flex items-center gap-1">
						<motion.span
							animate={{ opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="h-2 w-2 rounded-full bg-accent-primary"
						/>
						<motion.span
							animate={{ opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
							className="h-2 w-2 rounded-full bg-accent-primary"
						/>
						<motion.span
							animate={{ opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
							className="h-2 w-2 rounded-full bg-accent-primary"
						/>
					</div>
				) : (
					<>
						{/* Execution Plan */}
						{executionPlan && executionPlan.length > 0 && (
							<TodoListPanel items={executionPlan} />
						)}

						{/* Main Content */}
						<MessageRenderer
							content={content}
							hideCodeBlocks={hideCodeBlocks}
						/>

						{/* Generated Image */}
						{image && (
							<div className="mt-3">
								<img
									src={image}
									alt="Imagem gerada"
									className="rounded-lg max-w-full border border-border-default"
								/>
							</div>
						)}

						{/* Sources Chips */}
						{sources && sources.length > 0 && (
							<div className="mt-3 pt-3 border-t border-border-default">
								<p className="text-xs text-text-secondary mb-2">Fontes:</p>
								<div className="flex flex-wrap gap-2">
									{sources.map((source, idx) => (
										<a
											key={`source-${source.title}-${idx}`}
											href={source.uri}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 text-xs text-accent-primary hover:underline bg-accent-primary/10 px-2 py-1 rounded"
										>
											<ExternalLink className="w-3 h-3" />
											{source.title}
										</a>
									))}
								</div>
							</div>
						)}
					</>
				)}

				{timestamp && (
					<time className="mt-2 block text-xs text-text-secondary">
						{timestamp.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</time>
				)}
			</div>

			{/* Action buttons footer */}
			{!isLoading && (
				<div className="mt-3 flex items-center justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={handleCopy}
							className={cn(
								"flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary",
								copied && "text-accent-primary",
							)}
							aria-label={copied ? "Copiado" : "Copiar mensagem"}
						>
							{copied ? (
								<Check className="h-4 w-4" />
							) : (
								<Copy className="h-4 w-4" />
							)}
						</button>

						<button
							type="button"
							onClick={onLike}
							className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
							aria-label="Gostei"
						>
							<ThumbsUp className="h-4 w-4" />
						</button>

						<button
							type="button"
							onClick={onDislike}
							className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
							aria-label="Não gostei"
						>
							<ThumbsDown className="h-4 w-4" />
						</button>

						{isLastMessage && onRetry && (
							<button
								type="button"
								onClick={onRetry}
								className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
								aria-label="Tentar novamente"
							>
								<RotateCcw className="h-4 w-4" />
							</button>
						)}
					</div>

					{/* Token Usage Button */}
					{onTokenDetails && usage && (
						<button
							type="button"
							onClick={() => onTokenDetails(usage)}
							className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary hover:bg-bg-hover hover:text-text-primary"
							aria-label="Ver detalhes de tokens"
						>
							<Activity className="h-4 w-4" />
							<span>{usage.totalTokens.toLocaleString()}</span>
						</button>
					)}
				</div>
			)}
		</motion.div>
	);
}

export default AIMessage;
