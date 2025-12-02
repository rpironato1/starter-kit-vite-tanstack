import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsItemProps {
	icon: LucideIcon;
	label: string;
	value?: string;
	description?: string;
	onClick?: () => void;
	rightElement?: ReactNode;
	destructive?: boolean;
	className?: string;
}

export function SettingsItem({
	icon: Icon,
	label,
	value,
	description,
	onClick,
	rightElement,
	destructive = false,
	className,
}: SettingsItemProps) {
	const isClickable = !!onClick;
	const hasRightElement = !!rightElement;

	const Wrapper = hasRightElement ? "div" : "button";

	return (
		<Wrapper
			type={hasRightElement ? undefined : "button"}
			onClick={hasRightElement ? undefined : onClick}
			disabled={hasRightElement ? undefined : !isClickable}
			className={cn(
				"w-full flex items-center gap-4 p-4 transition-colors text-left",
				"hover:bg-bg-hover/50 active:bg-bg-hover",
				!hasRightElement && "disabled:cursor-default disabled:hover:bg-transparent",
				destructive && "text-red-500 hover:bg-red-500/5",
				className,
			)}
		>
			<div
				className={cn(
					"w-8 h-8 rounded-full flex items-center justify-center shrink-0",
					destructive ? "bg-red-500/10" : "bg-bg-hover",
				)}
			>
				<Icon
					className={cn(
						"w-4 h-4",
						destructive ? "text-red-500" : "text-text-secondary",
					)}
				/>
			</div>

			<div className="flex-1 min-w-0 flex flex-col">
				<div className="flex items-center justify-between gap-2">
					<p
						className={cn(
							"text-[15px] font-medium truncate",
							destructive ? "text-red-500" : "text-text-primary",
						)}
					>
						{label}
					</p>
					{value && (
						<span className="text-[15px] text-text-secondary shrink-0">
							{value}
						</span>
					)}
				</div>
				{description && (
					<p className="text-xs text-text-secondary truncate mt-0.5">
						{description}
					</p>
				)}
			</div>

			{rightElement ? (
				<div className="shrink-0">{rightElement}</div>
			) : (
				isClickable && (
					<ChevronRight className="w-5 h-5 text-text-secondary/50 shrink-0 ml-1" />
				)
			)}
		</Wrapper>
	);
}
