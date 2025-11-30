import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, ChevronDown, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ReasoningLevel = "off" | "soft" | "medium" | "max";

interface ReasoningSelectorProps {
	value: ReasoningLevel;
	onChange: (level: ReasoningLevel) => void;
	variant?: "dropdown" | "inline";
	className?: string;
}

const REASONING_LEVELS = {
	off: {
		label: "Desativado",
		description: "Respostas rápidas",
		color: "text-[var(--text-secondary)]",
		icon: Zap,
	},
	soft: {
		label: "Soft",
		description: "Análise básica",
		color: "text-blue-400",
		icon: Brain,
	},
	medium: {
		label: "Médio",
		description: "Análise detalhada",
		color: "text-amber-400",
		icon: Brain,
	},
	max: {
		label: "Max",
		description: "Análise profunda",
		color: "text-red-400",
		icon: Sparkles,
	},
} as const;

const LEVELS: ReasoningLevel[] = ["off", "soft", "medium", "max"];

const springConfig = { type: "spring" as const, stiffness: 350, damping: 25, mass: 0.8 };

export function ReasoningSelector({
	value,
	onChange,
	variant = "dropdown",
	className,
}: ReasoningSelectorProps) {
	if (variant === "inline") {
		return <InlineSelector value={value} onChange={onChange} className={className} />;
	}
	return <DropdownSelector value={value} onChange={onChange} className={className} />;
}

function InlineSelector({
	value,
	onChange,
	className,
}: Omit<ReasoningSelectorProps, "variant">) {
	return (
		<div className={cn("flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)]", className)}>
			{LEVELS.map((level) => {
				const config = REASONING_LEVELS[level];
				const isSelected = level === value;
				return (
					<button
						key={level}
						type="button"
						onClick={() => onChange(level)}
						className={cn(
							"relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
							isSelected ? config.color : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
						)}
					>
						{isSelected && (
							<motion.div
								layoutId="reasoning-pill"
								className="absolute inset-0 bg-[var(--bg-hover)] rounded-md"
								transition={springConfig}
							/>
						)}
						<span className="relative z-10">{config.label}</span>
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
	const selected = REASONING_LEVELS[value];
	const Icon = selected.icon;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
					"flex items-center gap-2 px-3 py-2 rounded-lg",
					"text-sm font-medium transition-colors",
					"bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]",
					"border border-zinc-700/50",
				)}
			>
				<Icon className={cn("size-4", selected.color)} />
				<span className={selected.color}>{selected.label}</span>
				<motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={springConfig}>
					<ChevronDown className="size-4 text-[var(--text-secondary)]" />
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -8, scale: 0.95 }}
						transition={springConfig}
						className={cn(
							"absolute top-full left-0 mt-2 z-50",
							"min-w-[200px] p-1 rounded-xl",
							"bg-[var(--bg-surface)] border border-zinc-700/50",
							"shadow-lg shadow-black/20",
						)}
					>
						{LEVELS.map((level) => {
							const config = REASONING_LEVELS[level];
							const LevelIcon = config.icon;
							const isSelected = level === value;
							return (
								<button
									key={level}
									type="button"
									onClick={() => { onChange(level); setIsOpen(false); }}
									className={cn(
										"w-full flex items-center gap-3 px-3 py-2 rounded-lg",
										"text-left transition-colors hover:bg-[var(--bg-hover)]",
									)}
								>
									<LevelIcon className={cn("size-4", config.color)} />
									<div className="flex-1 min-w-0">
										<p className={cn("text-sm font-medium", isSelected ? config.color : "text-[var(--text-primary)]")}>
											{config.label}
										</p>
										<p className="text-xs text-[var(--text-secondary)]">{config.description}</p>
									</div>
									{isSelected && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											className={cn("size-2 rounded-full", config.color.replace("text-", "bg-"))}
										/>
									)}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
