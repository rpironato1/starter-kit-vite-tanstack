import { Activity, Brain, CircleOff, Zap } from "lucide-react";
import type { ComponentType } from "react";
import type { Translations } from "@/lib/i18n";

export type ReasoningLevel = "off" | "soft" | "medium" | "max";

export interface ReasoningLevelConfig {
	labelKey: ReasoningLevel;
	descriptionKey: ReasoningLevel;
	color: string;
	bgColor: string;
	icon: ComponentType<{ className?: string }>;
}

export const REASONING_LEVELS_CONFIG: Record<
	ReasoningLevel,
	ReasoningLevelConfig
> = {
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
		icon: Activity,
	},
	max: {
		labelKey: "max",
		descriptionKey: "max",
		color: "text-accent-primary",
		bgColor: "bg-accent-primary/10",
		icon: Brain,
	},
};

export const REASONING_LEVELS: ReasoningLevel[] = ["soft", "medium", "max", "off"];

export const REASONING_LEVEL_BADGES = ["L1", "L2", "L3", "L4"];

export const SPRING_CONFIG = {
	type: "spring" as const,
	stiffness: 400,
	damping: 30,
};

export function getReasoningLabel(t: Translations, level: ReasoningLevel): string {
	if (level === "off") return t.reasoning.off;
	if (level === "soft") return "Soft";
	if (level === "medium") return "Medium";
	return "Max";
}

export function getReasoningDescription(
	t: Translations,
	level: ReasoningLevel,
): string {
	if (level === "off") return t.reasoning.offDescription;
	return t.reasoning[level];
}
