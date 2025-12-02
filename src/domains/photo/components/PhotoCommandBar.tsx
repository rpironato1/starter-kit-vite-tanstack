import { motion } from "framer-motion";
import { ImageIcon, Loader2, Plus, Sparkles } from "lucide-react";
import type { RefObject } from "react";
import { useState } from "react";
import { CommandBarBase } from "@/shared/components";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import { AttachMenu } from "@/components/selectors/AttachMenu";
import { useTranslation } from "@/shared/hooks/useTranslation";
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
	attachedImage,
	onRemoveAttachment,
	inputRef,
	placeholder = "Descreva a imagem que você quer criar...",
}: PhotoCommandBarProps) {
	const [attachMenuOpen, setAttachMenuOpen] = useState(false);
	const { t } = useTranslation();

	const hasPrompt = value.trim().length > 0;
	const canSend = (hasPrompt || !!attachedImage) && !isLoading;

	const handleAttachSelect = (type: "camera" | "gallery" | "files") => {
		if (type === "camera") onPickFromCamera();
		if (type === "gallery") onOpenGallery();
		if (type === "files") onPickFromFiles();
		setAttachMenuOpen(false);
	};

	const attachmentPreview = attachedImage ? (
		<div className="relative inline-flex items-center gap-3 rounded-2xl border border-border-default bg-bg-modal/60 p-2 pr-3">
			<img
				src={attachedImage}
				alt="Referência"
				className="h-16 w-16 rounded-lg border border-border-default/60 object-cover"
			/>
			<div className="min-w-0 text-left">
				<p className="text-xs text-text-secondary">Imagem pronta para edição</p>
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
	) : null;

	return (
		<CommandBarBase
			attachmentPreview={attachmentPreview}
			leadingSlot={
				<>
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
					<button
						type="button"
						onClick={onOpenGallery}
						className="hidden items-center gap-2 rounded-full border border-border-default/60 px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-default hover:text-text-primary sm:inline-flex"
						title="Abrir Galeria"
					>
						<ImageIcon className="h-4 w-4" />
						<span>Galeria</span>
					</button>
				</>
			}
			primarySlot={
				<textarea
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					disabled={isLoading}
					rows={1}
					className="flex-1 resize-none border border-transparent bg-transparent px-3 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary"
				/>
			}
			trailingSlot={
				<>
					<button
						type="button"
						onClick={onOpenGallery}
						className="inline-flex sm:hidden items-center gap-2 rounded-full border border-border-default/60 px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-border-default hover:text-text-primary"
						title="Abrir Galeria"
					>
						<ImageIcon className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={onEnhancePrompt}
						disabled={!canEnhance || isEnhancing}
						className={cn(
							"rounded-full p-3 text-accent-textHighlight transition-colors",
							canEnhance ? "hover:bg-bg-hover" : "opacity-40",
						)}
						title="Aprimorar prompt"
					>
						{isEnhancing ? (
							<Loader2 className="h-5 w-5 animate-spin" />
						) : (
							<Sparkles className="h-5 w-5" />
						)}
					</button>
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
				</>
			}
			footerSlot={
				<div className="text-[11px] uppercase tracking-[0.4em] text-text-secondary">
					<span className="block text-text-primary">
						{t.photoView.ratioLabel}: {aspectRatio}
					</span>
					<span className="block text-[10px] tracking-[0.2em] text-text-secondary">
						{canEnhance
							? t.photoView.enhancerReady
							: t.photoView.enhancerLocked}
					</span>
				</div>
			}
		/>
	);
}

export default PhotoCommandBar;
