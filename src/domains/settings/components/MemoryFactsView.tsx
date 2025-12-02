import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { SettingsView } from "./SettingsModal";

interface MemoryFactsViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

interface MemoryFact {
	id: string;
	content: string;
	importanceScore: number;
	createdAt: Date;
}

const mockFacts: MemoryFact[] = [
	{
		id: "1",
		content: "Prefere respostas concisas e diretas",
		importanceScore: 0.85,
		createdAt: new Date(),
	},
	{
		id: "2",
		content: "Trabalha com desenvolvimento de software",
		importanceScore: 0.9,
		createdAt: new Date(),
	},
	{
		id: "3",
		content: "Usa TanStack como stack principal",
		importanceScore: 0.75,
		createdAt: new Date(),
	},
];

export function MemoryFactsView(_props: MemoryFactsViewProps) {
	const [facts, setFacts] = useState<MemoryFact[]>(mockFacts);

	const handleDeleteFact = (id: string) => {
		// TODO: Implement actual delete logic
		setFacts((prev) => prev.filter((fact) => fact.id !== id));
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			className="space-y-4"
		>
			{facts.length === 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-16"
				>
					<div className="w-16 h-16 mx-auto mb-4 bg-bg-surface rounded-full flex items-center justify-center">
						<div className="w-3 h-3 rounded-full bg-accent-primary/50" />
					</div>
					<p className="text-text-secondary text-sm italic">
						Nenhuma memória salva ainda.
					</p>
					<p className="text-text-secondary text-xs mt-2">
						Zane aprenderá sobre você durante as conversas.
					</p>
				</motion.div>
			) : (
				facts.map((fact, index) => (
					<motion.div
						key={fact.id}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.05 }}
						className="bg-bg-surface border border-border-default rounded-xl p-4 flex gap-3"
					>
						{/* Green Bullet */}
						<div className="mt-1.5 shrink-0">
							<div className="w-2.5 h-2.5 rounded-full bg-accent-primary" />
						</div>

						{/* Content */}
						<div className="flex-1 min-w-0">
							<p className="text-[15px] text-text-primary leading-relaxed">
								{fact.content}
							</p>
							<div className="flex items-center gap-2 mt-2">
								<span className="text-xs text-text-secondary">
									{fact.createdAt.toLocaleDateString("pt-BR")}
								</span>
								<span className="text-xs text-text-secondary">•</span>
								<span className="text-xs text-accent-primary font-medium">
									Relevância: {(fact.importanceScore * 100).toFixed(0)}%
								</span>
							</div>
						</div>

						{/* Delete Button */}
						<button
							type="button"
							onClick={() => handleDeleteFact(fact.id)}
							aria-label="Excluir memória"
							className="text-text-secondary hover:text-red-400 self-start p-1 transition-colors shrink-0"
						>
							<Trash2 className="w-4 h-4" />
						</button>
					</motion.div>
				))
			)}
		</motion.div>
	);
}

export default MemoryFactsView;
