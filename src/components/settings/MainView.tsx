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

	const handleLanguageChange = () => {
		const nextLang = language === "pt-BR" ? "en-US" : "pt-BR";
		setLanguage(nextLang as Language);
	};

	const currentLangLabel =
		LANGUAGES.find((l) => l.value === language)?.label || language;

	const handleLogout = () => {
		console.log("Logout clicked");
	};

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
					onClick={() => console.log("Features clicked")}
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
				<SettingsItem
					icon={Globe}
					label={t.settings.language}
					rightElement={
						<button
							onClick={handleLanguageChange}
							className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
						>
							{currentLangLabel}
						</button>
					}
				/>

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
