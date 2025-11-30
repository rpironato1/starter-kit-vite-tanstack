import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
				link: "text-primary underline-offset-4 hover:underline",
				// Zane Design System variants
				zane: "bg-accent-primary hover:bg-accent-hover text-white rounded-xl font-semibold shadow-lg shadow-green-900/10 active:scale-[0.98] transition-all",
				"zane-outline":
					"border border-border-default text-text-primary hover:bg-bg-hover rounded-xl transition-colors",
				"zane-ghost":
					"text-text-secondary hover:text-text-primary hover:bg-bg-hover rounded-xl transition-colors",
				"zane-danger":
					"text-red-400 hover:text-red-500 hover:bg-bg-hover rounded-xl transition-colors",
				"zane-icon":
					"rounded-full bg-bg-hover text-text-secondary hover:text-text-primary transition-colors",
				"zane-fab":
					"rounded-full bg-accent-primary text-white shadow-lg shadow-green-900/20 hover:bg-accent-hover active:scale-95 transition-all",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
				// Zane Design System sizes
				"zane-sm": "px-3 py-2 text-sm",
				"zane-md": "px-4 py-3 text-[15px]",
				"zane-lg": "px-6 py-3.5 text-base",
				"zane-icon-sm": "p-1.5",
				"zane-icon-md": "p-2.5",
				"zane-icon-lg": "p-3",
				"zane-fab": "w-10 h-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
