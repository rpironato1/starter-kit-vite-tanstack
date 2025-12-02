import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { ModelSelectorDropdown } from "./ModelSelectorDropdown";
import {
	DEFAULT_MODELS,
	type Model,
	type ModelSelectorProps,
} from "./modelSelectorConfig";

type Placement = "up" | "down";

interface Coordinates {
	top: number;
	left: number;
}

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
	const wasOpenRef = useRef(false);
	const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const { t } = useTranslation();
	const availableModels = models ?? DEFAULT_MODELS;
	const anchorExists = Boolean(anchorRef?.current);

	const getCenteredPosition = useCallback((): Coordinates => {
		if (typeof window === "undefined") {
			return { top: 0, left: 0 };
		}
		return {
			top: window.innerHeight / 2,
			left: window.innerWidth / 2,
		};
	}, []);

	const [position, setPosition] = useState<Coordinates>(getCenteredPosition);
	const [resolvedPlacement, setResolvedPlacement] =
		useState<Placement>(fallbackPlacement);
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
		if (selectedIdx >= 0) {
			setActiveIndex(selectedIdx);
			optionRefs.current[selectedIdx]?.focus();
		} else {
			setActiveIndex(0);
		}
	}, [availableModels, currentModel, isOpen]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const updatePosition = () => {
			if (anchorRef?.current) {
				const rect = anchorRef.current.getBoundingClientRect();
				const spaceAbove = rect.top;
				const spaceBelow =
					typeof window !== "undefined" ? window.innerHeight - rect.bottom : 0;
				const minSpace = 280;

				let placementToUse: Placement = fallbackPlacement;
				if (
					placementToUse === "up" &&
					spaceAbove < minSpace &&
					spaceBelow > spaceAbove
				) {
					placementToUse = "down";
				}
				if (
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
	}, [anchorRef, fallbackPlacement, getCenteredPosition, isOpen, offset]);

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
		<ModelSelectorDropdown
			isOpen={isOpen}
			onClose={onClose}
			availableModels={availableModels}
			currentModel={currentModel}
			translateClass={translateClass}
			className={className}
			position={position}
			motionYOffset={motionYOffset}
			resolvedPlacement={resolvedPlacement}
			titleId={titleId}
			descriptionId={descriptionId}
			optionRefs={optionRefs}
			onSelect={handleSelect}
			onKeyNavigation={handleKeyNavigation}
			getModelDescription={getModelDescription}
		/>
	);
}
