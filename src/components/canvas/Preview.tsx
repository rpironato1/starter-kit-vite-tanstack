import { Eye } from "lucide-react";

interface PreviewProps {
	content: string;
	refreshKey: number;
}

export function Preview({ content, refreshKey }: PreviewProps) {
	// Check if content looks like HTML
	const isHtmlContent =
		content.trim().startsWith("<") || content.includes("<!DOCTYPE");

	if (!isHtmlContent) {
		return (
			<div className="flex items-center justify-center h-full text-text-secondary flex-col gap-2">
				<Eye className="w-8 h-8 opacity-50" />
				<span className="text-sm">Preview not available for this format.</span>
			</div>
		);
	}

	return (
		<div className="w-full h-full bg-white relative">
			<iframe
				key={refreshKey}
				srcDoc={content}
				title="Preview"
				sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
				className="w-full h-full border-none"
			/>
		</div>
	);
}
