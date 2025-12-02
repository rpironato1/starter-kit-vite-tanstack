import { motion } from "framer-motion";
import { Brain, Loader2 } from "lucide-react";

type LoadingModuleVariant = "chat" | "photo" | "doc" | "canvas";

interface LoadingIndicatorProps {
	variant?: "default" | "reasoning";
	moduleVariant?: LoadingModuleVariant;
	text?: string;
}

const moduleTexts: Record<LoadingModuleVariant, string> = {
	chat: "Pensando...",
	photo: "Criando sua obra de arte...",
	doc: "Lendo documentos e analisando...",
	canvas: "Estruturando ideias...",
};

const moduleLabelColors: Record<LoadingModuleVariant, string> = {
	chat: "text-accent-primary",
	photo: "text-accent-primary",
	doc: "text-blue-400",
	canvas: "text-purple-400",
};

export function LoadingIndicator({
	variant = "default",
	moduleVariant = "chat",
	text,
}: LoadingIndicatorProps) {
	const isReasoning = variant === "reasoning";
	const displayText =
		text ?? (isReasoning ? "Raciocinando..." : moduleTexts[moduleVariant]);
	const Icon = isReasoning ? Brain : Loader2;
	const labelColor = moduleLabelColors[moduleVariant];

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="flex items-center gap-2 text-text-secondary"
		>
			{/* Label Zane antes do spinner */}
			<span className={`font-bold text-xs ${labelColor}`}>Zane</span>

			<Icon
				className={`size-4 ${isReasoning ? "animate-pulse" : "animate-spin"}`}
			/>

			<span className="text-sm">{displayText}</span>
		</motion.div>
	);
}
