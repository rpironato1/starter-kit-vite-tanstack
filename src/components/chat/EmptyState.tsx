import { motion } from "framer-motion";
import { BookOpen, LayoutGrid, MessageSquare, Wand2 } from "lucide-react";
import type { ElementType } from "react";

type EmptyStateVariant = "chat" | "photo" | "doc" | "canvas";

interface EmptyStateProps {
	variant?: EmptyStateVariant;
	customTitle?: string;
	customSubtitle?: string;
}

interface VariantConfig {
	icon: ElementType;
	title: string;
	subtitle: string;
	iconClassName?: string;
}

const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
	chat: {
		icon: MessageSquare,
		title: "Como posso ajudar?",
		subtitle: "Faça uma pergunta para começar",
	},
	photo: {
		icon: Wand2,
		title: "Crie imagens incríveis",
		subtitle: "Descreva a imagem que você quer criar",
		iconClassName: "text-accent-primary",
	},
	doc: {
		icon: BookOpen,
		title: "Analise documentos",
		subtitle: "Faça upload ou cole texto para análise",
	},
	canvas: {
		icon: LayoutGrid,
		title: "Crie artefatos",
		subtitle: "Peça para gerar código, diagramas ou mais",
	},
};

export function EmptyState({
	variant = "chat",
	customTitle,
	customSubtitle,
}: EmptyStateProps) {
	const config = variantConfigs[variant];
	const Icon = config.icon;

	const title = customTitle ?? config.title;
	const subtitle = customSubtitle ?? config.subtitle;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="flex flex-1 flex-col items-center justify-center px-4 text-center"
		>
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="mb-6"
			>
				<Icon
					className={`size-16 animate-pulse-glow sm:size-20 ${config.iconClassName ?? "text-text-secondary"}`}
					strokeWidth={1.5}
				/>
			</motion.div>

			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				className="mb-3 font-serif text-2xl text-text-primary sm:text-3xl"
			>
				{title}
			</motion.h1>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="max-w-sm text-base text-text-secondary sm:text-lg"
			>
				{subtitle}
			</motion.p>
		</motion.div>
	);
}
