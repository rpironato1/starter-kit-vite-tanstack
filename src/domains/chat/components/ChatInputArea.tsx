import {
	Camera,
	FileText,
	Image as ImageIcon,
	Mic,
	Plus,
	Send,
	X,
} from "lucide-react";
import { type RefObject, useState } from "react";
import { PrototypeInputContainer } from "@/components/layout/PrototypeInputContainer";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { cn } from "@/lib/utils";

type ReasoningLevel = "soft" | "medium" | "max" | "off";

interface ChatInputAreaProps {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isLoading: boolean;
	reasoningLevel: ReasoningLevel;
	onReasoningChange: (level: ReasoningLevel) => void;
	onAttachClick?: ((type: "camera" | "photo" | "file") => void) | undefined;
	onMicClick?: (() => void) | undefined;
	onRemoveImage?: (() => void) | undefined;
	attachedImage?: string | null;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
}

interface AttachPanelProps {
	onAttachClick?: ((type: "camera" | "photo" | "file") => void) | undefined;
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
				{/* Camera */}
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
				{/* Photos */}
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
				{/* Files */}
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

export function ChatInputArea({
	value,
	onChange,
	onSend,
	isLoading,
	reasoningLevel,
	onReasoningChange,
	onAttachClick,
	onMicClick,
	onRemoveImage,
	attachedImage,
	inputRef,
}: ChatInputAreaProps) {
	const [attachMenuOpen, setAttachMenuOpen] = useState(false);
	const { t } = useTranslation();

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	// Determine if "Active" state (Green button)
	const hasContent = value.trim().length > 0 || !!attachedImage;
	const canSend = hasContent && !isLoading;

	// Image Preview Component
	const TopContent = attachedImage ? (
		<div className="flex items-center gap-2">
			<div className="relative group">
				<img
					src={attachedImage}
					alt="Preview"
					className="h-16 w-16 object-cover rounded-lg border border-border-default"
				/>
				<button
					type="button"
					onClick={onRemoveImage}
					className="absolute -top-2 -right-2 bg-bg-surface rounded-full p-1 text-text-primary hover:bg-red-500 hover:text-white transition-colors shadow-md border border-border-default"
				>
					<X className="w-3 h-3" />
				</button>
			</div>
			<span className="text-xs text-text-secondary">{t.input.attached}</span>
		</div>
	) : null;

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
				topContent={TopContent}
				leftActions={
					<>
						{/* Plus Button */}
						<button
							type="button"
							onClick={() => setAttachMenuOpen(!attachMenuOpen)}
							className={cn(
								"p-3 rounded-full hover:bg-bg-hover text-text-secondary transition-colors shrink-0",
								attachMenuOpen && "rotate-45 bg-bg-hover text-text-primary",
							)}
						>
							<Plus className="w-6 h-6 transition-transform" />
						</button>

						{/* Separator */}
						<div className="h-6 w-px bg-border-default mx-1" />

						{/* Reasoning Button (Brain) */}
						<ReasoningSelector
							value={reasoningLevel}
							onChange={onReasoningChange}
							variant="dropdown"
						/>
					</>
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
							"px-3 text-lg h-12 min-w-0 resize-none py-2.5", // Centered text
						)}
					/>
				}
				rightActions={
					<>
						{/* Mic Button */}
						<button
							type="button"
							onClick={onMicClick}
							className="p-3 rounded-full hover:bg-bg-hover text-text-secondary transition-colors"
						>
							<Mic className="w-5 h-5" />
						</button>

						{/* Send Button */}
						<button
							type="button"
							onClick={onSend}
							disabled={!canSend}
							className={cn(
								"p-3 rounded-full transition-colors",
								canSend
									? "bg-accent-primary text-white hover:bg-accent-hover shadow-lg shadow-green-900/20"
									: "bg-transparent text-text-secondary hover:bg-bg-hover",
							)}
						>
							<Send className="w-5 h-5 ml-0.5" />
						</button>
					</>
				}
			/>
		</>
	);
}
