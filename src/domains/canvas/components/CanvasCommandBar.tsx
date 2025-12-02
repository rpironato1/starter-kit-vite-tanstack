import { motion } from "framer-motion";
import { LayoutGrid, Send, Sparkles } from "lucide-react";
import type { RefObject } from "react";
import { CommandBarBase } from "@/shared/components";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { cn } from "@/lib/utils";

export type CanvasReasoningLevel = "soft" | "medium" | "max" | "off";

interface CanvasCommandBarProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	isLoading: boolean;
	reasoningLevel: CanvasReasoningLevel;
	onReasoningChange: (level: CanvasReasoningLevel) => void;
	onToggleWorkspace: () => void;
	isWorkspaceOpen: boolean;
	onSpark?: () => void;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
	placeholder?: string;
}

export function CanvasCommandBar({
	value,
	onChange,
	onSend,
	isLoading,
	reasoningLevel,
	onReasoningChange,
	onToggleWorkspace,
	isWorkspaceOpen,
	onSpark,
	inputRef,
	placeholder = "Canvas: desenvolva suas ideias...",
}: CanvasCommandBarProps) {
	const hasContent = value.trim().length > 0;
	const canSend = hasContent && !isLoading;

	return (
		<CommandBarBase
			leadingSlot={
				<>
					<button
						type="button"
						onClick={onToggleWorkspace}
						className={cn(
							"rounded-full p-3 text-text-secondary transition-all duration-300",
							isWorkspaceOpen
								? "bg-bg-hover text-text-primary"
								: "hover:bg-bg-hover hover:text-text-primary",
						)}
						title="Alternar workspace"
					>
						<LayoutGrid className="h-5 w-5" />
					</button>
					<span className="hidden h-5 w-px bg-border-default md:block" />
					<ReasoningSelector
						value={reasoningLevel}
						onChange={onReasoningChange}
						className="text-text-secondary"
					/>
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
						onClick={() => onSpark?.()}
						disabled={!hasContent || isLoading}
						className="rounded-full p-3 text-accent-textHighlight transition-colors hover:bg-bg-hover disabled:cursor-not-allowed disabled:opacity-50"
						title="Automatizar com assistente"
					>
						<Sparkles className="h-5 w-5" />
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
						aria-label="Gerar artefato"
					>
						<Send className="h-5 w-5" />
					</motion.button>
				</>
			}
			footerSlot={
				<span className="text-[11px] uppercase tracking-widest">
					Workspace {isWorkspaceOpen ? "aberto" : "fechado"}
				</span>
			}
		/>
	);
}

export default CanvasCommandBar;
