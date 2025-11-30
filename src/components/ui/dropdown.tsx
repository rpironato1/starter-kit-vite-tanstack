import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
	position?: "top" | "bottom";
}

const dropdownVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.95,
		y: -10,
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: "spring" as const,
			stiffness: 350,
			damping: 25,
			mass: 0.8,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: -10,
		transition: {
			duration: 0.15,
		},
	},
};

export function Dropdown({
	isOpen,
	onClose,
	children,
	className,
	position = "bottom",
}: DropdownProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop invisível para fechar ao clicar fora */}
					<button
						type="button"
						className="fixed inset-0 z-30 cursor-default bg-transparent border-none"
						onClick={onClose}
						aria-label="Close dropdown"
					/>

					<motion.div
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						className={cn(
							"absolute z-40 bg-bg-surface border border-border-default rounded-2xl shadow-2xl overflow-hidden",
							position === "top" && "bottom-full mb-2",
							position === "bottom" && "top-full mt-2",
							className,
						)}
					>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}

interface DropdownItemProps {
	children: ReactNode;
	onClick?: () => void;
	selected?: boolean;
	className?: string;
}

export function DropdownItem({
	children,
	onClick,
	selected,
	className,
}: DropdownItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"w-full text-left px-4 py-3 flex items-center justify-between transition-colors",
				selected ? "bg-bg-hover" : "hover:bg-bg-hover/50",
				className,
			)}
		>
			{children}
		</button>
	);
}
