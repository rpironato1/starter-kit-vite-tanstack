import { Camera, FolderOpen, Grid3x3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachPopoverProps {
	onAttachClick?: (type: "camera" | "photo" | "gallery") => void;
	onClose: () => void;
	labels: { camera: string; photos: string; gallery: string };
}

export function PhotoAttachPopover({
	onAttachClick,
	onClose,
	labels,
}: AttachPopoverProps) {
	return (
		<div
			className={cn(
				"absolute bottom-full left-0 mb-4",
				"bg-bg-modal border border-border-default p-2 rounded-2xl shadow-xl",
				"min-w-[160px] flex flex-col gap-1 z-50",
				"animate-in slide-in-from-bottom-2",
			)}
		>
			<button
				type="button"
				onClick={() => {
					onAttachClick?.("camera");
					onClose();
				}}
				className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-hover cursor-pointer transition-colors text-text-secondary hover:text-text-primary text-left"
			>
				<Camera className="w-4 h-4" />
				<span className="text-sm font-medium">{labels.camera}</span>
			</button>

		<button
			type="button"
			onClick={() => {
				onAttachClick?.("photo");
				onClose();
			}}
			className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-hover cursor-pointer transition-colors text-text-secondary hover:text-text-primary text-left"
		>
			<FolderOpen className="w-4 h-4" />
			<span className="text-sm font-medium">{labels.photos}</span>
		</button>

		<button
			type="button"
			onClick={() => {
				onAttachClick?.("gallery");
				onClose();
			}}
			className="flex items-center gap-3 p-3 rounded-xl hover:bg-bg-hover cursor-pointer transition-colors text-text-secondary hover:text-text-primary text-left"
		>
			<Grid3x3 className="w-4 h-4" />
			<span className="text-sm font-medium">{labels.gallery}</span>
		</button>
	</div>
);
}
