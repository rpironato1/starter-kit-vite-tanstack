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
import { useTranslation } from "@/shared/hooks/useTranslation";
import { useTheme } from "@/shared/hooks/useTheme";
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
		<div className="space-y-6 pb-6">
			{/* Email Card */}
			<div className="bg-bg-surface rounded-xl p-4 flex items-center justify-center">
				<span className="text-text-primary font-medium">{userEmail}</span>
			</div>

			{/* Main Settings Section */}
			<div className="space-y-1">
				<SettingsItem
					icon={User}
					label={t.settings.profile}
					onClick={() => pushView("profile")}
				/>

				<SettingsItem
					icon={CreditCard}
					label={t.settings.plan}
					value={t.plan.currentPlanName}
					onClick={() => pushView("plan")}
				/>

				<SettingsItem
					icon={SlidersHorizontal}
					label={t.settings.features}
					onClick={() => console.log("Features clicked")}
				/>

				<SettingsItem
					icon={Sparkles}
					label={t.settings.refinement}
					onClick={() => pushView("refinement")}
				/>

				<SettingsItem
					icon={Database}
					label={t.settings.memory}
					onClick={() => pushView("memory")}
				/>
			</div>

			{/* Separator */}
			<div className="h-px bg-border-default/20 w-full my-2" />

			{/* Preferences Section */}
			<div className="space-y-1">
				{/* Appearance - Inline Toggle */}
				<SettingsItem
					icon={isDark ? Moon : Sun}
					label={t.settings.appearance}
					rightElement={<ZaneToggle isOn={isDark} onToggle={toggleTheme} />}
				/>

				{/* Language - Clickable Row with Value */}
				<SettingsItem
					icon={Globe}
					label={t.settings.language}
					value={currentLangLabel}
					onClick={handleLanguageChange}
				/>

				<SettingsItem
					icon={Bell}
					label={t.settings.notification}
					onClick={() => pushView("notifications")}
				/>

				<SettingsItem
					icon={Lock}
					label={t.settings.privacy}
					onClick={() => pushView("privacy")}
				/>

				<SettingsItem
					icon={Terminal}
					label="Sistema e Diagnóstico"
					onClick={() => pushView("system")}
				/>
			</div>

			{/* Separator */}
			<div className="h-px bg-border-default/20 w-full my-2" />

			{/* Logout */}
			<div>
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
