import {
	Monitor,
	RectangleHorizontal,
	RectangleVertical,
	Smartphone,
	Square,
} from "lucide-react";
import type { ComponentType } from "react";
import type { AspectRatio } from "@/components/selectors/AspectRatioSelector";

export interface AspectRatioOption {
	label: string;
	value: AspectRatio;
	icon: ComponentType<{ className?: string }>;
}

export const ASPECT_RATIOS: AspectRatioOption[] = [
	{ label: "Quadrado (1:1)", value: "1:1", icon: Square },
	{ label: "Paisagem (4:3)", value: "4:3", icon: RectangleHorizontal },
	{ label: "Retrato (3:4)", value: "3:4", icon: RectangleVertical },
	{ label: "Cinema (16:9)", value: "16:9", icon: Monitor },
	{ label: "Story (9:16)", value: "9:16", icon: Smartphone },
];
