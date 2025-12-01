import type { RefObject } from "react";

export type ModelDescriptionKey = "mini" | "solo" | "pro" | "ultra";
export type ModelBadgeKey = "recommended" | "balanced" | "flagship" | "creative";

export interface Model {
	id: string;
	name: string;
	descriptionKey?: ModelDescriptionKey;
	description?: string;
	highlightClass?: string;
	badgeKey?: ModelBadgeKey;
}

export interface ModelSelectorProps {
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

export const DEFAULT_MODELS: Model[] = [
	{
		id: "zane-mini",
		name: "Zane Mini",
		descriptionKey: "mini",
		badgeKey: "recommended",
	},
	{
		id: "zane-solo",
		name: "Zane Solo",
		descriptionKey: "solo",
		badgeKey: "balanced",
	},
	{
		id: "zane-pro",
		name: "Zane Pro",
		descriptionKey: "pro",
		badgeKey: "creative",
	},
	{
		id: "zane-ultra",
		name: "Zane Ultra",
		descriptionKey: "ultra",
		highlightClass: "text-amber-400 font-semibold",
		badgeKey: "flagship",
	},
];

export const DROPDOWN_SPRING_CONFIG = {
	type: "spring" as const,
	stiffness: 350,
	damping: 25,
	mass: 0.8,
};

export const CHECK_ICON_SPRING_CONFIG = {
	type: "spring" as const,
	stiffness: 300,
	damping: 20,
};
