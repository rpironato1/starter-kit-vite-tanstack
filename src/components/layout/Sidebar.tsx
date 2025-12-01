import { useLocation, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
	ChevronDown,
	FileText,
	History,
	ImageIcon,
	LayoutGrid,
	MessageSquare,
	Plus,
} from "lucide-react";
import { type ReactNode, useState } from "react";
import { Backdrop } from "@/components/ui/backdrop";
import { useTranslation } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";

// Dados mockados para histórico
const defaultHistory = [
	{
		id: "chat-1",
		title: "Conversa sobre React",
		timestamp: new Date("2024-11-25"),
	},
	{
		id: "chat-2",
		title: "Análise de documentos",
		timestamp: new Date("2024-11-24"),
	},
	{
		id: "chat-3",
		title: "Geração de imagens",
		timestamp: new Date("2024-11-23"),
	},
];

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
	labelKey: "chats" | "photo" | "doc" | "canvas";
	icon: ReactNode;
	href?: string;
}

const menuItems: MenuItem[] = [
	{
		id: "chat",
		labelKey: "chats",
		icon: <MessageSquare className="w-5 h-5" />,
	},
	{
		id: "photo",
		labelKey: "photo",
		icon: <ImageIcon className="w-5 h-5" />,
	},
	{
		id: "doc",
		labelKey: "doc",
		icon: <FileText className="w-5 h-5" />,
	},
	{
		id: "canvas",
		labelKey: "canvas",
		icon: <LayoutGrid className="w-5 h-5" />,
	},
];

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
	onNewChat: () => void;
	onOpenSettings: () => void;
	currentView?: "chat" | "photo" | "doc" | "canvas";
	userName?: string;
	userInitials?: string;
	activeChatId?: string | null;
	onSelectChat?: (chatId: string) => void;
	chatHistory?: Array<{ id: string; title: string; timestamp: Date }>;
}

export function Sidebar({
	isOpen,
	onClose,
	onNewChat,
	onOpenSettings,
	currentView,
	userName = "Usuário",
	userInitials = "U",
	activeChatId,
	onSelectChat,
	chatHistory,
}: SidebarProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const { t } = useTranslation();
	const [historyExpanded, setHistoryExpanded] = useState(false);
	const history = chatHistory ?? defaultHistory;

	// Calcular view ativa baseado na URL (com override opcional via prop)
	const activeView =
		currentView ??
		(location.pathname === "/"
			? "chat"
			: (location.pathname.slice(1) as "photo" | "doc" | "canvas"));

	const handleNavigate = (viewId: string) => {
		const route = viewId === "chat" ? "/" : `/${viewId}`;
		navigate({ to: route });
		onClose();
	};

	return (
		<>
			{/* Backdrop */}
			<Backdrop isOpen={isOpen} onClick={onClose} />

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
						{/* Header */}
						<div className="pt-14" />

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
										activeView === item.id
											? "bg-bg-hover text-text-primary font-medium border border-border-default/50"
											: "text-text-secondary hover:bg-bg-hover hover:text-text-primary border border-transparent",
									)}
								>
									{item.icon}
									<span className="font-medium text-[15px]">
										{t.sidebar[item.labelKey]}
									</span>
								</motion.button>
							))}
						</nav>

						{/* History Accordion Section */}
						<motion.div
							variants={itemVariants}
							className="px-3 py-2 flex-1 overflow-hidden"
						>
							<button
								type="button"
								onClick={() => setHistoryExpanded(!historyExpanded)}
								className="flex items-center justify-between w-full px-3 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-bg-hover"
							>
								<span className="flex items-center gap-2">
									<History className="w-4 h-4" />
									{t.sidebar.history}
								</span>
								<ChevronDown
									className={cn(
										"w-4 h-4 transition-transform duration-200",
										historyExpanded && "rotate-180",
									)}
								/>
							</button>

							<AnimatePresence>
								{historyExpanded && (
									<motion.div
										initial={{ height: 0, opacity: 0 }}
										animate={{ height: "auto", opacity: 1 }}
										exit={{ height: 0, opacity: 0 }}
										transition={{ duration: 0.2 }}
										className="overflow-hidden"
									>
										<div className="py-1 space-y-1">
											{history.length > 0 ? (
												history.map((chat) => (
													<button
														key={chat.id}
														type="button"
														onClick={() => {
															onSelectChat?.(chat.id);
															onClose();
														}}
														className={cn(
															"w-full px-3 py-2 text-left text-sm truncate rounded-lg transition-colors",
															"hover:bg-bg-hover",
															activeChatId === chat.id
																? "bg-bg-hover text-text-primary font-medium"
																: "text-text-secondary hover:text-text-primary",
														)}
													>
														{chat.title}
													</button>
												))
											) : (
												<div className="px-3 py-2 text-xs text-text-secondary italic">
													{t.sidebar.noHistory}
												</div>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>

						{/* User Badge + Plus Row */}
						<motion.div
							variants={itemVariants}
							className="p-4 border-t border-border-default space-y-2"
						>
							<div className="flex items-center gap-3 rounded-[32px] border border-border-default/60 bg-bg-surface/80 p-3 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
								<button
									type="button"
									onClick={onOpenSettings}
									title={t.settings.title}
									aria-label={t.settings.title}
									className="group flex flex-1 items-center gap-3 rounded-2xl text-left"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default/40 bg-bg-hover text-base font-bold text-text-primary transition-colors group-hover:border-accent-primary/40 group-hover:bg-accent-primary/10">
										{userInitials}
									</div>
									<div className="min-w-0">
										<p className="truncate text-sm font-semibold text-text-primary">
											{userName}
										</p>
										<p className="text-xs text-text-secondary">
											{t.plan.accountPlan}:{" "}
											<span className="font-semibold text-text-primary">
												{t.plan.currentPlanName}
											</span>
										</p>
									</div>
								</button>
								<button
									type="button"
									onClick={() => {
										handleNavigate("chat");
										onNewChat();
									}}
									title={t.sidebar.newChat}
									aria-label={t.sidebar.newChat}
									className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-primary text-white shadow-lg shadow-green-900/30 transition-transform duration-200 hover:scale-105"
								>
									<Plus className="h-5 w-5" />
								</button>
							</div>
							<p className="text-center text-[11px] font-semibold uppercase tracking-[0.4em] text-text-secondary">
								{t.sidebar.newChat}
							</p>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
