import {
	Brain,
	Clock,
	Download,
	Fingerprint,
	ShieldCheck,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { ZaneToggle } from "@/components/ui/switch";
import { SettingsItem } from "./SettingsItem";
import type { SettingsView } from "./SettingsModal";

interface PrivacyViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function PrivacyView(_props: PrivacyViewProps) {
	const [modelTraining, setModelTraining] = useState(false);
	const [biometricAuth, setBiometricAuth] = useState(false);
	const [contentFilter, setContentFilter] = useState(true);

	const handleExport = () => {
		// TODO: Implement data export
		console.log("Export data clicked");
	};

	const handleDeleteAccount = () => {
		// TODO: Implement delete account confirmation
		console.log("Delete account clicked");
	};

	return (
		<div className="space-y-6">
			{/* Dados e IA */}
			<div>
				<h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 mb-2">
					Dados e IA
				</h4>
				<div className="space-y-1">
					<SettingsItem
						icon={Brain}
						label="Treinamento de modelo"
						rightElement={
							<ZaneToggle
								isOn={modelTraining}
								onToggle={() => setModelTraining(!modelTraining)}
							/>
						}
					/>
					<p className="text-xs text-text-secondary px-4 pb-4">
						Permitir que suas conversas melhorem a IA.
					</p>
					<SettingsItem
						icon={Clock}
						label="Retenção de histórico"
						description="90 dias"
					/>
				</div>
			</div>

			{/* Segurança */}
			<div>
				<h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 mb-2">
					Segurança
				</h4>
				<div className="space-y-1">
					<SettingsItem
						icon={Fingerprint}
						label="Autenticação biométrica"
						rightElement={
							<ZaneToggle
								isOn={biometricAuth}
								onToggle={() => setBiometricAuth(!biometricAuth)}
							/>
						}
					/>
					<p className="text-xs text-text-secondary px-4 pb-4">
						Use Face ID ou impressão digital para desbloquear.
					</p>
					<SettingsItem
						icon={ShieldCheck}
						label="Filtro de conteúdo"
						rightElement={
							<ZaneToggle
								isOn={contentFilter}
								onToggle={() => setContentFilter(!contentFilter)}
							/>
						}
					/>
					<p className="text-xs text-text-secondary px-4 pb-4">
						Bloquear conteúdo potencialmente ofensivo.
					</p>
				</div>
			</div>

			{/* Seus Direitos */}
			<div>
				<h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 mb-2">
					Seus Direitos
				</h4>
				<div className="space-y-1">
					<SettingsItem
						icon={Download}
						label="Exportar meus dados"
						onClick={handleExport}
					/>
					<p className="text-xs text-text-secondary px-4 pb-4">
						Baixe uma cópia de todos os seus dados.
					</p>
					<SettingsItem
						icon={Trash2}
						label="Excluir minha conta"
						onClick={handleDeleteAccount}
						destructive
					/>
				</div>
			</div>
		</div>
	);
}
