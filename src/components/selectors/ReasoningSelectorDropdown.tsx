import { AnimatePresence, motion } from "framer-motion";
import { Brain, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";
import {
	getReasoningDescription,
	getReasoningLabel,
	REASONING_LEVELS,
	REASONING_LEVELS_CONFIG,
	REASONING_LEVEL_BADGES,
	SPRING_CONFIG,
	type ReasoningLevel,
} from "./reasoningConfig";

interface ReasoningSelectorDropdownProps {
	value: ReasoningLevel;
	onChange: (level: ReasoningLevel) => void;
	className?: string | undefined;
}

export function ReasoningSelectorDropdown({
	value,
	onChange,
	className,
}: ReasoningSelectorDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const hasEnhancedReasoning = value !== "soft";

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setIsOpen(false);
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div ref={containerRef} className={cn("relative", className)}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"relative rounded-full p-2.5 transition-colors",
					"bg-bg-surface/70 hover:bg-bg-hover",
				)}
				title={`${t.reasoning.title}: ${getReasoningLabel(t, value)}`}
				aria-expanded={isOpen}
			>
				<Brain
					className={cn(
						"size-5 transition-colors",
						hasEnhancedReasoning
							? "text-accent-textHighlight"
							: "text-text-secondary",
					)}
				/>
				{hasEnhancedReasoning && (
					<span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-textHighlight shadow-[0_0_8px_rgba(238,207,161,0.6)] ring-2 ring-bg-surface" />
				)}
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="absolute bottom-12 right-0 w-[280px] origin-bottom-right rounded-2xl border border-border-default bg-bg-modal shadow-2xl"
					>
						<div className="p-3 border-b border-border-default">
							<p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
								{t.reasoning.title}
							</p>
							<p className="text-sm text-text-primary mt-1 font-medium">
								{getReasoningLabel(t, value)}
							</p>
						</div>
						<div className="p-2 space-y-1">
							{REASONING_LEVELS.map((level, index) => {
								const config = REASONING_LEVELS_CONFIG[level];
								const Icon = config.icon;
								const isSelected = level === value;
								return (
									<button
										key={level}
										type="button"
										onClick={() => {
											onChange(level);
											setIsOpen(false);
										}}
										className={cn(
											"w-full flex items-center gap-3 rounded-xl p-3 text-left transition-all duration-200",
											isSelected
												? "bg-accent-primary/15 ring-1 ring-accent-primary"
												: "hover:bg-bg-hover",
										)}
									>
										<Icon
											className={cn(
												"h-10 w-10 p-2 rounded-xl border border-border-default",
												config.bgColor,
												config.color,
												isSelected && "border-accent-primary/40",
											)}
										/>
										<div className="flex-1 text-left">
											<div className="flex items-center gap-2">
												<p className="text-sm font-semibold text-text-primary">
													{getReasoningLabel(t, level)}
												</p>
												{isSelected && (
													<motion.div
														layoutId="selected-level"
														transition={SPRING_CONFIG}
														className="flex items-center gap-1 text-[11px] font-medium text-accent-primary"
													>
														<Check className="h-3.5 w-3.5" />
														<span>{t.reasoning.title}</span>
													</motion.div>
												)}
											</div>
											<p className="text-xs text-text-secondary mt-0.5">
												{getReasoningDescription(t, level)}
											</p>
										</div>
										<div className="flex flex-col items-end justify-center">
											<span className="text-[11px] font-semibold text-text-secondary uppercase tracking-[0.2em]">
												{REASONING_LEVEL_BADGES[index] ?? "L"}
											</span>
											<div
												className={cn(
													"mt-1 h-1.5 w-12 rounded-full bg-bg-hover overflow-hidden",
													config.bgColor,
												)}
											>
												<motion.div
													layoutId={`reasoning-bar-${index}`}
													transition={SPRING_CONFIG}
													className={cn(
														"h-full rounded-full",
														config.color,
														"bg-current",
														level === "off" && "bg-text-secondary",
													)}
													style={{ width: `${(index + 1) * 25}%` }}
												/>
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
