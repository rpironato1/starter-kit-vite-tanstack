import { AnimatePresence, motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	className?: string;
	showCloseButton?: boolean;
}

const modalVariants: Variants = {
	hidden: {
		y: "100%",
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: "spring",
			damping: 25,
			stiffness: 300,
		},
	},
	exit: {
		y: "100%",
		opacity: 0,
		transition: {
			duration: 0.2,
		},
	},
};

export function Modal({
	isOpen,
	onClose,
	children,
	title,
	className,
	showCloseButton = true,
}: ModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					variants={modalVariants}
					initial="hidden"
					animate="visible"
					exit="exit"
					className={cn(
						"fixed inset-0 z-[60] bg-bg-modal flex flex-col text-text-primary",
						className,
					)}
				>
					{/* Header */}
					{(title || showCloseButton) && (
						<div className="flex items-center justify-between p-4 pt-6 border-b border-border-default bg-bg-modal sticky top-0 z-10">
							{showCloseButton && (
								<button
									type="button"
									onClick={onClose}
									className="p-2 rounded-full bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							)}

							{title && (
								<h2 className="text-lg font-semibold text-text-primary">
									{title}
								</h2>
							)}

							{/* Spacer para centralizar o título */}
							{showCloseButton && <div className="w-9 h-9" />}
						</div>
					)}

					{/* Content */}
					<div className="flex-1 overflow-y-auto no-scrollbar">{children}</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

interface ModalHeaderProps {
	children: ReactNode;
	className?: string;
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
	return (
		<div
			className={cn(
				"flex items-center justify-between p-4 pt-6 border-b border-border-default bg-bg-modal sticky top-0 z-10",
				className,
			)}
		>
			{children}
		</div>
	);
}

interface ModalContentProps {
	children: ReactNode;
	className?: string;
}

export function ModalContent({ children, className }: ModalContentProps) {
	return (
		<div
			className={cn(
				"flex-1 overflow-y-auto p-4 space-y-6 bg-bg-modal no-scrollbar",
				className,
			)}
		>
			{children}
		</div>
	);
}
