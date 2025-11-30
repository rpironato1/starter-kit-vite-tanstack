import { Code, ChevronRight } from "lucide-react";
import type { CanvasArtifact } from "./CanvasWorkspace";

interface ArtifactCardProps {
	artifact: CanvasArtifact;
	onClick: () => void;
}

export function ArtifactCard({ artifact, onClick }: ArtifactCardProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="mt-2 flex items-center gap-3 bg-bg-surface border border-border hover:border-purple-500/50 p-3 rounded-xl transition-all group w-full text-left shadow-sm"
		>
			<div className="p-2 bg-bg-hover rounded-lg group-hover:bg-bg-modal transition-colors">
				<Code className="w-5 h-5 text-purple-400" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-text-primary">
					View Generated Code
				</p>
				<p className="text-xs text-text-secondary truncate">
					{artifact.title} • {artifact.language}
				</p>
			</div>
			<ChevronRight className="w-4 h-4 text-text-secondary -rotate-0 group-hover:translate-x-0.5 transition-transform" />
		</button>
	);
}
