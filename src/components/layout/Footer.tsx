import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface FooterProps {
	children: ReactNode;
	className?: string;
}

export function Footer({ children, className }: FooterProps) {
	return (
		<footer
			className={cn(
				"absolute bottom-0 left-0 w-full p-4 pb-6 z-20",
				"bg-gradient-to-t from-bg-main via-bg-main/95 to-transparent backdrop-blur-[2px]",
				className,
			)}
		>
			{children}
		</footer>
	);
}

// Versão simples apenas com o gradient container
interface GradientContainerProps {
	children: ReactNode;
	className?: string;
	centered?: boolean;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const maxWidthClasses = {
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	full: "w-full",
};

export function GradientContainer({
	children,
	className,
	centered = true,
	maxWidth = "3xl",
}: GradientContainerProps) {
	return (
		<div
			className={cn(
				maxWidthClasses[maxWidth],
				centered && "mx-auto",
				"w-full",
				className,
			)}
		>
			{children}
		</div>
	);
}
