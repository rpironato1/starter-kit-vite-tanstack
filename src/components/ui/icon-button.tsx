import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: "default" | "ghost" | "primary";
	size?: "sm" | "md" | "lg";
	active?: boolean;
}

const sizeClasses = {
	sm: "p-1.5",
	md: "p-2.5",
	lg: "p-3",
};

const variantClasses = {
	default:
		"bg-bg-hover text-text-secondary hover:text-text-primary hover:bg-bg-hover/80",
	ghost: "text-text-secondary hover:bg-bg-hover hover:text-text-primary",
	primary:
		"bg-accent-primary text-white hover:bg-accent-hover shadow-lg shadow-green-900/20",
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{ children, variant = "ghost", size = "md", active, className, disabled, ...props },
		ref,
	) => {
		return (
			<button
				ref={ref}
				type="button"
				disabled={disabled}
				className={cn(
					"rounded-full transition-all duration-200 flex items-center justify-center",
					"active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
					sizeClasses[size],
					variantClasses[variant],
					active && "bg-bg-hover text-text-primary",
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

IconButton.displayName = "IconButton";
