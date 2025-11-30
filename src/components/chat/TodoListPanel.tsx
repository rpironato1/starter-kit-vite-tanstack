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
			<div className="bg-bg-surface rounded-xl border border-border-default overflow-hidden">
				{/* Header */}
				<button
					type="button"
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-full flex items-center justify-between p-3 hover:bg-bg-hover transition-colors group"
				>
					<div className="flex items-center gap-3">
						<div
							className={`p-1.5 rounded-md transition-colors ${
								isExpanded
									? "bg-accent-primary text-white"
									: "bg-bg-hover text-text-secondary group-hover:text-text-primary"
							}`}
						>
							<ListTodo className="w-3.5 h-3.5" />
						</div>
						<span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
							Planejamento
						</span>
						<div className="h-4 w-px bg-border-default mx-1" />
						<span className="text-[11px] text-text-secondary font-mono">
							{items.length} etapas
						</span>
					</div>

					<ChevronDown
						className={`w-4 h-4 text-text-secondary transition-transform duration-300 ${
							isExpanded ? "rotate-180" : ""
						}`}
					/>
				</button>

				{/* Content */}
				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="overflow-hidden"
						>
							<div className="p-4 border-t border-border-default space-y-3">
								{items.map((item) => {
									const itemKey = `todo-${item.slice(0, 30).replace(/\W/g, "")}-${item.length}`;
									return (
										<div
											key={itemKey}
											className="flex items-start gap-3 hover:bg-bg-hover/50 rounded-lg p-1.5 -m-1.5 transition-colors"
										>
											<CheckCircle2 className="w-4 h-4 text-accent-primary mt-0.5 shrink-0" />
											<span className="text-sm text-text-secondary leading-relaxed">
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
