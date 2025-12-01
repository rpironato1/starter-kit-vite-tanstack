import {
	Bell,
	CreditCard,
	Database,
	Globe,
	Lock,
	LogOut,
	Moon,
	SlidersHorizontal,
	Sparkles,
	Sun,
	Terminal,
	User,
} from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ZaneToggle } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useI18n";
import { useTheme } from "@/hooks/useTheme";
import type { Language } from "@/lib/i18n";
import { SettingsItem } from "./SettingsItem";
import type { SettingsView } from "./SettingsModal";

interface MainViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

const LANGUAGES = [
	{ value: "pt-BR", label: "Português (BR)" },
	{ value: "en-US", label: "English (US)" },
];

export function MainView({ pushView }: MainViewProps) {
	const { isDark, toggleTheme } = useTheme();
	const { t, language, setLanguage } = useTranslation();

	const handleLanguageChange = (value: string) => {
		if (value === "pt-BR" || value === "en-US") {
			setLanguage(value as Language);
		}
	};

	const handleLogout = () => {
		// TODO: Implement logout logic
		console.log("Logout clicked");
	};

	// TODO: Get email from user context/auth
	const userEmail = "usuario@email.com";

	return (
		<div className="space-y-6">
			{/* Email Card */}
			<div className="bg-bg-surface rounded-xl p-4 flex items-center justify-center border border-border-default">
				<span className="text-text-primary font-medium">{userEmail}</span>
			</div>

			{/* Main Settings Section */}
			<div className="space-y-1">
				<SettingsItem
					icon={User}
					label={t.settings.profile}
					description={t.profile.title}
					onClick={() => pushView("profile")}
				/>

				<SettingsItem
					icon={CreditCard}
					label={t.settings.plan}
					description={t.plan.currentPlanName}
					onClick={() => pushView("plan")}
				/>

				<SettingsItem
					icon={SlidersHorizontal}
					label={t.settings.features}
					description={t.settings.features}
					onClick={() => {
						// TODO: Implement features view
						console.log("Features clicked");
					}}
				/>

				<SettingsItem
					icon={Sparkles}
					label={t.settings.refinement}
					description={t.refinement.title}
					onClick={() => pushView("refinement")}
				/>

				<SettingsItem
					icon={Database}
					label={t.settings.memory}
					description={t.memory.title}
					onClick={() => pushView("memory")}
				/>
			</div>

			{/* Separator */}
			<div className="h-px bg-border-default w-full" />

			{/* Preferences Section */}
			<div className="space-y-1">
				{/* Appearance - Inline Toggle */}
				<SettingsItem
					icon={isDark ? Moon : Sun}
					label={t.settings.appearance}
					rightElement={<ZaneToggle isOn={isDark} onToggle={toggleTheme} />}
				/>

				{/* Language - Inline Selector */}
				<div className="bg-bg-surface rounded-xl p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-10 h-10 rounded-full bg-bg-hover flex items-center justify-center">
								<Globe className="w-5 h-5 text-text-secondary" />
							</div>
							<div>
								<p className="text-sm font-medium text-text-primary">
									{t.settings.language}
								</p>
								<p className="text-xs text-text-secondary">
									{LANGUAGES.find((l) => l.value === language)?.label}
								</p>
							</div>
						</div>

						<Select value={language} onValueChange={handleLanguageChange}>
							<SelectTrigger className="w-36">
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

				<SettingsItem
					icon={Bell}
					label={t.settings.notification}
					onClick={() => pushView("notifications")}
				/>

				<SettingsItem
					icon={Lock}
					label={t.settings.privacy}
					description={t.privacy.title}
					onClick={() => pushView("privacy")}
				/>

				<SettingsItem
					icon={Terminal}
					label={t.settings.system}
					onClick={() => pushView("system")}
				/>
			</div>

			{/* Separator */}
			<div className="h-px bg-border-default w-full" />

			{/* Logout */}
			<div className="space-y-1">
				<SettingsItem
					icon={LogOut}
					label={t.settings.logout}
					onClick={handleLogout}
					destructive
				/>
			</div>
		</div>
	);
}
