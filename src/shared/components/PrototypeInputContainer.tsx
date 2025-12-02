import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PrototypeInputContainerProps {
	input: ReactNode;
	leftActions?: ReactNode;
	rightActions?: ReactNode;
	footer?: ReactNode;
	topContent?: ReactNode;
	className?: string;
}

/**
 * Layout wrapper que reproduz o "pill" dos protótipos Zane AI
 * e é compartilhado entre Chat/Photo/Doc/Canvas.
 */
export function PrototypeInputContainer({
	input,
	leftActions,
	rightActions,
	footer,
	topContent,
	className,
}: PrototypeInputContainerProps) {
	return (
		<footer
			className={cn(
				"absolute bottom-0 left-0 w-full p-4 pb-6 z-20",
				"bg-gradient-to-t from-bg-main via-bg-main/95 to-transparent backdrop-blur-[2px]",
				className,
			)}
		>
			{topContent && (
				<div className="max-w-3xl mx-auto mb-2 px-2">{topContent}</div>
			)}

			<div
				className={cn(
					"relative bg-bg-surface rounded-[32px] p-2 flex items-center",
					"shadow-lg border border-border-default ring-1 ring-white/5",
					"max-w-3xl mx-auto w-full",
					"min-h-[3.5rem]",
				)}
			>
				{leftActions && (
					<div className="flex items-center gap-1 pl-1 shrink-0">{leftActions}</div>
				)}

				<div className="flex-1 min-w-0 mx-1">{input}</div>

				{rightActions && (
					<div className="flex items-center gap-1 mr-1 shrink-0">
						{rightActions}
					</div>
				)}
			</div>

			{footer && (
				<div className="max-w-3xl mx-auto mt-2 px-4 text-center">
					{footer}
				</div>
			)}
		</footer>
	);
}
