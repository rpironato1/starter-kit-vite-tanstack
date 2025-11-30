import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { SettingsView } from "./SettingsModal";

interface MemoryTimelineViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

interface TimelineEvent {
	id: string;
	content: string;
	eventDate: Date;
}

const mockEvents: TimelineEvent[] = [
	{
		id: "1",
		content: "Primeira conversa iniciada",
		eventDate: new Date("2024-01-15"),
	},
	{
		id: "2",
		content: "Configurou preferências de tema",
		eventDate: new Date("2024-02-20"),
	},
	{
		id: "3",
		content: "Criou primeiro projeto Canvas",
		eventDate: new Date("2024-03-10"),
	},
];

export function MemoryTimelineView(_props: MemoryTimelineViewProps) {
	const events = mockEvents;

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			className="space-y-6"
		>
			{/* Warning Card */}
			<div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3">
				<AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
				<p className="text-sm text-yellow-600 dark:text-yellow-500 leading-relaxed">
					A linha do tempo não pode ser modificada item a item. Use "Limpar
					Histórico" nas configurações de privacidade.
				</p>
			</div>

			{/* Timeline */}
			{events.length === 0 ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center py-16"
				>
					<p className="text-text-secondary text-sm italic">
						Nenhum evento registrado ainda.
					</p>
				</motion.div>
			) : (
				<div className="relative pl-4">
					{/* Vertical Line */}
					<div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-border-default" />

					{/* Events */}
					<div className="space-y-8">
						{events.map((event, index) => (
							<motion.div
								key={event.id}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: index * 0.1 }}
								className="relative pl-8"
							>
								{/* Dot */}
								<div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-accent-primary ring-4 ring-bg-modal" />

								{/* Date */}
								<span className="text-xs font-bold text-accent-primary mb-1 block uppercase tracking-wider">
									{event.eventDate.toLocaleDateString("pt-BR", {
										day: "2-digit",
										month: "short",
										year: "numeric",
									})}
								</span>

								{/* Content Card */}
								<div className="bg-bg-surface border border-border-default rounded-xl p-4">
									<p className="text-[15px] text-text-primary">
										{event.content}
									</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			)}
		</motion.div>
	);
}

export default MemoryTimelineView;
