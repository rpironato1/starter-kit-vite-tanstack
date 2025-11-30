import { useState } from "react";
import { MessageSquare, Calendar, Trash2, Search } from "lucide-react";
import type { SettingsView } from "./SettingsModal";
import { SettingsItem } from "./SettingsItem";
import { ZaneToggle } from "@/components/ui/switch";

interface MemoryViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function MemoryView(_props: MemoryViewProps) {
	const [rememberContext, setRememberContext] = useState(true);
	const [searchEnabled, setSearchEnabled] = useState(true);

	// TODO: Replace with actual data
	const stats = {
		conversations: 42,
		messages: 1337,
		since: "Jan 2024",
	};

	const handleClearHistory = () => {
		// TODO: Implement clear history confirmation
		console.log("Clear history clicked");
	};

	return (
		<div className="space-y-6">
			{/* Stats Overview */}
			<div className="grid grid-cols-3 gap-3">
				<div className="bg-bg-surface rounded-xl p-4 text-center">
					<p className="text-2xl font-semibold text-text-primary">
						{stats.conversations}
					</p>
					<p className="text-xs text-text-secondary">Conversations</p>
				</div>
				<div className="bg-bg-surface rounded-xl p-4 text-center">
					<p className="text-2xl font-semibold text-text-primary">
						{stats.messages}
					</p>
					<p className="text-xs text-text-secondary">Messages</p>
				</div>
				<div className="bg-bg-surface rounded-xl p-4 text-center">
					<p className="text-sm font-semibold text-text-primary mt-1">
						{stats.since}
					</p>
					<p className="text-xs text-text-secondary">Since</p>
				</div>
			</div>

			{/* Memory Settings */}
			<div className="space-y-2">
				<SettingsItem
					icon={MessageSquare}
					label="Remember Context"
					description="AI remembers conversation context"
					rightElement={
						<ZaneToggle
							isOn={rememberContext}
							onToggle={() => setRememberContext(!rememberContext)}
						/>
					}
				/>

				<SettingsItem
					icon={Search}
					label="Search History"
					description="Enable search in past conversations"
					rightElement={
						<ZaneToggle
							isOn={searchEnabled}
							onToggle={() => setSearchEnabled(!searchEnabled)}
						/>
					}
				/>
			</div>

			{/* Info Section */}
			<div className="bg-bg-surface rounded-xl p-4">
				<div className="flex items-center gap-3 mb-2">
					<Calendar className="w-4 h-4 text-text-secondary" />
					<h4 className="text-sm font-medium text-text-primary">
						Data Retention
					</h4>
				</div>
				<p className="text-xs text-text-secondary leading-relaxed">
					Your conversation history is stored locally and synced to your
					account. Messages older than 90 days may be archived.
				</p>
			</div>

			{/* Clear History */}
			<div className="pt-4">
				<SettingsItem
					icon={Trash2}
					label="Clear All History"
					description="Delete all conversations"
					onClick={handleClearHistory}
					destructive
				/>
			</div>
		</div>
	);
}
