import {
	User,
	CreditCard,
	SlidersHorizontal,
	Database,
	Lock,
	LogOut,
} from "lucide-react";
import type { SettingsView } from "./SettingsModal";
import { SettingsItem } from "./SettingsItem";

interface MainViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function MainView({ pushView }: MainViewProps) {
	const handleLogout = () => {
		// TODO: Implement logout logic
		console.log("Logout clicked");
	};

	return (
		<div className="space-y-2">
			<SettingsItem
				icon={User}
				label="Profile"
				description="Manage your account"
				onClick={() => pushView("profile")}
			/>

			<SettingsItem
				icon={CreditCard}
				label="Plan"
				description="Subscription & billing"
				onClick={() => pushView("plan")}
			/>

			<SettingsItem
				icon={SlidersHorizontal}
				label="System"
				description="Theme, language & more"
				onClick={() => pushView("system")}
			/>

			<SettingsItem
				icon={Database}
				label="Memory"
				description="Conversation history"
				onClick={() => pushView("memory")}
			/>

			<SettingsItem
				icon={Lock}
				label="Privacy"
				description="Data & security settings"
				onClick={() => pushView("privacy")}
			/>

			<div className="pt-4">
				<SettingsItem
					icon={LogOut}
					label="Logout"
					onClick={handleLogout}
					destructive
				/>
			</div>
		</div>
	);
}
