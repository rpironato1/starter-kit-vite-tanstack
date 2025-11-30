import { motion } from "framer-motion";
import { Brain, Mic, Plus, Send, X } from "lucide-react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";

type ReasoningLevel = "soft" | "medium" | "max" | "disabled";

interface InputBarProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	onImageAttach?: (imageUrl: string) => void;
	attachedImage?: string | null;
	onRemoveImage?: () => void;
	isLoading: boolean;
	reasoningLevel: ReasoningLevel;
	onReasoningChange: (level: ReasoningLevel) => void;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
	placeholder?: string;
	onAttachClick?: () => void;
	onMicClick?: () => void;
	attachMenuOpen?: boolean;
	className?: string;
}

export function InputBar({
	value,
	onChange,
	onSend,
	onImageAttach,
	attachedImage,
	onRemoveImage,
	isLoading,
	reasoningLevel,
	onReasoningChange,
	inputRef,
	placeholder = "Chat com Zane",
	onAttachClick,
	onMicClick,
	attachMenuOpen = false,
	className,
}: InputBarProps) {
	const hasContent = value.trim().length > 0 || !!attachedImage;
	const canSend = hasContent && !isLoading;
	const reasoningActive = reasoningLevel !== "disabled";

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey && canSend) {
			e.preventDefault();
			onSend();
		}
	};

	const cycleReasoningLevel = () => {
		const levels: ReasoningLevel[] = ["disabled", "soft", "medium", "max"];
		const currentIndex = levels.indexOf(reasoningLevel);
		const nextIndex = (currentIndex + 1) % levels.length;
		onReasoningChange(levels[nextIndex]);
	};

	const handleAttachClick = () => {
		if (onImageAttach) {
			// Simular seleção de imagem - em produção usaria input file
			const fakeImageUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
			onImageAttach(fakeImageUrl);
		} else if (onAttachClick) {
			onAttachClick();
		}
	};

	return (
		<footer
			className={cn(
				"absolute bottom-0 left-0 w-full p-4 pb-6 z-20",
				"bg-gradient-to-t from-bg-main via-bg-main/95 to-transparent backdrop-blur-[2px]",
				className,
			)}
		>
			<div className="relative bg-bg-surface rounded-[32px] p-2 flex flex-col shadow-lg border border-border-default ring-1 ring-white/5 max-w-3xl mx-auto w-full">
				{/* Attached Image Preview */}
				{attachedImage && (
					<div className="px-3 pt-2 pb-1">
						<div className="relative inline-block">
							<img
								src={attachedImage}
								alt="Attached"
								className="w-20 h-20 object-cover rounded-lg border border-border-default"
							/>
							<button
								type="button"
								onClick={onRemoveImage}
								className="absolute -top-2 -right-2 p-1 bg-bg-hover rounded-full text-text-secondary hover:text-red-400 transition-colors"
								aria-label="Remover imagem"
							>
								<X className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}

				<div className="flex items-center">
					{/* Plus/Attach Button */}
					<button
						type="button"
						onClick={handleAttachClick}
						className={cn(
							"p-3 rounded-full transition-all duration-300",
							attachMenuOpen
								? "bg-bg-hover text-text-primary rotate-45"
								: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
						)}
						aria-label="Anexar arquivo"
					>
						<Plus className="w-6 h-6" />
					</button>

					{/* Divider */}
					<div className="w-px h-5 bg-border-default mx-0.5" />

					{/* Reasoning Button (Brain) */}
					<button
						type="button"
						onClick={cycleReasoningLevel}
						className={cn(
							"p-2.5 rounded-full transition-all duration-200 relative",
							reasoningActive
								? "text-accent-primary bg-accent-primary/10"
								: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
						)}
						aria-label={`Nível de raciocínio: ${reasoningLevel}`}
						title={`Raciocínio: ${reasoningLevel}`}
					>
						<Brain className="w-5 h-5" />
						{reasoningActive && (
							<span className="absolute -top-1 -right-1 text-[10px] font-bold text-accent-primary">
								{reasoningLevel[0].toUpperCase()}
							</span>
						)}
					</button>

					{/* Text Input */}
					<textarea
						ref={inputRef}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						disabled={isLoading}
						rows={1}
						className={cn(
							"flex-1 bg-transparent border-none outline-none resize-none",
							"text-text-primary placeholder-text-secondary",
							"px-3 text-lg h-12 min-w-0 py-3",
						)}
					/>

					{/* Mic Button */}
					<button
						type="button"
						onClick={onMicClick}
						className="p-3 rounded-full hover:bg-bg-hover text-text-secondary transition-colors"
						aria-label="Gravar áudio"
					>
						<Mic className="w-5 h-5" />
					</button>

					{/* Send Button */}
					<motion.button
						type="button"
						onClick={onSend}
						disabled={!canSend}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"p-3 rounded-full transition-all duration-200",
							canSend
								? "bg-accent-primary text-white hover:bg-accent-hover shadow-lg shadow-green-900/20"
								: "bg-bg-hover text-text-secondary cursor-not-allowed opacity-50",
						)}
						aria-label="Enviar mensagem"
					>
						<Send className="w-5 h-5 ml-0.5" />
					</motion.button>
				</div>
			</div>
		</footer>
	);
}
