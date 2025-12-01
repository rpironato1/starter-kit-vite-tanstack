import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

const DEFAULT_MODELS = [
	{
		id: "zane-mini",
		name: "Zane Mini 1.0",
		descriptionKey: "mini" as const,
	},
	{
		id: "zane-solo",
		name: "Zane Solo 1.0",
		descriptionKey: "solo" as const,
	},
	{
		id: "zane-pro",
		name: "Zane Pro 1.0",
		descriptionKey: "pro" as const,
	},
	{
		id: "zane-ultra",
		name: "Zane Ultra 1.0",
		descriptionKey: "ultra" as const,
		highlightClass: "text-amber-400 font-semibold",
	},
];

type ModelDescriptionKey = "mini" | "solo" | "pro" | "ultra";

interface Model {
	id: string;
	name: string;
	descriptionKey?: ModelDescriptionKey;
	description?: string;
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

// Animação do dropdown menu (spring config do protótipo)
const dropdownSpringConfig = {
	type: "spring" as const,
	stiffness: 350,
	damping: 25,
	mass: 0.8,
};

// Animação específica para o check icon (valores do protótipo)
const checkIconSpringConfig = {
	type: "spring" as const,
	stiffness: 300,
	damping: 20,
};

export function ModelSelector({
	isOpen,
	onClose,
	currentModel,
	onSelect,
	models,
	classN{ t } = useTranslation();
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

	function getModelDescription(model: Model): string {
		if (model.descriptionKey) {
			return t.models[model.descriptionKey];
		}
		return model.description ?? ""
	function handleSelect(modelId: string) {
		onSelect(modelId);
		onClose();
	}

	return (
		<>
			<Backdrop
				isOpen={isOpen}
				onClick={onClose}
				className="bg-black/40 backdrop-blur-[2px]"
			/>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						ref={containerRef}
						initial={{ opacity: 0, scale: 0.9, y: -20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -10 }}
						transition={dropdownSpringConfig}
						className={cn(
							"fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50",
							"w-[90%] max-w-md p-4 rounded-2xl",
							"{t.models.selectModel}
							</h2>
							<button
								type="button"
								onClick={onClose}
								className="p-2 rounded-full hover:bg-bg-hover text-text-secondary transition-colors"
								aria-label={t.models.close} items-center justify-between mb-4">
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
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														exit={{ scale: 0 }}
														transition={checkIconSpringConfig}
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
												{getModelDescription(model)}
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
