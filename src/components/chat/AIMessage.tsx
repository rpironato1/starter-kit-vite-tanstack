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
import { type ReactNode, useState } from "react";
import { ZaneBadge } from "@/components/ui/zane-badge";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";
import type { TokenUsage } from "@/types";
import { MessageRenderer } from "./MessageRenderer";
import { TodoListPanel } from "./TodoListPanel";

/** Interface for Source Chips */
interface Source {
	title: string;
	url?: string;
	uri?: string;
}

interface AIMessageProps {
	content: string;
	timestamp?: Date;
	isLoading?: boolean;
	image?: string;
	sources?: Source[];
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

interface ActionButtonProps {
	icon: ReactNode;
	label: string;
	onClick?: () => void;
	active?: boolean;
}

function ActionButton({
	icon,
	label,
	onClick,
	active = false,
}: ActionButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			title={label}
			aria-label={label}
			disabled={!onClick}
			className={cn(
				"flex h-9 w-9 items-center justify-center rounded-xl border border-border-default/40 text-text-secondary transition-all",
				"bg-bg-surface/60 backdrop-blur hover:bg-bg-hover/50 hover:text-text-primary",
				active &&
					"bg-accent-primary/20 text-accent-primary border-accent-primary/40",
				!onClick && "cursor-not-allowed opacity-40",
			)}
		>
			<span className="pointer-events-none">{icon}</span>
		</button>
	);
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
	const { t } = useTranslation();

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
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ type: "spring", stiffness: 400, damping: 35 }}
			className="flex w-full justify-start"
		>
			<div className="w-full max-w-3xl space-y-4">
				<div className="pl-1">
					<ZaneBadge variant="default" />
				</div>

				{isLoading ? (
					<div className="flex items-center gap-2 pl-1 text-text-secondary">
						<motion.span
							animate={{ opacity: [0.3, 1, 0.3] }}
							transition={{ duration: 1.2, repeat: Infinity }}
							className="h-2.5 w-2.5 rounded-full bg-accent-primary"
						/>
						<motion.span
							animate={{ opacity: [0.3, 1, 0.3] }}
							transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
							className="h-2.5 w-2.5 rounded-full bg-accent-primary"
						/>
						<motion.span
							animate={{ opacity: [0.3, 1, 0.3] }}
							transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
							className="h-2.5 w-2.5 rounded-full bg-accent-primary"
						/>
					</div>
				) : (
					<>
						{executionPlan && executionPlan.length > 0 && (
							<TodoListPanel items={executionPlan} />
						)}

						<div className="space-y-4">
							<MessageRenderer
								content={content}
								hideCodeBlocks={hideCodeBlocks}
							/>

							{image && (
								<div className="overflow-hidden rounded-3xl border border-border-default/60">
									<img
										src={image}
										alt="Imagem gerada"
										className="h-auto w-full object-cover"
									/>
								</div>
							)}
						</div>

						{sources && sources.length > 0 && (
							<div className="space-y-3 rounded-2xl border border-border-default/60 bg-bg-surface/60 p-4">
								<div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
									<span>{t.message.sources}</span>
									<div className="h-px flex-1 bg-border-default/60" />
								</div>
								<div className="flex flex-wrap gap-2">
									{sources.map((source, idx) => {
										const sourceUrl = source.url || source.uri;
										const wrapperClasses = cn(
											"group inline-flex items-center gap-2 rounded-full border border-border-default/60 bg-bg-modal/70 px-3 py-1.5 text-text-secondary",
											"hover:border-accent-primary/40 hover:text-text-primary",
										);
										return sourceUrl ? (
											<a
												key={`source-${source.title}-${idx}`}
												href={sourceUrl}
												target="_blank"
												rel="noopener noreferrer"
												className={wrapperClasses}
											>
												<div className="flex items-center gap-2">
													<span className="h-1.5 w-1.5 rounded-full bg-accent-primary shadow-[0_0_6px_rgba(36,107,49,0.6)]" />
													<span className="text-xs text-text-primary/80">
														{source.title}
													</span>
													<ExternalLink className="h-3 w-3 text-text-secondary/70 transition-opacity duration-200 group-hover:opacity-100" />
												</div>
											</a>
										) : (
											<span
												key={`source-${source.title}-${idx}`}
												className={wrapperClasses}
											>
												<div className="flex items-center gap-2">
													<span className="h-1.5 w-1.5 rounded-full bg-accent-primary shadow-[0_0_6px_rgba(36,107,49,0.6)]" />
													<span className="text-xs text-text-primary/80">
														{source.title}
													</span>
												</div>
											</span>
										);
									})}
								</div>
							</div>
						)}

						{timestamp && (
							<time className="block text-xs text-text-secondary">
								{timestamp.toLocaleTimeString([], {
									hour: "2-digit",
									minute: "2-digit",
								})}
							</time>
						)}

						<div className="flex flex-wrap items-center justify-between gap-2 pt-1">
							<div className="flex items-center gap-1.5">
								<ActionButton
									icon={
										copied ? (
											<Check className="h-4 w-4" />
										) : (
											<Copy className="h-4 w-4" />
										)
									}
									label={copied ? t.message.copied : t.message.copy}
									onClick={handleCopy}
									active={copied}
								/>
								<ActionButton
									icon={<ThumbsUp className="h-4 w-4" />}
									label={t.message.like}
									onClick={onLike}
								/>
								<ActionButton
									icon={<ThumbsDown className="h-4 w-4" />}
									label={t.message.dislike}
									onClick={onDislike}
								/>
								{isLastMessage && onRetry && (
									<ActionButton
										icon={<RotateCcw className="h-4 w-4" />}
										label={t.message.retry}
										onClick={onRetry}
									/>
								)}
							</div>

							{onTokenDetails && usage && (
								<button
									type="button"
									onClick={() => onTokenDetails(usage)}
									className="flex items-center gap-2 rounded-xl border border-border-default/60 bg-bg-surface/60 px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-accent-primary/40 hover:text-text-primary"
									title={t.message.tokenUsage}
									aria-label={t.message.tokenUsage}
								>
									<Activity className="h-4 w-4" />
									<span className="font-mono text-[11px]">
										{usage.totalTokens.toLocaleString()}
									</span>
								</button>
							)}
						</div>
					</>
				)}
			</div>
		</motion.div>
	);
}

export default AIMessage;
