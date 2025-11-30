import type { LucideIcon } from "lucide-react";
import {
	Monitor,
	RectangleHorizontal,
	RectangleVertical,
	Smartphone,
	Square,
} from "lucide-react";

export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

interface AspectRatioSelectorProps {
	value: AspectRatio;
	onChange: (ratio: AspectRatio) => void;
}

interface RatioOption {
	label: string;
	value: AspectRatio;
	icon: LucideIcon;
}

const ASPECT_RATIOS: RatioOption[] = [
	{ label: "Quadrado", value: "1:1", icon: Square },
	{ label: "Paisagem", value: "4:3", icon: RectangleHorizontal },
	{ label: "Retrato", value: "3:4", icon: RectangleVertical },
	{ label: "Cinema", value: "16:9", icon: Monitor },
	{ label: "Story", value: "9:16", icon: Smartphone },
];

export function AspectRatioSelector({
	value,
	onChange,
}: AspectRatioSelectorProps) {
	return (
		<div className="flex items-center justify-center gap-2">
			{ASPECT_RATIOS.map((ratio) => {
				const Icon = ratio.icon;
				const isActive = value === ratio.value;

				return (
					<button
						key={ratio.value}
						type="button"
						onClick={() => onChange(ratio.value)}
						className={`flex flex-col items-center gap-1.5 rounded-xl px-3 py-2 transition-all ${
							isActive
								? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
								: "bg-bg-surface text-text-secondary hover:bg-bg-hover hover:text-text-primary"
						}`}
					>
						<Icon
							className={`h-5 w-5 ${isActive ? "text-white" : "text-current"}`}
						/>
						<span className="text-[10px] font-medium uppercase tracking-wide">
							{ratio.label}
						</span>
					</button>
				);
			})}
		</div>
	);
}

// Export the constant for use in other components
export { ASPECT_RATIOS };
