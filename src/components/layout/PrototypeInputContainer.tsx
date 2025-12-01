import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PrototypeInputContainerProps {
	/** Content for the input field (usually an input or textarea) */
	input: ReactNode;
	/** Actions to the left of the input (e.g., attach, reasoning) */
	leftActions?: ReactNode;
	/** Actions to the right of the input (e.g., mic, send) */
	rightActions?: ReactNode;
	/** Optional footer content below the bar */
	footer?: ReactNode;
	/** Optional content above the bar (e.g., previews) */
	topContent?: ReactNode;
	className?: string;
}

/**
 * A specialized container that faithfully reproduces the "pill" shape
 * and layout of the Zane AI prototypes.
 *
 * Structure:
 * Footer (Fixed Bottom)
 *   -> Gradient Backdrop
 *     -> Container (Max-Width)
 *       -> Top Content (Previews)
 *       -> Input Pill (The visual container)
 *          -> Left Actions
 *          -> Divider
 *          -> Input
 *          -> Right Actions
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
			{/* Top Content (Attachments, etc) */}
			{topContent && (
				<div className="max-w-3xl mx-auto mb-2 px-2">{topContent}</div>
			)}

			{/* The Main Pill */}
			<div
				className={cn(
					"relative bg-bg-surface rounded-[32px] p-2 flex items-center",
					"shadow-lg border border-border-default ring-1 ring-white/5",
					"max-w-3xl mx-auto w-full",
					// Specific prototype height/layout rules
					"min-h-[3.5rem]",
				)}
			>
				{/* Left Actions Group */}
				{leftActions && (
					<div className="flex items-center gap-1 pl-1 shrink-0">
						{leftActions}
					</div>
				)}

				{/* Input Area */}
				<div className="flex-1 min-w-0 mx-1">{input}</div>

				{/* Right Actions Group */}
				{rightActions && (
					<div className="flex items-center gap-1 mr-1 shrink-0">
						{rightActions}
					</div>
				)}
			</div>

			{/* Optional Footer (e.g. legal text, disclaimers) */}
			{footer && (
				<div className="max-w-3xl mx-auto mt-2 px-4 text-center">
					{footer}
				</div>
			)}
		</footer>
	);
}
