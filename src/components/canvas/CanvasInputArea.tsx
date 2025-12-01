import {
	Camera,
	FileText,
	Image as ImageIcon,
	Plus,
	Send,
	Sparkles,
} from "lucide-react";
import { type RefObject, useState } from "react";
import { PrototypeInputContainer } from "@/components/layout/PrototypeInputContainer";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

type ReasoningLevel = "soft" | "medium" | "max" | "off";

interface CanvasInputAreaProps {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isLoading: boolean;
	reasoningLevel: ReasoningLevel;
	onReasoningChange: (level: ReasoningLevel) => void;
	onAttachClick?: (type: "camera" | "photo" | "file") => void;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
}

interface AttachPanelProps {
	onAttachClick?: (type: "camera" | "photo" | "file") => void;
	onClose: () => void;
	labels: { camera: string; photos: string; files: string };
}

const AttachPanel = ({ onAttachClick, onClose, labels }: AttachPanelProps) => (
	<div className="absolute bottom-24 left-0 w-full z-30">
		<div
			className={cn(
				"w-[90%] max-w-sm mx-auto bg-bg-modal rounded-2xl p-4",
				"border border-border-default shadow-2xl",
				"animate-in slide-in-from-bottom-5",
			)}
		>
			<div className="grid grid-cols-3 gap-4">
				<button
					type="button"
					onClick={() => {
						onAttachClick?.("camera");
						onClose();
					}}
					className="flex flex-col items-center gap-2 p-4 bg-bg-surface rounded-2xl active:scale-95 transition-transform hover:bg-bg-hover"
				>
					<Camera className="w-6 h-6 text-text-secondary" />
					<span className="text-xs text-text-secondary">{labels.camera}</span>
				</button>
				<button
					type="button"
					onClick={() => {
						onAttachClick?.("photo");
						onClose();
					}}
					className="flex flex-col items-center gap-2 p-4 bg-bg-surface rounded-2xl active:scale-95 transition-transform hover:bg-bg-hover"
				>
					<ImageIcon className="w-6 h-6 text-text-secondary" />
					<span className="text-xs text-text-secondary">{labels.photos}</span>
				</button>
				<button
					type="button"
					onClick={() => {
						onAttachClick?.("file");
						onClose();
					}}
					className="flex flex-col items-center gap-2 p-4 bg-bg-surface rounded-2xl active:scale-95 transition-transform hover:bg-bg-hover"
				>
					<FileText className="w-6 h-6 text-text-secondary" />
					<span className="text-xs text-text-secondary">{labels.files}</span>
				</button>
			</div>
		</div>
	</div>
);

export function CanvasInputArea({
	value,
	onChange,
	onSend,
	isLoading,
	reasoningLevel,
	onReasoningChange,
	onAttachClick,
	inputRef,
}: CanvasInputAreaProps) {
	const [attachMenuOpen, setAttachMenuOpen] = useState(false);
	const { t } = useTranslation();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	const hasContent = value.trim().length > 0;
	const canSend = hasContent && !isLoading;

	return (
		<>
			{attachMenuOpen && (
				<AttachPanel
					onAttachClick={onAttachClick}
					onClose={() => setAttachMenuOpen(false)}
					labels={{
						camera: t.input.camera,
						photos: t.input.photos,
						files: t.input.files,
					}}
				/>
			)}
			<PrototypeInputContainer
				leftActions={
					<div className="relative flex items-center gap-1 pl-1">
						<button
							type="button"
							onClick={() => setAttachMenuOpen(!attachMenuOpen)}
							className={cn(
								"p-3 rounded-full hover:bg-bg-hover text-text-secondary transition-all duration-300",
								attachMenuOpen && "bg-bg-hover text-text-primary rotate-45",
							)}
						>
							<Plus className="w-6 h-6" />
						</button>

						<div className="h-6 w-px bg-border-default mx-1" />

						<ReasoningSelector
							value={reasoningLevel}
							onChange={onReasoningChange}
							variant="dropdown"
						/>
					</div>
				}
				input={
					<textarea
						ref={inputRef}
						value={value}
						onChange={(e) => onChange(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Canvas: Desenvolva suas ideias..."
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
						{value.length > 3 && (
							<button
								type="button"
								className="p-2.5 rounded-full hover:bg-bg-hover text-accent-textHighlight transition-colors animate-in fade-in zoom-in"
							>
								<Sparkles className="w-5 h-5" />
							</button>
						)}

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
		</>
	);
}