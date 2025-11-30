import * as SwitchPrimitive from "@radix-ui/react-switch";
import { motion } from "framer-motion";
import type * as React from "react";

import { cn } from "@/lib/utils";

function Switch({
	className,
	...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

interface ZaneToggleProps {
	isOn: boolean;
	onToggle: () => void;
	activeColor?: string;
	inactiveColor?: string;
	disabled?: boolean;
}

function ZaneToggle({
	isOn,
	onToggle,
	activeColor = "bg-accent-primary",
	inactiveColor = "bg-zinc-600 dark:bg-zinc-600",
	disabled = false,
}: ZaneToggleProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={isOn}
			disabled={disabled}
			onClick={(e) => {
				e.stopPropagation();
				onToggle();
			}}
			className={cn(
				"w-11 h-6 rounded-full flex items-center px-1 transition-colors duration-300",
				isOn ? activeColor : inactiveColor,
				disabled && "opacity-50 cursor-not-allowed",
			)}
		>
			<motion.div
				className="w-4 h-4 rounded-full bg-white shadow-md"
				layout
				transition={{
					type: "spring",
					stiffness: 700,
					damping: 30,
				}}
				style={{
					marginLeft: isOn ? "auto" : 0,
				}}
			/>
		</button>
	);
}

export { Switch, ZaneToggle };
