import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackdropProps {
	isOpen: boolean;
	onClick?: () => void;
	className?: string;
	blur?: boolean;
}

export function Backdrop({
	isOpen,
	onClick,
	className,
	blur = true,
}: BackdropProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={onClick}
					className={cn(
						"fixed inset-0 z-40 bg-black/60",
						blur && "backdrop-blur-[2px]",
						className,
					)}
				/>
			)}
		</AnimatePresence>
	);
}
