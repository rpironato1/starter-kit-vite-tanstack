import { motion } from "framer-motion";
import { Check, Copy, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AIMessageProps {
	content: string;
	timestamp?: Date;
	isLoading?: boolean;
	hideCodeBlocks?: boolean;
	onCopy?: () => void;
	onLike?: () => void;
	onDislike?: () => void;
}

export function AIMessage({
	content,
	timestamp,
	isLoading = false,
	hideCodeBlocks: _hideCodeBlocks = false,
	onCopy,
	onLike,
	onDislike,
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

	const renderContent = (text: string) => {
		return text.split("\n").map((line, index) => (
			<motion.span
				key={`line-${index}-${line.slice(0, 20)}`}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: index * 0.05, duration: 0.3 }}
				className="block"
			>
				{line || "\u00A0"}
			</motion.span>
		));
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 30,
			}}
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
					<p className="text-[15px] leading-relaxed text-text-primary">
						{renderContent(content)}
					</p>
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
				<div className="mt-3 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
					<button
						type="button"
						onClick={handleCopy}
						className={cn(
							"flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary",
							copied && "text-accent-primary",
						)}
						aria-label={copied ? "Copied" : "Copy message"}
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
						aria-label="Like message"
					>
						<ThumbsUp className="h-4 w-4" />
					</button>

					<button
						type="button"
						onClick={onDislike}
						className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
						aria-label="Dislike message"
					>
						<ThumbsDown className="h-4 w-4" />
					</button>
				</div>
			)}
		</motion.div>
	);
}

export default AIMessage;
