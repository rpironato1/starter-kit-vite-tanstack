import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import type { RefObject } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

const DEFAULT_MODELS = [
	{
		id: "zane-mini",
		name: "Zane Mini",
		descriptionKey: "mini" as const,
		badgeKey: "recommended" as const,
	},
	{
		id: "zane-solo",
		name: "Zane Solo",
		descriptionKey: "solo" as const,
		badgeKey: "balanced" as const,
	},
	{
		id: "zane-pro",
		name: "Zane Pro",
		descriptionKey: "pro" as const,
		badgeKey: "creative" as const,
	},
	{
		id: "zane-ultra",
		name: "Zane Ultra",
		descriptionKey: "ultra" as const,
		highlightClass: "text-amber-400 font-semibold",
		badgeKey: "flagship" as const,
	},
];

type ModelDescriptionKey = "mini" | "solo" | "pro" | "ultra";
type ModelBadgeKey = "recommended" | "balanced" | "flagship" | "creative";

interface Model {
	id: string;
	name: string;
	descriptionKey?: ModelDescriptionKey;
	description?: string;
	highlightClass?: string;
	badgeKey?: ModelBadgeKey;
}

interface ModelSelectorProps {
	isOpen: boolean;
	onClose: () => void;
	currentModel: string;
	onSelect: (model: string) => void;
	models?: Model[];
	className?: string;
	anchorRef?: RefObject<HTMLElement | null> | null;
	fallbackPlacement?: "up" | "down";
	offset?: number;
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
	className,
	anchorRef = null,
	fallbackPlacement = "up",
	offset = 16,
}: ModelSelectorProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const wasOpenRef = useRef(false);
	const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const { t } = useTranslation();
	const availableModels = models ?? DEFAULT_MODELS;
	const anchorExists = Boolean(anchorRef?.current);
	const getCenteredPosition = useCallback(() => {
		if (typeof window === "undefined") {
			return { top: 0, left: 0 };
		}
		return {
			top: window.innerHeight / 2,
			left: window.innerWidth / 2,
		};
	}, []);
	const [position, setPosition] = useState(getCenteredPosition);
	const [resolvedPlacement, setResolvedPlacement] = useState<"up" | "down">(
		fallbackPlacement,
	);
	const [activeIndex, setActiveIndex] = useState(0);
	const titleId = useId();
	const descriptionId = useId();
	const translateClass = anchorExists
		? resolvedPlacement === "up"
			? "-translate-x-1/2 -translate-y-full"
			: "-translate-x-1/2"
		: "-translate-x-1/2 -translate-y-1/2";
	const motionYOffset = resolvedPlacement === "up" ? -12 : 12;

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const selectedIdx = availableModels.findIndex(
			(model) => model.id === currentModel || model.name === currentModel,
		);
		setActiveIndex(selectedIdx >= 0 ? selectedIdx : 0);
	}, [availableModels, currentModel, isOpen]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const target = optionRefs.current[activeIndex];
		target?.focus({ preventScroll: true });
	}, [activeIndex, isOpen]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const updatePosition = () => {
			const anchor = anchorRef?.current;
			if (anchor && typeof window !== "undefined") {
				const rect = anchor.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const spaceAbove = rect.top;
				const spaceBelow = viewportHeight - rect.bottom;
				let placementToUse = fallbackPlacement;
				const minSpace = 320;

				if (
					placementToUse === "up" &&
					spaceAbove < minSpace &&
					spaceBelow > spaceAbove
				) {
					placementToUse = "down";
				} else if (
					placementToUse === "down" &&
					spaceBelow < minSpace &&
					spaceAbove > spaceBelow
				) {
					placementToUse = "up";
				}

				setResolvedPlacement(placementToUse);
				const nextTop =
					placementToUse === "up" ? rect.top - offset : rect.bottom + offset;
				setPosition({
					top: nextTop,
					left: rect.left + rect.width / 2,
				});
			} else {
				setResolvedPlacement("down");
				setPosition(getCenteredPosition());
			}
		};

		updatePosition();
		if (typeof window !== "undefined") {
			window.addEventListener("resize", updatePosition);
			window.addEventListener("scroll", updatePosition, true);
		}

		return () => {
			if (typeof window !== "undefined") {
				window.removeEventListener("resize", updatePosition);
				window.removeEventListener("scroll", updatePosition, true);
			}
		};
	}, [anchorRef, fallbackPlacement, getCenteredPosition, offset, isOpen]);

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

	useEffect(() => {
		if (wasOpenRef.current && !isOpen && anchorRef?.current) {
			anchorRef.current.focus();
		}
		wasOpenRef.current = isOpen;
	}, [anchorRef, isOpen]);

	function handleSelect(modelId: string) {
		onSelect(modelId);
		onClose();
	}

	function getModelDescription(model: Model): string {
		if (model.descriptionKey) {
			return t.models[model.descriptionKey];
		}
		return model.description ?? "";
	}

	function handleKeyNavigation(event: React.KeyboardEvent<HTMLElement>) {
		if (!isOpen || availableModels.length === 0) {
			return;
		}
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActiveIndex((prev) => (prev + 1) % availableModels.length);
		}
		if (event.key === "ArrowUp") {
			event.preventDefault();
			setActiveIndex(
				(prev) => (prev - 1 + availableModels.length) % availableModels.length,
			);
		}
		if (event.key === "Home") {
			event.preventDefault();
			setActiveIndex(0);
		}
		if (event.key === "End") {
			event.preventDefault();
			setActiveIndex(availableModels.length - 1);
		}
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			optionRefs.current[activeIndex]?.click();
		}
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 z-20 bg-black/40 backdrop-blur-[2px]"
						onClick={onClose}
					/>

					{/* Dropdown Menu */}
					<motion.div
						ref={containerRef}
						initial={{ opacity: 0, scale: 0.9, y: motionYOffset }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: motionYOffset }}
						transition={dropdownSpringConfig}
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
								const badgeLabel = model.badgeKey
									? t.modelsBadges[model.badgeKey]
									: undefined;
								const modelMeta = model.descriptionKey
									? t.modelsMeta?.[model.descriptionKey]
									: undefined;
								const optionId = model.id;

								return (
									<button
										key={model.id}
										type="button"
										onClick={() => handleSelect(model.name)}
										ref={(el) => {
											optionRefs.current[index] = el;
										}}
										role="option"
										id={optionId}
										aria-selected={isSelected}
										onKeyDown={handleKeyNavigation}
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
														transition={checkIconSpringConfig}
													>
														<Check className="h-4 w-4 text-accent-primary" />
													</motion.div>
												) : (
													<div className="h-4 w-4" />
												)}
											</AnimatePresence>
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
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
												{badgeLabel && (
													<span className="rounded-full border border-border-default/40 bg-bg-main/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
														{badgeLabel}
													</span>
												)}
											</div>
											<p className="mt-0.5 text-xs leading-snug text-text-secondary">
												{getModelDescription(model)}
											</p>

											{modelMeta && (
												<div className="mt-2 space-y-1 text-[11px] text-text-secondary/90">
													<div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.25em]">
														<span className="rounded-full border border-border-default/40 px-2 py-0.5 font-semibold">
															{modelMeta.tier}
														</span>
														<span className="rounded-full bg-bg-hover/70 px-2 py-0.5 font-semibold tracking-tight text-[10px] text-text-primary/80">
															{modelMeta.contextWindow}
														</span>
														<span className="flex items-center gap-1 tracking-tight text-[11px] normal-case text-text-secondary">
															<span className="h-1.5 w-1.5 rounded-full bg-accent-primary shadow-[0_0_6px_rgba(36,107,49,0.6)]" />
															{modelMeta.latency}
														</span>
													</div>
													<p className="text-[11px] leading-snug tracking-normal text-text-secondary">
														{modelMeta.bestFor}
													</p>
												</div>
											)}
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
