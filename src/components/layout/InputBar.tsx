import { motion } from "framer-motion";
import { Plus, Brain, Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputBarProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	onAttachClick?: () => void;
	onReasoningClick?: () => void;
	onMicClick?: () => void;
	attachMenuOpen?: boolean;
	reasoningActive?: boolean;
	isLoading?: boolean;
	placeholder?: string;
	className?: string;
}

export function InputBar({
	value,
	onChange,
	onSend,
	onAttachClick,
	onReasoningClick,
	onMicClick,
	attachMenuOpen = false,
	reasoningActive = false,
	isLoading = false,
	placeholder = "Chat com Zane",
	className,
}: InputBarProps) {
	const hasContent = value.trim().length > 0;
	const canSend = hasContent && !isLoading;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && !e.shiftKey && canSend) {
			e.preventDefault();
			onSend();
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
			<div className="relative bg-bg-surface rounded-[32px] p-2 flex items-center shadow-lg border border-border-default ring-1 ring-white/5 max-w-3xl mx-auto w-full">
				{/* Plus/Attach Button */}
				<button
					type="button"
					onClick={onAttachClick}
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
					onClick={onReasoningClick}
					className={cn(
						"p-2.5 rounded-full transition-all duration-200",
						reasoningActive
							? "text-accent-primary bg-accent-primary/10"
							: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
					)}
					aria-label="Nível de raciocínio"
				>
					<Brain className="w-5 h-5" />
				</button>

				{/* Text Input */}
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					disabled={isLoading}
					className={cn(
						"flex-1 bg-transparent border-none outline-none",
						"text-text-primary placeholder-text-secondary",
						"px-3 text-lg h-12 min-w-0",
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
		</footer>
	);
}
