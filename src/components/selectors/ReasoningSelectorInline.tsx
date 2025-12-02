import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";
import {
	getReasoningLabel,
	REASONING_LEVELS,
	REASONING_LEVELS_CONFIG,
	SPRING_CONFIG,
	type ReasoningLevel,
} from "./reasoningConfig";

interface ReasoningSelectorInlineProps {
	value: ReasoningLevel;
	onChange: (level: ReasoningLevel) => void;
	className?: string | undefined;
}

export function ReasoningSelectorInline({
	value,
	onChange,
	className,
}: ReasoningSelectorInlineProps) {
	const { t } = useTranslation();

	return (
		<div
			className={cn(
				"flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)]",
				className,
			)}
		>
			{REASONING_LEVELS.map((level) => {
				const config = REASONING_LEVELS_CONFIG[level];
				const isSelected = level === value;
				return (
					<button
						key={level}
						type="button"
						onClick={() => onChange(level)}
						className={cn(
							"relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
							isSelected
								? config.color
								: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
						)}
					>
						{isSelected && (
							<motion.div
								layoutId="reasoning-pill"
								className="absolute inset-0 bg-[var(--bg-hover)] rounded-md"
								transition={SPRING_CONFIG}
							/>
						)}
						<span className="relative z-10">
							{getReasoningLabel(t, level)}
						</span>
					</button>
				);
			})}
		</div>
	);
}
