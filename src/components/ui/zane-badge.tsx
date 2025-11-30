import { cn } from "@/lib/utils";

type ZaneBadgeVariant = "default" | "photo" | "doc" | "canvas";

interface ZaneBadgeProps {
	variant?: ZaneBadgeVariant;
	showLabel?: boolean;
	className?: string;
}

interface VariantConfig {
	label: string;
	gradientClass: string;
	glowClass: string;
}

const variantConfigs: Record<ZaneBadgeVariant, VariantConfig> = {
	default: {
		label: "Zane AI",
		gradientClass: "bg-gradient-to-br from-accent-primary to-emerald-900",
		glowClass: "shadow-[0_0_10px_rgba(36,107,49,0.4)]",
	},
	photo: {
		label: "Zane Photo",
		gradientClass: "bg-gradient-to-br from-accent-primary to-emerald-900",
		glowClass: "shadow-[0_0_10px_rgba(36,107,49,0.4)]",
	},
	doc: {
		label: "Zane Doc",
		gradientClass: "bg-gradient-to-br from-blue-500 to-blue-900",
		glowClass: "shadow-[0_0_10px_rgba(59,130,246,0.4)]",
	},
	canvas: {
		label: "Zane Canvas",
		gradientClass: "bg-gradient-to-br from-purple-500 to-purple-900",
		glowClass: "shadow-[0_0_10px_rgba(168,85,247,0.4)]",
	},
};

/**
 * ZaneBadge - Badge quadrado com letra "Z" e label para identificar mensagens do AI
 *
 * Design conforme protótipos:
 * - Badge quadrado: w-5 h-5 rounded-md
 * - Letra "Z": font-serif font-bold text-[9px]
 * - Gradient: from-accent-primary to-emerald-900
 * - Glow: shadow-[0_0_10px_rgba(36,107,49,0.4)]
 * - Label: text-[11px] font-bold uppercase tracking-wider text-zinc-500
 */
export function ZaneBadge({
	variant = "default",
	showLabel = true,
	className,
}: ZaneBadgeProps) {
	const config = variantConfigs[variant];

	return (
		<div className={cn("flex items-center gap-2 select-none", className)}>
			{/* Badge quadrado com letra Z */}
			<div
				className={cn(
					"w-5 h-5 rounded-md flex items-center justify-center text-white font-serif font-bold text-[9px]",
					config.gradientClass,
					config.glowClass,
				)}
			>
				Z
			</div>

			{/* Label separado */}
			{showLabel && (
				<span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">
					{config.label}
				</span>
			)}
		</div>
	);
}

export default ZaneBadge;
