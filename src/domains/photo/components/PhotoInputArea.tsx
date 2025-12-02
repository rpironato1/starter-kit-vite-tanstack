import {
	Check,
	Image as ImageIcon,
	Square,
	Plus,
	Send,
	Sparkles,
	X,
} from "lucide-react";
import { type RefObject, useState } from "react";
import { PrototypeInputContainer } from "@/components/layout/PrototypeInputContainer";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";
import { PhotoAttachPopover } from "./PhotoAttachPopover";
import { ASPECT_RATIOS } from "./photoAspectRatios";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface PhotoInputAreaProps {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isLoading: boolean;
	aspectRatio: AspectRatio;
	onAspectRatioChange: (ratio: AspectRatio) => void;
	onAttachClick?: ((type: "camera" | "photo" | "gallery") => void) | undefined;
	onEnhancePrompt?: (() => void) | undefined;
	canEnhance?: boolean | undefined;
	isEnhancing?: boolean | undefined;
	onRemoveImage?: (() => void) | undefined;
	attachedImage?: string | null;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
	currentModel?: string | undefined;
}

interface RatioPopoverProps {
	aspectRatio: AspectRatio;
	onAspectRatioChange: (ratio: AspectRatio) => void;
	onClose: () => void;
	ratioLabel: string;
}

const RatioPopover = ({
	aspectRatio,
	onAspectRatioChange,
	onClose,
	ratioLabel,
}: RatioPopoverProps) => (
	<div
		className={cn(
			"absolute bottom-full right-0 mb-4",
			"bg-bg-modal border border-border-default p-1.5 rounded-2xl shadow-xl",
			"min-w-[180px] z-50",
			"animate-in slide-in-from-bottom-2",
		)}
	>
		<div className="px-3 py-2 text-[10px] font-bold text-text-secondary uppercase tracking-widest">
			{ratioLabel}
		</div>
		{ASPECT_RATIOS.map((ratio) => (
			<button
				key={ratio.value}
				type="button"
				onClick={() => {
					onAspectRatioChange(ratio.value);
					onClose();
				}}
				className={cn(
					"w-full flex items-center justify-between p-2.5 rounded-xl transition-colors",
					aspectRatio === ratio.value
						? "bg-bg-hover text-text-primary"
						: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
				)}
			>
				<div className="flex items-center gap-3">
					<ratio.icon className="w-4 h-4" />
					<span className="text-xs font-medium">{ratio.label}</span>
				</div>
				{aspectRatio === ratio.value && (
					<Check className="w-3 h-3 text-accent-primary" />
				)}
			</button>
		))}
	</div>
);

export function PhotoInputArea({
	value,
	onChange,
	onSend,
	isLoading,
	aspectRatio,
	onAspectRatioChange,
	onAttachClick,
	onEnhancePrompt,
	canEnhance,
	isEnhancing,
	onRemoveImage,
	attachedImage,
	inputRef,
	currentModel,
}: PhotoInputAreaProps) {
	const [attachMenuOpen, setAttachMenuOpen] = useState(false);
	const [ratioMenuOpen, setRatioMenuOpen] = useState(false);
	const { t } = useTranslation();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	const hasContent = value.trim().length > 0 || !!attachedImage;
	const canSend = hasContent && !isLoading;
	const CurrentRatioIcon =
		ASPECT_RATIOS.find((r) => r.value === aspectRatio)?.icon || Square;

	// Preview
	const TopContent = attachedImage ? (
		<div className="flex items-center gap-2 justify-start animate-fade-in">
			<div className="relative group">
				<img
					src={attachedImage}
					alt="Preview"
					className="h-14 w-14 object-cover rounded-xl border border-border-default shadow-lg"
				/>
				<button
					type="button"
					onClick={onRemoveImage}
					className="absolute -top-2 -right-2 bg-bg-surface rounded-full p-1 text-text-secondary hover:text-white hover:bg-red-500 transition-all shadow-md"
				>
					<X className="w-3 h-3" />
				</button>
			</div>
		</div>
	) : null;

	return (
		<PrototypeInputContainer
			topContent={TopContent}
			leftActions={
				<div className="relative">
					<button
						type="button"
						onClick={() => setAttachMenuOpen(!attachMenuOpen)}
						className={cn(
							"p-3 rounded-full hover:bg-bg-hover text-text-secondary transition-all duration-300 ml-1",
							attachMenuOpen &&
								"bg-bg-hover text-text-primary rotate-45",
						)}
					>
						{attachMenuOpen ? (
							<Plus className="w-6 h-6" />
						) : (
							<ImageIcon className="w-6 h-6" />
						)}
					</button>
					{attachMenuOpen && (
						<PhotoAttachPopover
							onAttachClick={onAttachClick}
							onClose={() => setAttachMenuOpen(false)}
							labels={{
								camera: t.input.camera,
								photos: t.input.photos,
								gallery: "Galeria Zane",
							}}
						/>
					)}
				</div>
			}
			input={
				<textarea
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={t.input.placeholder}
					disabled={isLoading}
					rows={1}
					className={cn(
						"w-full bg-transparent border-none outline-none",
						"text-text-primary placeholder-text-secondary",
						"px-3 text-base h-12 min-w-0 resize-none py-3",
					)}
				/>
			}
			rightActions={
				<div className="flex items-center gap-2 mr-1 shrink-0">
					{/* Magic Enhancer - Visible only when typing on Lite/Pro */}
					{canEnhance && currentModel !== "Zane img Ultra" && (
						<button
							type="button"
							onClick={onEnhancePrompt}
							className="p-2.5 rounded-full hover:bg-bg-hover text-accent-textHighlight transition-colors animate-in fade-in zoom-in"
						>
							<Sparkles
								className={cn("w-5 h-5", isEnhancing && "animate-spin")}
							/>
						</button>
					)}

					{/* Ratio Selector */}
					<div className="relative">
						<button
							type="button"
							onClick={() => setRatioMenuOpen(!ratioMenuOpen)}
							className="p-2.5 rounded-full hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
						>
							<CurrentRatioIcon className="w-5 h-5" />
						</button>
						{ratioMenuOpen && (
							<RatioPopover
								aspectRatio={aspectRatio}
								onAspectRatioChange={onAspectRatioChange}
								onClose={() => setRatioMenuOpen(false)}
								ratioLabel={t.photoView.ratioLabel}
							/>
						)}
					</div>

					{/* Send Button */}
					<button
						type="button"
						onClick={onSend}
						disabled={!canSend}
						className={cn(
							"p-3 rounded-full transition-all duration-200 shadow-lg",
							canSend
								? "bg-accent-primary text-white hover:scale-105 shadow-green-900/20"
								: "bg-bg-hover text-text-secondary cursor-not-allowed",
						)}
					>
						<Send className="w-5 h-5 ml-0.5" />
					</button>
				</div>
			}
		/>
	);
}
