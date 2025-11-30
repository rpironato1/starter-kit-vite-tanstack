import { motion } from "framer-motion";
import { FileText, LayoutGrid, MessageSquare, Wand2 } from "lucide-react";
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
	iconClassName: string;
	blurClassName: string;
}

const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
	chat: {
		icon: MessageSquare,
		title: "Olá! Como posso ajudar?",
		subtitle: "Faça uma pergunta para começar",
		iconClassName: "text-accent-primary",
		blurClassName: "bg-accent-primary/20",
	},
	photo: {
		icon: Wand2,
		title: "Zane Photo Studio",
		subtitle:
			"Imagine, descreva e crie. Use o poder do Zane para dar vida às suas ideias.",
		iconClassName: "text-accent-primary",
		blurClassName: "bg-accent-primary/20",
	},
	doc: {
		icon: FileText,
		title: "Zane Doc",
		subtitle:
			"Faça upload de documentos de texto ou código e converse com eles.",
		iconClassName: "text-blue-500",
		blurClassName: "bg-blue-500/10",
	},
	canvas: {
		icon: LayoutGrid,
		title: "Zane Canvas",
		subtitle:
			"Um espaço dedicado para construção de ideias, escrita longa e projetos complexos.",
		iconClassName: "text-purple-500",
		blurClassName: "bg-purple-500/10",
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
			{/* Container 3D com blur layer */}
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="relative mb-6"
			>
				{/* Blur layer atrás */}
				<div
					className={`absolute inset-0 blur-xl animate-pulse rounded-full ${config.blurClassName}`}
				/>

				{/* Container 3D */}
				<div className="relative w-20 h-20 rounded-[24px] bg-bg-surface shadow-2xl border border-white/5 flex items-center justify-center">
					<Icon
						className={`w-8 h-8 ${config.iconClassName}`}
						strokeWidth={1.5}
					/>
				</div>
			</motion.div>

			{/* Título com cor dourada no mobile */}
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				className="mb-3 font-serif text-3xl md:text-4xl text-[#eecfa1] md:text-text-primary tracking-wide"
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
