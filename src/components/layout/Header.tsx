import { ChevronDown, Menu } from "lucide-react";
import type { ReactNode, RefObject } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface HeaderProps {
	onMenuClick: () => void;
	onModelClick?: () => void;
	currentModel: string;
	hideModelSelector?: boolean;
	modelMenuOpen?: boolean;
	showAvatar?: boolean;
	onAvatarClick: () => void;
	className?: string;
	rightSlot?: ReactNode;
	modelButtonRef?: RefObject<HTMLButtonElement | null> | null;
}

export function Header({
	onMenuClick,
	onModelClick,
	currentModel,
	hideModelSelector = false,
	modelMenuOpen = false,
	showAvatar = true,
	onAvatarClick,
	className,
	rightSlot,
	modelButtonRef,
}: HeaderProps) {
	const { t } = useTranslation();

	return (
		<header
			className={cn(
				"flex justify-between items-center p-4 z-10 relative shrink-0",
				"h-16 bg-bg-main/80 backdrop-blur-md",
				className,
			)}
		>
			{/* Menu Button (Left) */}
			<button
				type="button"
				onClick={onMenuClick}
				className="p-2 rounded-full hover:bg-bg-hover transition-colors"
				aria-label={t.sidebar.menu}
			>
				<Menu className="w-6 h-6 text-text-secondary" />
			</button>

			{/* Model Selector (Center) */}
			{hideModelSelector ? (
				<span className="text-text-primary font-medium">{currentModel}</span>
			) : (
				<button
					type="button"
					onClick={onModelClick}
					ref={modelButtonRef}
					className="flex items-center gap-2 text-text-primary font-medium hover:text-text-secondary transition-colors"
					aria-label={t.models.selectModel}
					aria-haspopup="dialog"
					aria-expanded={modelMenuOpen}
				>
					<span
						className={cn(
							currentModel.includes("Ultra") && "text-amber-400 font-bold",
						)}
					>
						{currentModel}
					</span>
					<ChevronDown
						className={cn(
							"w-4 h-4 text-text-secondary transition-transform duration-300",
							modelMenuOpen && "rotate-180",
						)}
					/>
				</button>
			)}

			{/* Avatar/Actions */}
			<div className="flex items-center gap-2">
				{rightSlot}
				{showAvatar ? (
					<button
						type="button"
						onClick={onAvatarClick}
						className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-hover text-sm font-bold text-text-primary transition-colors hover:bg-bg-hover/80"
						aria-label={t.settings.title}
					>
						U
					</button>
				) : (
					<div className="w-10" />
				)}
			</div>
		</header>
	);
}
