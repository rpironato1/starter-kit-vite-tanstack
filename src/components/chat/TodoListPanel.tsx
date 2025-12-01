import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ListTodo } from "lucide-react";
import { useState } from "react";

interface TodoListPanelProps {
	items: string[];
}

const stripMarkdown = (text: string): string => {
	return text
		.replace(/^\d+[.)]\s*/gm, "") // Remove 1. ou 1)
		.replace(/^[-*]\s*/gm, "") // Remove - ou *
		.replace(/\*\*/g, "") // Remove **bold**
		.replace(/\*/g, "") // Remove *italic*
		.replace(/`/g, "") // Remove `code`
		.trim();
};

export function TodoListPanel({ items }: TodoListPanelProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!items || items.length === 0) return null;

	return (
		<div className="mb-4 w-full">
			<div className="overflow-hidden rounded-2xl border border-border-default/60 bg-bg-surface/70 backdrop-blur">
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-bg-hover/60"
					aria-expanded={isExpanded}
				>
					<div className="flex items-center gap-3">
						<div
							className={`rounded-lg p-1.5 transition-colors ${
								isExpanded
									? "bg-accent-primary text-white"
									: "bg-bg-hover text-text-secondary"
							}`}
						>
							<ListTodo className="h-4 w-4" />
						</div>
						<div className="text-text-primary">
							<p className="text-[12px] font-semibold uppercase tracking-wider">
								Planejamento
							</p>
							<p className="text-[11px] font-mono uppercase text-text-secondary">
								{items.length} etapas
							</p>
						</div>
					</div>
					<ChevronDown
						className={`h-4 w-4 text-text-secondary transition-transform duration-300 ${
							isExpanded ? "-scale-y-100" : ""
						}`}
					/>
				</button>

				<AnimatePresence initial={false}>
					{isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.25 }}
							className="overflow-hidden border-t border-border-default/50 bg-bg-modal/40"
						>
							<div className="space-y-3 px-4 py-4">
								{items.map((item) => {
									const itemKey = `todo-${item
										.slice(0, 30)
										.replace(/\W/g, "")}-${item.length}`;
									return (
										<div
											key={itemKey}
											className="flex items-start gap-3 rounded-xl bg-bg-surface/40 p-2 text-sm text-text-secondary"
										>
											<CheckCircle2 className="mt-0.5 h-4 w-4 text-accent-primary" />
											<span className="leading-relaxed">
												{stripMarkdown(item)}
											</span>
										</div>
									);
								})}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

export default TodoListPanel;
