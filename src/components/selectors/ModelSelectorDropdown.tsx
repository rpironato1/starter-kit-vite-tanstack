import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { MutableRefObject } from "react";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";
import {
	CHECK_ICON_SPRING_CONFIG,
	DROPDOWN_SPRING_CONFIG,
	type Model,
} from "./modelSelectorConfig";

interface ModelSelectorDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	availableModels: Model[];
	currentModel: string;
	translateClass: string;
	className?: string | undefined;
	position: { top: number; left: number };
	motionYOffset: number;
	resolvedPlacement: "up" | "down";
	titleId: string;
	descriptionId: string;
	optionRefs: MutableRefObject<Array<HTMLButtonElement | null>>;
	onSelect: (modelName: string) => void;
	onKeyNavigation: (event: React.KeyboardEvent<HTMLElement>) => void;
	getModelDescription: (model: Model) => string;
}

export function ModelSelectorDropdown({
	isOpen,
	onClose,
	availableModels,
	currentModel,
	translateClass,
	className,
	position,
	motionYOffset,
	resolvedPlacement,
	titleId,
	descriptionId,
	optionRefs,
	onSelect,
	onKeyNavigation,
	getModelDescription,
}: ModelSelectorDropdownProps) {
	const { t } = useTranslation();

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px]"
						onClick={onClose}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: motionYOffset }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: motionYOffset }}
						transition={DROPDOWN_SPRING_CONFIG}
						style={{ top: position.top, left: position.left }}
						data-placement={resolvedPlacement}
						role="dialog"
						aria-modal="true"
						aria-label={t.models.selectModel}
						className={cn(
							"fixed z-30 w-[min(90vw,22rem)] rounded-2xl border border-border-default/70 bg-bg-surface/95 shadow-2xl backdrop-blur-xl",
							translateClass,
							className,
						)}
						aria-labelledby={titleId}
						aria-describedby={descriptionId}
					>
						<div className="p-2" role="listbox">
							{availableModels.map((model, index) => {
								const isSelected =
									model.id === currentModel || model.name === currentModel;
								const optionId = model.id;

								return (
									<button
										key={model.id}
										type="button"
										onClick={() => onSelect(model.name)}
										ref={(el) => {
											optionRefs.current[index] = el;
										}}
										role="option"
										id={optionId}
										aria-selected={isSelected}
										onKeyDown={onKeyNavigation}
										className={cn(
											"w-full flex items-start gap-3 rounded-2xl border border-transparent p-3 text-left transition-all",
											"hover:bg-bg-hover/70",
											isSelected && "border-border-default/50 bg-bg-hover/70",
										)}
									>
										<div className="mt-1 shrink-0">
											<AnimatePresence mode="wait">
												{isSelected ? (
													<motion.div
														initial={{ scale: 0 }}
														animate={{ scale: 1 }}
														exit={{ scale: 0 }}
														transition={CHECK_ICON_SPRING_CONFIG}
													>
														<Check className="h-4 w-4 text-accent-primary" />
													</motion.div>
												) : (
													<div className="h-4 w-4" />
												)}
											</AnimatePresence>
										</div>
										<div className="min-w-0 flex-1">
											<p
												className={cn(
													"font-medium text-[15px]",
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
											</p>
											<p className="mt-0.5 text-xs leading-snug text-text-secondary">
												{getModelDescription(model)}
											</p>
										</div>
									</button>
								);
							})}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
