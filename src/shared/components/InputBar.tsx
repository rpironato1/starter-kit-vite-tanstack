import { motion } from "framer-motion";
import { Mic, Plus, Send, X } from "lucide-react";
import type { RefObject } from "react";
import { useState } from "react";
import { AttachMenu } from "@/components/selectors/AttachMenu";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { useTranslation } from "@/shared/hooks/useTranslation";
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

/**
 * Implementação genérica do input bar usado nos protótipos.
 * Atual/legado, mas mantido no shared para consumo futuro.
 */
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
	const { t } = useTranslation();
	const hasContent = value.trim().length > 0 || !!attachedImage;
	const canSend = hasContent && !isLoading;
	const resolvedPlaceholder = placeholder ?? t.input.placeholder;

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey && canSend) {
			e.preventDefault();
			onSend();
		}
	};

	const handleAttachSelect = (type: "camera" | "gallery" | "files") => {
		if (type === "camera" || type === "gallery") {
			if (onImageAttach) {
				const fakeImageUrl = `https://picsum.photos/200/200?random=${Date.now()}`;
				onImageAttach(fakeImageUrl);
			}
			return;
		}
		if (type === "files") {
			onAttachClick?.();
		}
	};

	const attachmentPreview = attachedImage ? (
		<div className="relative inline-flex items-center gap-3 rounded-2xl border border-border-default bg-bg-modal/70 p-2 pr-3">
			<img
				src={attachedImage}
				alt="Imagem anexada"
				className="h-16 w-16 rounded-xl border border-border-default/60 object-cover"
			/>
			<div className="min-w-0">
				<p className="text-[11px] uppercase tracking-wider text-text-secondary">
					{t.input.attached}
				</p>
				<p className="text-sm font-medium text-text-primary truncate">
					Pré-visualização pronta
				</p>
			</div>
			<button
				type="button"
				onClick={onRemoveImage}
				className="rounded-full bg-bg-hover p-1 text-text-secondary transition-colors hover:text-red-400"
				aria-label="Remover imagem"
			>
				<X className="h-4 w-4" />
			</button>
		</div>
	) : null;

	return (
		<CommandBarBase
			attachmentPreview={attachmentPreview}
			className={className}
			leadingSlot={
				<>
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
							aria-label={t.input.files}
							aria-expanded={attachMenuOpen}
						>
							<Plus className="h-6 w-6" />
						</button>
						<AttachMenu
							isOpen={attachMenuOpen}
							onClose={() => setAttachMenuOpen(false)}
							onSelect={handleAttachSelect}
						/>
					</div>
					<span className="hidden h-5 w-px bg-border-default sm:block" />
					<ReasoningSelector
						value={reasoningLevel}
						onChange={onReasoningChange}
					/>
				</>
			}
			primarySlot={
				<textarea
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={resolvedPlaceholder}
					disabled={isLoading}
					rows={1}
					className="h-full w-full resize-none border border-transparent bg-transparent px-3 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary md:text-lg"
				/>
			}
			trailingSlot={
				<>
					<button
						type="button"
						onClick={onMicClick}
						className="rounded-full p-3 text-text-secondary transition-colors hover:bg-bg-hover"
						aria-label="Gravar áudio"
					>
						<Mic className="h-5 w-5" />
					</button>
					<motion.button
						type="button"
						onClick={onSend}
						disabled={!canSend}
						whileTap={{ scale: 0.95 }}
						className={cn(
							"rounded-full p-3 transition-all duration-200",
							canSend
								? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20 hover:bg-accent-hover"
								: "cursor-not-allowed bg-bg-hover text-text-secondary opacity-50",
						)}
						aria-label="Enviar mensagem"
					>
						<Send className="ml-0.5 h-5 w-5" />
					</motion.button>
				</>
			}
			footerSlot={<span>{t.input.thinking}</span>}
		/>
	);
}
