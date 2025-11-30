import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsItemProps {
	icon: LucideIcon;
	label: string;
	description?: string;
	onClick?: () => void;
	rightElement?: ReactNode;
	destructive?: boolean;
}

export function SettingsItem({
	icon: Icon,
	label,
	description,
	onClick,
	rightElement,
	destructive = false,
}: SettingsItemProps) {
	const isClickable = !!onClick;

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={!isClickable}
			className={cn(
				"w-full flex items-center gap-4 p-4 rounded-xl transition-colors text-left",
				"bg-bg-surface hover:bg-bg-hover",
				"disabled:cursor-default disabled:hover:bg-bg-surface",
				destructive && "text-red-500",
			)}
		>
			<div
				className={cn(
					"w-10 h-10 rounded-full flex items-center justify-center",
					destructive ? "bg-red-500/10" : "bg-bg-hover",
				)}
			>
				<Icon
					className={cn(
						"w-5 h-5",
						destructive ? "text-red-500" : "text-text-secondary",
					)}
				/>
			</div>

			<div className="flex-1 min-w-0">
				<p
					className={cn(
						"text-sm font-medium",
						destructive ? "text-red-500" : "text-text-primary",
					)}
				>
					{label}
				</p>
				{description && (
					<p className="text-xs text-text-secondary truncate">{description}</p>
				)}
			</div>

			{rightElement ? (
				<div className="shrink-0">{rightElement}</div>
			) : (
				isClickable && (
					<ChevronRight className="w-5 h-5 text-text-secondary shrink-0" />
				)
			)}
		</button>
	);
}
