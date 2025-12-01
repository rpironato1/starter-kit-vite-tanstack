import { AnimatePresence, motion } from "framer-motion";
import { Brain, Check, CircleOff, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

type ReasoningLevel = "off" | "soft" | "medium" | "max";

interface ReasoningSelectorProps {
	value: ReasoningLevel;
	onChange: (level: ReasoningLevel) => void;
	variant?: "dropdown" | "inline";
	className?: string;
}

interface ReasoningLevelConfig {
	labelKey: ReasoningLevel;
	descriptionKey: ReasoningLevel;
	color: string;
	bgColor: string;
	icon: ComponentType<{ className?: string }>;
}

const REASONING_LEVELS_CONFIG: Record<ReasoningLevel, ReasoningLevelConfig> = {
	off: {
		labelKey: "off",
		descriptionKey: "off",
		color: "text-text-secondary",
		bgColor: "bg-text-secondary/10",
		icon: CircleOff,
	},
	soft: {
		labelKey: "soft",
		descriptionKey: "soft",
		color: "text-green-400",
		bgColor: "bg-accent-primary/10",
		icon: Zap,
	},
	medium: {
		labelKey: "medium",
		descriptionKey: "medium",
		color: "text-yellow-400",
		bgColor: "bg-yellow-500/10",
		icon: Brain,
	},
	max: {
		labelKey: "max",
		descriptionKey: "max",
		color: "text-[#15803d]",
		bgColor: "bg-[#15803d]/10",
		icon: Sparkles,
	},
};

const LEVELS: ReasoningLevel[] = ["soft", "medium", "max", "off"];

const springConfig = {
	type: "spring" as const,
	stiffness: 400,
	damping: 30,
};

export function ReasoningSelector({
	value,
	onChange,
	variant = "dropdown",
	className,
}: ReasoningSelectorProps) {
	if (variant === "inline") {
		return (
			<InlineSelector value={value} onChange={onChange} className={className} />
		);
	}
	return (
		<DropdownSelector value={value} onChange={onChange} className={className} />
	);
}

function InlineSelector({
	value,
	onChange,
	className,
}: Omit<ReasoningSelectorProps, "variant">) {
	const { t } = useTranslation();

	function getLabel(level: ReasoningLevel): string {
		if (level === "off") return t.reasoning.off;
		if (level === "soft") return "Soft";
		if (level === "medium") return "Medium";
		return "Max";
	}

	return (
		<div
			className={cn(
				"flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)]",
				className,
			)}
		>
			{LEVELS.map((level) => {
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
								transition={springConfig}
							/>
						)}
						<span className="relative z-10">{getLabel(level)}</span>
					</button>
				);
			})}
		</div>
	);
}

function DropdownSelector({
	value,
	onChange,
	className,
}: Omit<ReasoningSelectorProps, "variant">) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const { t } = useTranslation();
	const selected = REASONING_LEVELS_CONFIG[value];
	const Icon = selected.icon;

	function getLabel(level: ReasoningLevel): string {
		if (level === "off") return t.reasoning.off;
		if (level === "soft") return "Soft";
		if (level === "medium") return "Medium";
		return "Max";
	}

	function getDescription(level: ReasoningLevel): string {
		if (level === "off") return t.reasoning.offDescription;
		return t.reasoning[level];
	}

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
		};${t.reasoning.title}: ${getLabel(value)
	}, [isOpen]);

	return (
		<div ref={containerRef} className={cn("relative", className)}>
			{/* Trigger Button */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"p-2.5 rounded-full transition-colors group",
					"hover:bg-bg-hover",
				)}
				title={`Raciocínio: ${selected.label}`}
			>
				<Icon className={cn("size-5 scale-x-[-1]", selected.color)} />
			</button>

			{/* Popup Menu - Opens Upward */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Backdrop */}
						<button
							type="button"
							aria-label="Fechar menu"
							className="fixed inset-0 z-20 cursor-default"
							onClick={() => setIsOpen(false)}
						/>

						{/* Dropdown Panel */}
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 10 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 10 }}
							transition={springConfig}
							className={cn(
								"absolute bottom-full mb-2 left-0 z-30",
								"w-[240px] p-1.5 rounded-2xl",
								"bg-bg-modal/95 backdrop-blur-xl",
								"border border-border-default",
								"shadow-xl shadow-black/20",
							)}
						>
							{/* Header */}
							<div className="px-3 py-2 flex items-center gap-2">
								<Brain className="size-4 text-text-secondary scale-x-[-1]" />
								<span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
									{t.reasoning.title}
								</span>
							</div>

							{/* Options */}
							<div className="space-y-0.5">
								{LEVELS.map((level) => {
									const config = REASONING_LEVELS_CONFIG[level];
									const LevelIcon = config.icon;
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
												"w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl",
												"text-left transition-all duration-200",
												isSelected
													? "bg-[#15803d]/15 ring-1 ring-accent-primary"
													: "hover:bg-bg-hover",
											)}
										>
											{/* Icon Container */}
											<div
												className={cn(
													"p-1.5 rounded-lg",
													isSelected ? "bg-accent-primary/20" : config.bgColor,
												)}
											>
												<LevelIcon
													className={cn("size-4 scale-x-[-1]", config.color)}
												/>
											</div>

											{/* Text Content */}
											<div className="flex-1 min-w-0">
												<p
													className={cn(
														"text-sm font-medium",
														isSelected
															? "text-text-primary"
															: "text-text-secondary",
													)}
												>
													{getLabel(level)}
												</p>
												<p className="text-[10px] text-text-secondary leading-tight opacity-70">
													{getDescription(level)}
												</p>
											</div>

											{/* Check Indicator */}
											{isSelected && (
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													transition={springConfig}
												>
													<Check className="size-4 text-accent-primary" />
												</motion.div>
											)}
										</button>
									);
								})}
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
