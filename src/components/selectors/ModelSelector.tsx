import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const MODELS = [
	{ id: "claude-sonnet-4", label: "Claude Sonnet 4" },
	{ id: "claude-opus-4", label: "Claude Opus 4" },
	{ id: "gpt-4-turbo", label: "GPT-4 Turbo" },
	{ id: "gpt-4o", label: "GPT-4o" },
	{ id: "gemini-pro", label: "Gemini Pro" },
] as const;

type ModelId = (typeof MODELS)[number]["id"];

interface ModelSelectorProps {
	value: string;
	onChange: (model: string) => void;
	className?: string;
}

const springConfig = { type: "spring" as const, stiffness: 350, damping: 25, mass: 0.8 };

export function ModelSelector({ value, onChange, className }: ModelSelectorProps) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const selectedModel = MODELS.find((m) => m.id === value) ?? MODELS[0];

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setIsOpen(false);
			}
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

	function handleSelect(modelId: ModelId) {
		onChange(modelId);
		setIsOpen(false);
	}

	return (
		<div ref={containerRef} className={cn("relative", className)}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex items-center gap-2 px-3 py-2 rounded-lg",
					"text-sm font-medium transition-colors",
					"bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]",
					"text-[var(--text-primary)]",
					"border border-zinc-700/50 dark:border-zinc-700/50",
				)}
			>
				<span>{selectedModel.label}</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={springConfig}
				>
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
							"min-w-[180px] p-1 rounded-xl",
							"bg-[var(--bg-surface)] border border-zinc-700/50",
							"shadow-lg shadow-black/20",
						)}
					>
						{MODELS.map((model) => {
							const isSelected = model.id === value;
							return (
								<button
									key={model.id}
									type="button"
									onClick={() => handleSelect(model.id)}
									className={cn(
										"w-full flex items-center gap-2 px-3 py-2 rounded-lg",
										"text-sm text-left transition-colors",
										"hover:bg-[var(--bg-hover)]",
										isSelected
											? "text-[var(--accent-primary)]"
											: "text-[var(--text-primary)]",
									)}
								>
									<span className="size-4 flex items-center justify-center">
										<AnimatePresence mode="wait">
											{isSelected && (
												<motion.div
													initial={{ scale: 0, opacity: 0 }}
													animate={{ scale: 1, opacity: 1 }}
													exit={{ scale: 0, opacity: 0 }}
													transition={springConfig}
												>
													<Check className="size-4" />
												</motion.div>
											)}
										</AnimatePresence>
									</span>
									<span>{model.label}</span>
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
