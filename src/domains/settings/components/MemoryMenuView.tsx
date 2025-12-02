import { motion } from "framer-motion";
import { ChevronRight, Clock, Database } from "lucide-react";
import type { SettingsView } from "./SettingsModal";

interface MemoryMenuViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function MemoryMenuView({ pushView }: MemoryMenuViewProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			className="space-y-4"
		>
			{/* Facts Card */}
			<button
				type="button"
				onClick={() => pushView("memory-facts")}
				className="w-full bg-bg-surface border border-border-default rounded-xl p-4 flex flex-col gap-3 hover:border-accent-primary/50 transition-colors text-left group"
			>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 group-hover:text-blue-400 transition-colors">
							<Database className="w-6 h-6" />
						</div>
						<span className="font-semibold text-lg text-text-primary">
							Fatos Memorizados
						</span>
					</div>
					<ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
				</div>
				<p className="text-sm text-text-secondary leading-relaxed">
					Permita que Zane lembre conteúdos relevantes dos diálogos. Estes
					conteúdos serão usados dinamicamente para lembrar Zane de fatos
					importantes.
				</p>
			</button>

			{/* Timeline Card */}
			<button
				type="button"
				onClick={() => pushView("memory-timeline")}
				className="w-full bg-bg-surface border border-border-default rounded-xl p-4 flex flex-col gap-3 hover:border-accent-primary/50 transition-colors text-left group"
			>
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-3">
						<div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 group-hover:text-purple-400 transition-colors">
							<Clock className="w-6 h-6" />
						</div>
						<span className="font-semibold text-lg text-text-primary">
							Linha do Tempo
						</span>
					</div>
					<ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
				</div>
				<p className="text-sm text-text-secondary leading-relaxed">
					Permita que Zane crie uma linha temporal das suas interações. Zane usa
					para entender cronologia de projetos e comparar eventos passados.
				</p>
			</button>
		</motion.div>
	);
}

export default MemoryMenuView;
