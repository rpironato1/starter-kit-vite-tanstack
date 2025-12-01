import { motion } from "framer-motion";
import { FileText, Plus, Send } from "lucide-react";
import type { RefObject } from "react";
import type { UploadedDocument } from "@/components/doc/ContextDrawer";
import { CommandBarBase } from "@/components/layout/CommandBarBase";
import { cn } from "@/lib/utils";

interface DocCommandBarProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	isLoading: boolean;
	onUploadClick: () => void;
	attachedFiles: UploadedDocument[];
	onRemoveFile: (id: string) => void;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
	placeholder?: string;
}

export function DocCommandBar({
	value,
	onChange,
	onSend,
	isLoading,
	onUploadClick,
	attachedFiles,
	onRemoveFile,
	inputRef,
	placeholder = "Pergunte sobre seus documentos...",
}: DocCommandBarProps) {
	const canSend =
		(value.trim().length > 0 || attachedFiles.length > 0) && !isLoading;

	const attachmentPreview =
		attachedFiles.length > 0 ? (
			<div className="px-3 pt-2 pb-1">
				<div className="flex flex-wrap gap-2">
					{attachedFiles.map((file) => (
						<div
							key={file.id}
							className="group flex items-center gap-2 rounded-xl border border-border-default bg-bg-modal/70 px-3 py-2 text-sm text-text-primary"
						>
							<FileText className="h-4 w-4 text-blue-400" />
							<span className="max-w-[150px] truncate">{file.name}</span>
							<button
								type="button"
								onClick={() => onRemoveFile(file.id)}
								className="rounded-full bg-bg-hover p-1 text-text-secondary transition-colors hover:text-red-400"
								aria-label={`Remover ${file.name}`}
							>
								<Plus className="h-3 w-3 rotate-45" />
							</button>
						</div>
					))}
				</div>
			</div>
		) : null;

	return (
		<CommandBarBase attachmentPreview={attachmentPreview}>
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onUploadClick}
					className="rounded-full p-3 text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
					aria-label="Adicionar arquivos"
				>
					<Plus className="h-6 w-6" />
				</button>

				<div className="mx-0.5 h-5 w-px bg-border-default" />

				<textarea
					ref={inputRef}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder={placeholder}
					disabled={isLoading}
					rows={1}
					className="flex-1 resize-none border-none bg-transparent px-3 py-3 text-base text-text-primary outline-none placeholder:text-text-secondary"
				/>

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
					aria-label="Enviar pergunta"
				>
					<Send className="h-5 w-5" />
				</motion.button>
			</div>
		</CommandBarBase>
	);
}

export default DocCommandBar;
