import { motion } from "framer-motion";
import { ImageIcon, Loader2, Plus, Sparkles } from "lucide-react";
import type { RefObject } from "react";
import { useState } from "react";
import { CommandBarBase } from "@/components/layout/CommandBarBase";
import {
	type AspectRatio,
	AspectRatioSelector,
} from "@/components/selectors/AspectRatioSelector";
import { AttachMenu } from "@/components/selectors/AttachMenu";
import { cn } from "@/lib/utils";

interface PhotoCommandBarProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	onEnhancePrompt: () => void;
	canEnhance: boolean;
	isEnhancing: boolean;
	isLoading: boolean;
	onOpenGallery: () => void;
	onPickFromCamera: () => void;
	onPickFromFiles: () => void;
	aspectRatio: AspectRatio;
	onAspectRatioChange: (ratio: AspectRatio) => void;
	attachedImage?: string | null;
	onRemoveAttachment?: () => void;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
	placeholder?: string;
}

export function PhotoCommandBar({
	value,
	onChange,
	onSend,
	onEnhancePrompt,
	canEnhance,
	isEnhancing,
	isLoading,
	onOpenGallery,
	onPickFromCamera,
	onPickFromFiles,
	aspectRatio,
	onAspectRatioChange,
	attachedImage,
	onRemoveAttachment,
	inputRef,
	placeholder = "Descreva a imagem que você quer criar...",
}: PhotoCommandBarProps) {
	const [attachMenuOpen, setAttachMenuOpen] = useState(false);
	const [ratioMenuOpen, setRatioMenuOpen] = useState(false);

	const hasPrompt = value.trim().length > 0;
	const canSend = (hasPrompt || !!attachedImage) && !isLoading;

	const handleAttachSelect = (type: "camera" | "gallery" | "files") => {
		if (type === "camera") onPickFromCamera();
		if (type === "gallery") onOpenGallery();
		if (type === "files") onPickFromFiles();
		setAttachMenuOpen(false);
	};

	const attachmentPreview = attachedImage ? (
		<div className="px-3 pt-2 pb-1">
			<div className="relative inline-flex items-center gap-3 rounded-xl border border-border-default bg-bg-modal/60 p-2 pr-3">
				<img
					src={attachedImage}
					alt="Referência"
					className="h-16 w-16 rounded-lg border border-border-default/60 object-cover"
				/>
				<div className="min-w-0 text-left">
					<p className="text-xs text-text-secondary">
						Imagem pronta para edição
					</p>
					<p className="text-sm font-medium text-text-primary truncate">
						Referência importada
					</p>
				</div>
				<button
					type="button"
					onClick={onRemoveAttachment}
					className="rounded-full bg-bg-hover p-1 text-text-secondary transition-colors hover:text-red-400"
					aria-label="Remover imagem"
				>
					<Plus className="h-4 w-4 rotate-45" />
				</button>
			</div>
		</div>
	) : null;

	return (
		<CommandBarBase attachmentPreview={attachmentPreview}>
			<div className="flex items-center gap-2">
				<div className="relative">
					<button
						type="button"
						onClick={() => setAttachMenuOpen((prev) => !prev)}
						className={cn(
							"rounded-full p-3 transition-all duration-300",
							attachMenuOpen
								? "rotate-45 bg-bg-hover text-text-primary"
								: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
						)}
						aria-label="Abrir opções de anexo"
					>
						<Plus className="h-6 w-6" />
					</button>
					<AttachMenu
						isOpen={attachMenuOpen}
						onClose={() => setAttachMenuOpen(false)}
						onSelect={handleAttachSelect}
					/>
				</div>

				<div className="mx-0.5 h-5 w-px bg-border-default" />

				<div className="relative">
					<button
						type="button"
						onClick={() => setRatioMenuOpen((prev) => !prev)}
						className={cn(
							"rounded-full p-3 text-text-secondary transition-colors",
							ratioMenuOpen
								? "bg-bg-hover text-text-primary"
								: "hover:bg-bg-hover hover:text-text-primary",
						)}
						title={`Proporção: ${aspectRatio}`}
						aria-expanded={ratioMenuOpen}
					>
						<ImageIcon className="h-5 w-5" />
					</button>

					{ratioMenuOpen && (
						<>
							<button
								type="button"
								aria-label="Fechar proporções"
								className="fixed inset-0 z-20 cursor-default"
								onClick={() => setRatioMenuOpen(false)}
							/>
							<motion.div
								initial={{ opacity: 0, scale: 0.95, y: 10 }}
								animate={{ opacity: 1, scale: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95, y: 10 }}
								transition={{ type: "spring", stiffness: 400, damping: 30 }}
								className="absolute bottom-full left-0 z-30 mb-3 w-64 rounded-2xl border border-border-default bg-bg-modal/95 p-3 shadow-2xl backdrop-blur-xl"
							>
								<div className="mb-2 text-xs font-bold uppercase tracking-widest text-text-secondary">
									Proporção
								</div>
								<AspectRatioSelector
									value={aspectRatio}
									onChange={(ratio) => {
										onAspectRatioChange(ratio);
										setRatioMenuOpen(false);
									}}
								/>
							</motion.div>
						</>
					)}
				</div>

				<textarea
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					disabled={isLoading}
					rows={1}
					className="flex-1 resize-none border-none bg-transparent px-3 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary"
				/>

				{canEnhance && (
					<button
						type="button"
						onClick={onEnhancePrompt}
						disabled={isEnhancing}
						className="rounded-full p-3 text-accent-textHighlight transition-colors hover:bg-bg-hover disabled:cursor-wait disabled:opacity-70"
						title="Aprimorar prompt"
					>
						{isEnhancing ? (
							<Loader2 className="h-5 w-5 animate-spin" />
						) : (
							<Sparkles className="h-5 w-5" />
						)}
					</button>
				)}

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
					aria-label="Gerar imagem"
				>
					<ImageIcon className="h-5 w-5" />
				</motion.button>
			</div>
		</CommandBarBase>
	);
}

export default PhotoCommandBar;
