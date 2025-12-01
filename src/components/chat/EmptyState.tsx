import { motion } from "framer-motion";
import { FileText, LayoutGrid, MessageSquare, Wand2 } from "lucide-react";
import type { ElementType } from "react";
import { ModeCards } from "@/components/layout/ModeCards";
import { useTranslation } from "@/hooks/useI18n";

type EmptyStateVariant = "chat" | "photo" | "doc" | "canvas";

interface EmptyStateProps {
	variant?: EmptyStateVariant;
	customTitle?: string;
	customSubtitle?: string;
	hideSubtitle?: boolean;
	modelName?: string;
}

interface VariantConfig {
	icon: ElementType;
	iconClassName: string;
	blurClassName: string;
}

const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
	chat: {
		icon: MessageSquare,
		iconClassName: "text-accent-primary",
		blurClassName: "bg-accent-primary/20",
	},
	photo: {
		icon: Wand2,
		iconClassName: "text-accent-primary",
		blurClassName: "bg-accent-primary/20",
	},
	doc: {
		icon: FileText,
		iconClassName: "text-blue-500",
		blurClassName: "bg-blue-500/10",
	},
	canvas: {
		icon: LayoutGrid,
		iconClassName: "text-purple-500",
		blurClassName: "bg-purple-500/10",
	},
};

export function EmptyState({
	variant = "chat",
	customTitle,
	customSubtitle,
	hideSubtitle = false,
	modelName,
}: EmptyStateProps) {
	const { t, language } = useTranslation();
	const config = variantConfigs[variant];
	const Icon = config.icon;

	const variantTexts = t.emptyState[variant];
	const formatPhotoSubtitle = (modelLabel: string): string => {
		const template = t.emptyState.photo.subtitleWithModel;
		if (template) {
			return template.replace(/\{\{\s*model\s*\}\}/gi, modelLabel);
		}
		const fallbackPt = `Imagine, descreva e crie. Use o poder do ${modelLabel} para dar vida às suas ideias.`;
		const fallbackEn = `Imagine, describe and create. Harness the power of ${modelLabel} to bring your ideas to life.`;
		return language === "en-US" ? fallbackEn : fallbackPt;
	};

	// Para Photo com modelName, gerar subtítulo dinâmico
	const getSubtitle = (): string => {
		if (customSubtitle) return customSubtitle;
		if (variant === "photo" && modelName) {
			return formatPhotoSubtitle(modelName);
		}
		return variantTexts.subtitle;
	};

	const subtitle = getSubtitle();
	const shouldHideSubtitle =
		hideSubtitle || (variant === "chat" && !customSubtitle);

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
				{variant === "chat" && !customTitle ? (
					<>
						{t.welcome.line1}
						<br />
						{t.welcome.line2}
					</>
				) : (
					(customTitle ?? variantTexts.title)
				)}
			</motion.h1>

			{variant === "chat" && !customTitle && (
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
					className="mt-10 w-full"
				>
					<ModeCards />
				</motion.div>
			)}

			{!shouldHideSubtitle && (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.4, delay: 0.3 }}
					className="max-w-sm text-base text-text-secondary sm:text-lg"
				>
					{subtitle}
				</motion.p>
			)}
		</motion.div>
	);
}
