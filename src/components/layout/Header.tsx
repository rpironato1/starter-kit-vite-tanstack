import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
	onMenuClick: () => void;
	onModelClick?: () => void;
	currentModel: string;
	hideModelSelector?: boolean;
	modelMenuOpen?: boolean;
	showAvatar?: boolean;
	onAvatarClick?: () => void;
	className?: string;
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
}: HeaderProps) {
	return (
		<header
			className={cn(
				"flex justify-between items-center p-4 z-10 relative shrink-0",
				"h-16 bg-bg-main/80 backdrop-blur-md border-b border-border-default/50",
				className,
			)}
		>
			{/* Menu Button (Left) */}
			<button
				type="button"
				onClick={onMenuClick}
				className="p-2 rounded-full hover:bg-bg-hover transition-colors"
				aria-label="Toggle sidebar"
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
					className="flex items-center gap-2 text-text-primary font-medium hover:text-text-secondary transition-colors"
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

			{/* Avatar/Settings Button (Right) */}
			{showAvatar ? (
				<button
					type="button"
					onClick={onAvatarClick}
					className="w-10 h-10 rounded-full bg-bg-hover flex items-center justify-center text-text-primary font-bold text-sm hover:bg-bg-hover/80 transition-colors"
				>
					U
				</button>
			) : (
				<div className="w-10" /> /* Spacer */
			)}
		</header>
	);
}
