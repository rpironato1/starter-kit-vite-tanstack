import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	ArrowUpRight,
	FileText,
	LayoutGrid,
	type LucideIcon,
	MessageSquare,
	Wand2,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "@/shared/hooks/useTranslation";
import { cn } from "@/lib/utils";

interface ModeCardsProps {
	className?: string;
}

type ModeKey = "chat" | "canvas" | "doc" | "photo";

interface ModeConfig {
	icon: LucideIcon;
	path: string;
	accent: string;
	glow: string;
}

const MODE_CONFIGS: Record<ModeKey, ModeConfig> = {
	chat: {
		icon: MessageSquare,
		path: "/",
		accent: "text-accent-primary",
		glow: "from-accent-primary/25 via-emerald-500/5 to-transparent",
	},
	canvas: {
		icon: LayoutGrid,
		path: "/canvas",
		accent: "text-purple-400",
		glow: "from-purple-500/20 via-purple-700/5 to-transparent",
	},
	doc: {
		icon: FileText,
		path: "/doc",
		accent: "text-blue-400",
		glow: "from-blue-500/20 via-blue-700/5 to-transparent",
	},
	photo: {
		icon: Wand2,
		path: "/photo",
		accent: "text-emerald-300",
		glow: "from-emerald-400/25 via-emerald-600/5 to-transparent",
	},
};

const MODE_ORDER: ModeKey[] = ["chat", "canvas", "doc", "photo"];

export function ModeCards({ className }: ModeCardsProps) {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();

	const cards = useMemo(
		() =>
			MODE_ORDER.map((key) => ({
				key,
				config: MODE_CONFIGS[key],
				text: t.modes[key],
			})),
		[t],
	);

	return (
		<div className={cn("w-full", className)}>
			<div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2">
				{cards.map(({ key, config, text }) => {
					const Icon = config.icon;
					const isActive = location.pathname === config.path;

					return (
						<button
							key={key}
							type="button"
							onClick={() => navigate({ to: config.path })}
							aria-pressed={isActive}
							className={cn(
								"group relative overflow-hidden rounded-[28px] border border-white/5 bg-bg-surface/60 p-5 text-left shadow-lg shadow-black/20 transition-all duration-300",
								"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/60",
								isActive
									? "border-accent-primary/70 shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
									: "hover:border-accent-primary/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.55)]",
							)}
						>
							<span
								aria-hidden
								className={cn(
									"pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
									"bg-gradient-to-br",
									config.glow,
								)}
							/>
							<div className="relative flex items-center justify-between gap-3">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-bg-main/70">
									<Icon className={cn("h-5 w-5", config.accent)} />
								</div>
								<span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-text-secondary">
									{text.meta}
								</span>
							</div>
							<div className="relative mt-4 space-y-2">
								<h3 className="font-serif text-2xl text-text-primary">
									{text.title}
								</h3>
								<p className="text-sm text-text-secondary">
									{text.description}
								</p>
							</div>
							<span className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
								{text.action}
								<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
