import { Check, Sparkles } from "lucide-react";
import type { SettingsView } from "./SettingsModal";

interface PlanViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

const FREE_BENEFITS = [
	"Basic AI conversations",
	"Limited message history",
	"Standard response time",
];

const PRO_BENEFITS = [
	"Unlimited AI conversations",
	"Full message history",
	"Priority response time",
	"Advanced AI models",
	"Custom instructions",
	"API access",
];

export function PlanView(_props: PlanViewProps) {
	// TODO: Replace with actual plan data
	const currentPlan = "free" as "free" | "pro";
	const isPro = currentPlan === "pro";

	const handleUpgrade = () => {
		// TODO: Implement upgrade flow
		console.log("Upgrade clicked");
	};

	return (
		<div className="space-y-6">
			{/* Current Plan Card */}
			<div className="bg-bg-surface rounded-xl p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center">
						<Sparkles className="w-6 h-6 text-accent-primary" />
					</div>
					<div>
						<p className="text-xs text-text-secondary uppercase tracking-wide">
							Current Plan
						</p>
						<p className="text-xl font-semibold text-text-primary">
							{isPro ? "Pro" : "Free"}
						</p>
					</div>
				</div>

				<div className="space-y-3">
					{(isPro ? PRO_BENEFITS : FREE_BENEFITS).map((benefit) => (
						<div key={benefit} className="flex items-center gap-3">
							<Check className="w-4 h-4 text-accent-primary shrink-0" />
							<span className="text-sm text-text-secondary">{benefit}</span>
						</div>
					))}
				</div>
			</div>

			{/* Upgrade Card (only show for free users) */}
			{!isPro && (
				<div className="bg-gradient-to-br from-accent-primary/20 to-accent-primary/5 rounded-xl p-6 border border-accent-primary/30">
					<h3 className="text-lg font-semibold text-text-primary mb-2">
						Upgrade to Pro
					</h3>
					<p className="text-sm text-text-secondary mb-4">
						Unlock all features and get the most out of Zane AI.
					</p>

					<div className="space-y-2 mb-6">
						{PRO_BENEFITS.slice(0, 3).map((benefit) => (
							<div key={benefit} className="flex items-center gap-3">
								<Check className="w-4 h-4 text-accent-primary shrink-0" />
								<span className="text-sm text-text-primary">{benefit}</span>
							</div>
						))}
					</div>

					<button
						type="button"
						onClick={handleUpgrade}
						className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors"
					>
						<Sparkles className="w-5 h-5" />
						Upgrade Now
					</button>
				</div>
			)}
		</div>
	);
}
