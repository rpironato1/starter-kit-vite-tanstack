import { motion } from "framer-motion";
import { Brain, Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
	variant?: "default" | "reasoning";
	text?: string;
}

export function LoadingIndicator({
	variant = "default",
	text,
}: LoadingIndicatorProps) {
	const isReasoning = variant === "reasoning";
	const displayText = text ?? (isReasoning ? "Raciocinando..." : "Pensando...");
	const Icon = isReasoning ? Brain : Loader2;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="flex items-center gap-2 text-text-secondary"
		>
			<Icon
				className={`size-4 ${isReasoning ? "animate-pulse" : "animate-spin"}`}
			/>
			<span className="text-sm">{displayText}</span>
		</motion.div>
	);
}
