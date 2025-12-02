import { Crown, RotateCcw } from "lucide-react";
import type { SettingsView } from "./SettingsModal";

interface PlanViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function PlanView(_props: PlanViewProps) {
	const handleManageAccount = () => {
		// TODO: Implement manage account flow
		console.log("Manage account clicked");
	};

	const handleRestorePurchases = () => {
		// TODO: Implement restore purchases flow
		console.log("Restore purchases clicked");
	};

	return (
		<div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center space-y-6 bg-bg-modal no-scrollbar">
			<div className="flex flex-col items-center text-center space-y-4">
				<div className="w-20 h-20 rounded-full bg-accent-primary/20 flex items-center justify-center">
					<Crown className="w-10 h-10 text-accent-primary" />
				</div>
				<div>
					<p className="text-sm text-text-secondary">Plano atual</p>
					<h2 className="text-3xl font-bold text-text-primary mt-1">Pro</h2>
				</div>
			</div>

			<button
				type="button"
				onClick={handleManageAccount}
				className="w-full max-w-xs py-3 bg-bg-surface rounded-xl text-text-primary font-semibold hover:bg-bg-hover transition-colors flex items-center justify-center gap-2"
			>
				Gerenciar Conta
			</button>

			<button
				type="button"
				onClick={handleRestorePurchases}
				className="flex items-center justify-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
			>
				<RotateCcw className="w-4 h-4" />
				Restaurar Compras
			</button>
		</div>
	);
}
