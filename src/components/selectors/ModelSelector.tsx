import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { cn } from "@/lib/utils";

const DEFAULT_MODELS = [
	{
		id: "zane-mini",
		name: "Zane Mini 1.0",
		description: "Pesquisa (Google Grounding) e tarefas rápidas",
	},
	{
		id: "zane-solo",
		name: "Zane Solo 1.0",
		description: "Respostas ultrarrápidas (Lite)",
	},
	{
		id: "zane-pro",
		name: "Zane Pro 1.0",
		description: "Raciocínio complexo e tarefas longas",
	},
	{
		id: "zane-ultra",
		name: "Zane Ultra 1.0",
		description: "Geração de Imagem (1K/2K/4K) e edições",
		highlightClass: "text-amber-400 font-semibold",
	},
];

interface Model {
	id: string;
	name: string;
	description: string;
	highlightClass?: string;
}

interface ModelSelectorProps {
	isOpen: boolean;
	onClose: () => void;
	currentModel: string;
	onSelect: (model: string) => void;
	models?: Model[];
	className?: string;
}

const springConfig = {
	type: "spring" as const,
	stiffness: 350,
	damping: 25,
	mass: 0.8,
};

export function ModelSelector({
	isOpen,
	onClose,
	currentModel,
	onSelect,
	models,
	className,
}: ModelSelectorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const availableModels = models ?? DEFAULT_MODELS;

	useEffect(() => {
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				onClose();
			}
		}

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen, onClose]);

	function handleSelect(modelId: string) {
		onSelect(modelId);
		onClose();
	}

	return (
		<>
			<Backdrop isOpen={isOpen} onClick={onClose} />
			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={containerRef}
						initial={{ opacity: 0, scale: 0.95, y: -20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -20 }}
						transition={springConfig}
						className={cn(
							"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
							"w-[90%] max-w-md p-4 rounded-2xl",
							"bg-bg-surface border border-border-default",
							"shadow-2xl",
							className,
						)}
					>
						{/* Header */}
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-lg font-semibold text-text-primary">
								Select Model
							</h2>
							<button
								type="button"
								onClick={onClose}
								className="p-2 rounded-full hover:bg-bg-hover text-text-secondary transition-colors"
								aria-label="Close"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Models List */}
						<div className="space-y-2">
							{availableModels.map((model) => {
								const isSelected =
									model.id === currentModel || model.name === currentModel;
								return (
									<button
										key={model.id}
										type="button"
										onClick={() => handleSelect(model.name)}
										className={cn(
											"w-full flex items-center gap-3 p-3 rounded-xl",
											"text-left transition-colors",
											"hover:bg-bg-hover",
											isSelected
												? "bg-accent-primary/10 border border-accent-primary/30"
												: "border border-transparent",
										)}
									>
										<span className="w-5 h-5 flex items-center justify-center">
											<AnimatePresence mode="wait">
												{isSelected && (
													<motion.div
														initial={{ scale: 0, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														exit={{ scale: 0, opacity: 0 }}
														transition={springConfig}
													>
														<Check className="w-5 h-5 text-accent-primary" />
													</motion.div>
												)}
											</AnimatePresence>
										</span>
										<div className="flex-1">
											<div
												className={cn(
													"font-medium",
													model.highlightClass ??
														(isSelected
															? "text-accent-primary"
															: "text-text-primary"),
													isSelected && model.highlightClass
														? "drop-shadow-[0_0_8px_rgba(36,107,49,0.35)]"
														: undefined,
												)}
											>
												{model.name}
											</div>
											<div className="text-sm text-text-secondary">
												{model.description}
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
