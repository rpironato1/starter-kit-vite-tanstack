import { motion } from "framer-motion";
import { Mic, Plus, Send, X } from "lucide-react";
import type { RefObject } from "react";
import { useState } from "react";
import { AttachMenu } from "@/components/selectors/AttachMenu";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { cn } from "@/lib/utils";
import { CommandBarBase } from "./CommandBarBase";

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

	const attachmentPreview = attachedImage ? (
		<div className="px-3 pt-2 pb-1">
			<div className="relative inline-block">
				<img
					src={attachedImage}
					alt="Anexo"
					className="h-20 w-20 rounded-lg border border-border-default object-cover"
				/>
				<button
					type="button"
					onClick={onRemoveImage}
					className="absolute -right-2 -top-2 rounded-full bg-bg-hover p-1 text-text-secondary transition-colors hover:text-red-400"
					aria-label="Remover imagem"
				>
					<X className="h-4 w-4" />
				</button>
			</div>
		</div>
	) : null;

	return (
		<CommandBarBase attachmentPreview={attachmentPreview} className={className}>
			<div className="flex items-center">
				{/* Attach Menu Button */}
				<div className="relative">
					<button
						type="button"
						onClick={() => setAttachMenuOpen(!attachMenuOpen)}
						className={cn(
							"rounded-full p-3 transition-all duration-300",
							attachMenuOpen
								? "rotate-45 bg-bg-hover text-text-primary"
								: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
						)}
						aria-label="Anexar arquivo"
					>
						<Plus className="h-6 w-6" />
					</button>
					<AttachMenu
						isOpen={attachMenuOpen}
						onClose={() => setAttachMenuOpen(false)}
						onSelect={handleAttachSelect}
					/>
				</div>

				{/* Divider */}
				<div className="mx-0.5 h-5 w-px bg-border-default" />

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
						"flex-1 resize-none border-none bg-transparent px-3 py-3 text-lg text-text-primary outline-none placeholder:text-text-secondary",
					)}
				/>

				{/* Mic Button */}
				<button
					type="button"
					onClick={onMicClick}
					className="rounded-full p-3 text-text-secondary transition-colors hover:bg-bg-hover"
					aria-label="Gravar áudio"
				>
					<Mic className="h-5 w-5" />
				</button>

				{/* Send Button */}
				<motion.button
					type="button"
					onClick={onSend}
					disabled={!canSend}
					whileTap={{ scale: 0.95 }}
					className={cn(
						"rounded-full p-3 transition-all duration-200",
						canSend
							? "bg-accent-primary text-white shadow-lg shadow-green-900/20 hover:bg-accent-hover"
							: "cursor-not-allowed bg-bg-hover text-text-secondary opacity-50",
					)}
					aria-label="Enviar mensagem"
				>
					<Send className="ml-0.5 h-5 w-5" />
				</motion.button>
			</div>
		</CommandBarBase>
	);
}
