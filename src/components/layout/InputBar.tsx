import { motion } from "framer-motion";
import { Mic, Plus, Send, X } from "lucide-react";
import type { RefObject } from "react";
import { useState } from "react";
import { AttachMenu } from "@/components/selectors/AttachMenu";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { cn } from "@/lib/utils";

type ReasoningLevel = "soft" | "medium" | "max" | "off";

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
	className,
}: InputBarProps) {
	const [attachMenuOpen, setAttachMenuOpen] = useState(false);
	const hasContent = value.trim().length > 0 || !!attachedImage;
	const canSend = hasContent && !isLoading;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey && canSend) {
			e.preventDefault();
			onSend();
		}
	};

	const handleAttachSelect = (type: "camera" | "gallery" | "files") => {
		if (type === "camera") {
			// Simular captura de câmera
			if (onImageAttach) {
				const fakeImageUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
				onImageAttach(fakeImageUrl);
			}
		} else if (type === "gallery") {
			// Simular seleção de galeria
			if (onImageAttach) {
				const fakeImageUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
				onImageAttach(fakeImageUrl);
			}
		} else if (type === "files") {
			// Simular upload de arquivo - em produção abriria file picker
			if (onAttachClick) {
				onAttachClick();
			}
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
					{/* Attach Menu Button */}
					<div className="relative">
						<button
							type="button"
							onClick={() => setAttachMenuOpen(!attachMenuOpen)}
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
						<AttachMenu
							isOpen={attachMenuOpen}
							onClose={() => setAttachMenuOpen(false)}
							onSelect={handleAttachSelect}
						/>
					</div>

					{/* Divider */}
					<div className="w-px h-5 bg-border-default mx-0.5" />

					{/* Reasoning Selector */}
					<ReasoningSelector
						value={reasoningLevel}
						onChange={onReasoningChange}
					/>

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
