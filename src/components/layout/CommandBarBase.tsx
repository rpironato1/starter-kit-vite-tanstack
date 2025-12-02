import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CommandBarBaseProps {
	children?: ReactNode;
	attachmentPreview?: ReactNode;
	className?: string | undefined;
	containerClassName?: string | undefined;
	leadingSlot?: ReactNode;
	primarySlot?: ReactNode;
	trailingSlot?: ReactNode;
	footerSlot?: ReactNode;
}

export function CommandBarBase({
	children,
	attachmentPreview,
	className,
	containerClassName,
	leadingSlot,
	primarySlot,
	trailingSlot,
	footerSlot,
}: CommandBarBaseProps) {
	const hasSlotLayout = Boolean(leadingSlot || primarySlot || trailingSlot);
	return (
		<footer
			className={cn(
				"absolute bottom-0 left-0 w-full p-4 pb-6",
				"bg-gradient-to-t from-bg-main via-bg-main/95 to-transparent backdrop-blur-[2px]",
				"z-20",
				className,
			)}
		>
			<div className={cn("mx-auto w-full max-w-4xl", containerClassName)}>
				{attachmentPreview && (
					<div className="mb-3 px-4 sm:px-6">{attachmentPreview}</div>
				)}
				<div className="relative flex flex-col gap-3 rounded-[32px] border border-border-default bg-bg-surface/95 p-3 shadow-xl ring-1 ring-border-default/20">
					{hasSlotLayout ? (
						<div className="flex flex-col gap-3 md:flex-row md:items-end">
							{leadingSlot && (
								<div className="flex flex-wrap items-center gap-2 text-text-secondary md:max-w-[260px]">
									{leadingSlot}
								</div>
							)}
							{primarySlot && (
								<div className="order-last min-w-[200px] flex-1 md:order-none">
									{primarySlot}
								</div>
							)}
							{trailingSlot && (
								<div className="flex flex-wrap items-center justify-start gap-2 md:ml-auto md:justify-end">
									{trailingSlot}
								</div>
							)}
						</div>
					) : (
						children
					)}
					{footerSlot && (
						<div className="border-t border-border-default/50 pt-2 text-xs text-text-secondary">
							{footerSlot}
						</div>
					)}
				</div>
			</div>
		</footer>
	);
}

export default CommandBarBase;
