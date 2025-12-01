import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ZaneBadge } from "@/components/ui/zane-badge";
import { useTranslation } from "@/hooks/useI18n";
import { TodoListPanel } from "./TodoListPanel";

interface ReasoningBubbleProps {
	steps: string[];
}

export function ReasoningBubble({ steps }: ReasoningBubbleProps) {
	const { t } = useTranslation();

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
			transition={{ type: "spring", stiffness: 400, damping: 35 }}
			className="flex w-full justify-start"
		>
			<div className="w-full max-w-3xl space-y-4">
				<div className="pl-1">
					<ZaneBadge variant="default" />
				</div>
				<div className="space-y-4 rounded-[28px] border border-border-default/50 bg-bg-surface/70 p-5 shadow-lg shadow-black/20">
					<div className="space-y-1">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-secondary">
							{t.canvasView.reasoningTitle}
						</p>
						<p className="text-base text-text-primary">
							{t.canvasView.reasoningSubtitle}
						</p>
					</div>
					<TodoListPanel items={steps} />
					<div className="flex items-center gap-2 text-xs text-text-secondary">
						<Loader2 className="h-4 w-4 animate-spin text-accent-primary" />
						<span>{t.sidebar.canvas}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
