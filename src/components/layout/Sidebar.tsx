import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
	MessageSquare,
	ImageIcon,
	FileText,
	LayoutGrid,
	Plus,
	ChevronRight,
} from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { Backdrop } from "@/components/ui/backdrop";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// Variants para animação do sidebar
const sidebarVariants: Variants = {
	closed: {
		x: "-100%",
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
	open: {
		x: "0%",
		transition: {
			type: "spring",
			stiffness: 400,
			damping: 40,
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
};

// Variants para items do menu
const itemVariants: Variants = {
	closed: {
		opacity: 0,
		x: -20,
	},
	open: {
		opacity: 1,
		x: 0,
	},
};

interface MenuItem {
	id: string;
	label: string;
	icon: ReactNode;
	href?: string;
}

const menuItems: MenuItem[] = [
	{
		id: "chat",
		label: "Conversas",
		icon: <MessageSquare className="w-5 h-5" />,
	},
	{
		id: "photo",
		label: "Zane Photo",
		icon: <ImageIcon className="w-5 h-5" />,
	},
	{
		id: "doc",
		label: "Zane Doc",
		icon: <FileText className="w-5 h-5" />,
	},
	{
		id: "canvas",
		label: "Zane Canvas",
		icon: <LayoutGrid className="w-5 h-5" />,
	},
];

interface SidebarProps {
	currentView?: string;
	onNavigate?: (viewId: string) => void;
	onNewChat?: () => void;
	onSettingsClick?: () => void;
	userName?: string;
	userInitials?: string;
}

export function Sidebar({
	currentView = "chat",
	onNavigate,
	onNewChat,
	onSettingsClick,
	userName = "Usuário",
	userInitials = "U",
}: SidebarProps) {
	const { isOpen, close } = useSidebar();

	const handleNavigate = (viewId: string) => {
		onNavigate?.(viewId);
		close();
	};

	return (
		<>
			{/* Backdrop */}
			<Backdrop isOpen={isOpen} onClick={close} />

			{/* Sidebar Panel */}
			<AnimatePresence>
				{isOpen && (
					<motion.aside
						variants={sidebarVariants}
						initial="closed"
						animate="open"
						exit="closed"
						className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-bg-sidebar z-50 border-r border-border-default shadow-2xl text-text-primary flex flex-col"
					>
						{/* Header with New Chat */}
						<motion.div
							variants={itemVariants}
							className="p-4 flex items-center justify-between"
						>
							<h2 className="text-lg font-semibold">Menu</h2>
							<button
								type="button"
								onClick={onNewChat}
								title="Nova conversa"
								aria-label="Nova conversa"
								className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center text-white shadow-lg shadow-green-900/20 active:scale-95 transition-transform hover:bg-accent-hover"
							>
								<Plus className="w-6 h-6" />
							</button>
						</motion.div>

						{/* Navigation Menu */}
						<nav className="flex-1 px-3 py-2 space-y-1">
							{menuItems.map((item) => (
								<motion.button
									key={item.id}
									variants={itemVariants}
									type="button"
									onClick={() => handleNavigate(item.id)}
									className={cn(
										"w-full flex items-center gap-3 p-3 rounded-xl transition-colors",
										currentView === item.id
											? "bg-bg-hover text-text-primary font-medium border border-border-default/50"
											: "text-text-secondary hover:bg-bg-hover hover:text-text-primary border border-transparent"
									)}
								>
									{item.icon}
									<span className="font-medium text-[15px]">{item.label}</span>
								</motion.button>
							))}
						</nav>

						{/* History Section (placeholder) */}
						<motion.div variants={itemVariants} className="px-4 py-2">
							<div className="flex items-center justify-between text-text-secondary text-xs font-medium uppercase tracking-wider mb-2">
								<span>Histórico</span>
								<ChevronRight className="w-4 h-4" />
							</div>
							<div className="text-text-secondary text-sm italic">
								Nenhum histórico
							</div>
						</motion.div>

						{/* User Profile Button */}
						<motion.div
							variants={itemVariants}
							className="p-4 border-t border-border-default"
						>
							<button
								type="button"
								onClick={onSettingsClick}
								title="Configurações do usuário"
								aria-label="Configurações do usuário"
								className="flex items-center gap-3 bg-bg-surface p-2 pr-4 rounded-full border border-border-default hover:bg-bg-hover transition-colors w-full text-left group"
							>
								<div className="w-8 h-8 rounded-full bg-bg-hover flex items-center justify-center text-xs font-bold text-text-primary group-hover:bg-accent-primary group-hover:text-white transition-colors">
									{userInitials}
								</div>
								<span className="text-sm text-text-primary font-medium truncate flex-1">
									{userName}
								</span>
								<ChevronRight className="w-4 h-4 text-text-secondary" />
							</button>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
