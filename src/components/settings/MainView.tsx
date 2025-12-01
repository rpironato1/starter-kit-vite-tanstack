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
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ZaneToggle } from "@/components/ui/switch";
import { useTheme } from "@/hooks/useTheme";
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
	const [language, setLanguage] = useState("pt-BR");

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
					label="Perfil"
					description="Gerenciar sua conta"
					onClick={() => pushView("profile")}
				/>

				<SettingsItem
					icon={CreditCard}
					label="Plano"
					description="Pro"
					onClick={() => pushView("plan")}
				/>

				<SettingsItem
					icon={SlidersHorizontal}
					label="Recursos"
					description="Funcionalidades avançadas"
					onClick={() => {
						// TODO: Implement features view
						console.log("Features clicked");
					}}
				/>

				<SettingsItem
					icon={Sparkles}
					label="Refinamento"
					description="Personalize como Zane trabalha"
					onClick={() => pushView("refinement")}
				/>

				<SettingsItem
					icon={Database}
					label="Memória"
					description="Histórico de conversas"
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
					label="Aparência"
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
								<p className="text-sm font-medium text-text-primary">Idioma</p>
								<p className="text-xs text-text-secondary">
									{LANGUAGES.find((l) => l.value === language)?.label}
								</p>
							</div>
						</div>

						<Select value={language} onValueChange={setLanguage}>
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
					label="Notificações"
					onClick={() => pushView("notifications")}
				/>

				<SettingsItem
					icon={Lock}
					label="Privacidade"
					description="Dados e segurança"
					onClick={() => pushView("privacy")}
				/>

				<SettingsItem
					icon={Terminal}
					label="Sistema e Diagnóstico"
					onClick={() => pushView("system")}
				/>
			</div>

			{/* Separator */}
			<div className="h-px bg-border-default w-full" />

			{/* Logout */}
			<div className="space-y-1">
				<SettingsItem
					icon={LogOut}
					label="Sair"
					onClick={handleLogout}
					destructive
				/>
			</div>
		</div>
	);
}
