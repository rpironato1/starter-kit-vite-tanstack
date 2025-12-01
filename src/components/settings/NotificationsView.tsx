import { Bell, Zap } from "lucide-react";
import { useState } from "react";
import { ZaneToggle } from "@/components/ui/switch";
import { SettingsItem } from "./SettingsItem";
import type { SettingsView } from "./SettingsModal";

interface NotificationsViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function NotificationsView(_props: NotificationsViewProps) {
	const [responsesEnabled, setResponsesEnabled] = useState(true);
	const [newsEnabled, setNewsEnabled] = useState(false);

	return (
		<div className="space-y-6">
			{/* Notifications Toggles */}
			<div className="space-y-2">
				<SettingsItem
					icon={Bell}
					label="Notificações de respostas"
					description="Receba um aviso quando suas consultas forem respondidas."
					rightElement={
						<ZaneToggle
							isOn={responsesEnabled}
							onToggle={() => setResponsesEnabled(!responsesEnabled)}
						/>
					}
				/>

				<SettingsItem
					icon={Zap}
					label="Novidades e atualizações"
					description="Fique por dentro das últimas novidades do Zane."
					rightElement={
						<ZaneToggle
							isOn={newsEnabled}
							onToggle={() => setNewsEnabled(!newsEnabled)}
						/>
					}
				/>
			</div>

			{/* Info Section */}
			<div className="bg-bg-surface rounded-xl p-4">
				<h4 className="text-sm font-medium text-text-primary mb-2">
					Sobre as Notificações
				</h4>
				<p className="text-xs text-text-secondary leading-relaxed">
					As notificações ajudam você a se manter atualizado sobre suas
					conversas e novidades do Zane. Você pode ativá-las ou desativá-las a
					qualquer momento.
				</p>
			</div>
		</div>
	);
}
