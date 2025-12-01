import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CommandBarBaseProps {
	children: ReactNode;
	attachmentPreview?: ReactNode;
	className?: string;
	containerClassName?: string;
}

export function CommandBarBase({
	children,
	attachmentPreview,
	className,
	containerClassName,
}: CommandBarBaseProps) {
	return (
		<footer
			className={cn(
				"absolute bottom-0 left-0 w-full p-4 pb-6",
				"bg-gradient-to-t from-bg-main via-bg-main/95 to-transparent backdrop-blur-[2px]",
				"z-20",
				className,
			)}
		>
			<div className={cn("mx-auto w-full max-w-3xl", containerClassName)}>
				{attachmentPreview}
				<div className="relative flex flex-col rounded-[32px] border border-border-default bg-bg-surface p-2 shadow-lg ring-1 ring-border-default/20">
					{children}
				</div>
			</div>
		</footer>
	);
}

export default CommandBarBase;
