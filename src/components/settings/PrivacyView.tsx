import { useState } from "react";
import { History, Share2, Trash2, Shield } from "lucide-react";
import type { SettingsView } from "./SettingsModal";
import { SettingsItem } from "./SettingsItem";
import { ZaneToggle } from "@/components/ui/switch";

interface PrivacyViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function PrivacyView(_props: PrivacyViewProps) {
	const [saveHistory, setSaveHistory] = useState(true);
	const [shareData, setShareData] = useState(false);
	const [anonymousUsage, setAnonymousUsage] = useState(true);

	const handleDeleteData = () => {
		// TODO: Implement delete data confirmation
		console.log("Delete data clicked");
	};

	return (
		<div className="space-y-6">
			{/* Privacy Toggles */}
			<div className="space-y-2">
				<SettingsItem
					icon={History}
					label="Conversation History"
					description="Save your chat history"
					rightElement={
						<ZaneToggle
							isOn={saveHistory}
							onToggle={() => setSaveHistory(!saveHistory)}
						/>
					}
				/>

				<SettingsItem
					icon={Share2}
					label="Data Sharing"
					description="Help improve AI with your data"
					rightElement={
						<ZaneToggle
							isOn={shareData}
							onToggle={() => setShareData(!shareData)}
						/>
					}
				/>

				<SettingsItem
					icon={Shield}
					label="Anonymous Analytics"
					description="Send anonymous usage data"
					rightElement={
						<ZaneToggle
							isOn={anonymousUsage}
							onToggle={() => setAnonymousUsage(!anonymousUsage)}
						/>
					}
				/>
			</div>

			{/* Info Section */}
			<div className="bg-bg-surface rounded-xl p-4">
				<h4 className="text-sm font-medium text-text-primary mb-2">
					Your Privacy Matters
				</h4>
				<p className="text-xs text-text-secondary leading-relaxed">
					We take your privacy seriously. Your conversations are encrypted and
					stored securely. You can delete your data at any time.
				</p>
			</div>

			{/* Danger Zone */}
			<div className="pt-4">
				<p className="text-xs text-text-secondary uppercase tracking-wide mb-2 px-1">
					Danger Zone
				</p>
				<SettingsItem
					icon={Trash2}
					label="Delete All Data"
					description="Permanently delete all your data"
					onClick={handleDeleteData}
					destructive
				/>
			</div>
		</div>
	);
}
