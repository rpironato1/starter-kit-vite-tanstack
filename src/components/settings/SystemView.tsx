import { useState } from "react";
import { Sun, Moon, Globe, Bell, Info } from "lucide-react";
import type { SettingsView } from "./SettingsModal";
import { SettingsItem } from "./SettingsItem";
import { ZaneToggle } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface SystemViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

const LANGUAGES = [
	{ value: "en", label: "English" },
	{ value: "pt", label: "Português" },
	{ value: "es", label: "Español" },
];

export function SystemView(_props: SystemViewProps) {
	const { isDark, toggleTheme } = useTheme();
	const [notifications, setNotifications] = useState(true);
	const [language, setLanguage] = useState("en");

	// TODO: Get version from package.json or env
	const appVersion = "1.0.0";

	return (
		<div className="space-y-6">
			{/* Theme Toggle */}
			<div className="space-y-2">
				<SettingsItem
					icon={isDark ? Moon : Sun}
					label="Dark Mode"
					description={isDark ? "Currently using dark theme" : "Currently using light theme"}
					rightElement={
						<ZaneToggle isOn={isDark} onToggle={toggleTheme} />
					}
				/>

				<SettingsItem
					icon={Bell}
					label="Notifications"
					description="Push notifications"
					rightElement={
						<ZaneToggle
							isOn={notifications}
							onToggle={() => setNotifications(!notifications)}
						/>
					}
				/>
			</div>

			{/* Language Selector */}
			<div className="bg-bg-surface rounded-xl p-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<div className="w-10 h-10 rounded-full bg-bg-hover flex items-center justify-center">
							<Globe className="w-5 h-5 text-text-secondary" />
						</div>
						<div>
							<p className="text-sm font-medium text-text-primary">Language</p>
							<p className="text-xs text-text-secondary">App display language</p>
						</div>
					</div>

					<Select value={language} onValueChange={setLanguage}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{LANGUAGES.map((lang) => (
								<SelectItem key={lang.value} value={lang.value}>
									{lang.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Version Info */}
			<div className="bg-bg-surface rounded-xl p-4">
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 rounded-full bg-bg-hover flex items-center justify-center">
						<Info className="w-5 h-5 text-text-secondary" />
					</div>
					<div>
						<p className="text-sm font-medium text-text-primary">Version</p>
						<p className="text-xs text-text-secondary">Zane AI v{appVersion}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
