import { Plus, Send } from "lucide-react";
import type { RefObject } from "react";
import { PrototypeInputContainer } from "@/components/layout/PrototypeInputContainer";
import { ReasoningSelector } from "@/components/selectors/ReasoningSelector";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

type ReasoningLevel = "soft" | "medium" | "max" | "off";

interface DocInputAreaProps {
	value: string;
	onChange: (val: string) => void;
	onSend: () => void;
	isLoading: boolean;
	reasoningLevel: ReasoningLevel;
	onReasoningChange: (level: ReasoningLevel) => void;
	onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	inputRef?: RefObject<HTMLTextAreaElement | null>;
}

export function DocInputArea({
	value,
	onChange,
	onSend,
	isLoading,
	reasoningLevel,
	onReasoningChange,
	onFileSelect,
	inputRef,
}: DocInputAreaProps) {
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
		<PrototypeInputContainer
			leftActions={
				<div className="relative flex items-center gap-1 pl-1">
					{/* Direct File Upload (No Menu) */}
					<label className="p-3 rounded-full hover:bg-bg-hover text-text-secondary transition-all duration-300 cursor-pointer">
						<Plus className="w-6 h-6" />
						<input
							type="file"
							multiple
							className="hidden"
							onChange={onFileSelect}
						/>
					</label>

					{/* Separator */}
					<div className="h-6 w-px bg-border-default mx-1" />

					{/* Reasoning */}
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
				<button
					type="button"
					onClick={onSend}
					disabled={!canSend}
					className={cn(
						"p-3 rounded-full transition-all duration-200 shadow-lg mr-1",
						canSend
							? "bg-accent-primary text-white hover:scale-105 shadow-green-900/20"
							: "bg-bg-hover text-text-secondary cursor-not-allowed",
					)}
				>
					<Send className="w-5 h-5 ml-0.5" />
				</button>
			}
		/>
	);
}
