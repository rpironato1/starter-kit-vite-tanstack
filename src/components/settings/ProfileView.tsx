import { Edit3 } from "lucide-react";
import type { SettingsView } from "./SettingsModal";

interface ProfileViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

export function ProfileView(_props: ProfileViewProps) {
	// TODO: Replace with actual user data
	const user = {
		name: "User Name",
		email: "user@example.com",
		avatarUrl: null as string | null,
	};

	const initials = user.name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const handleEdit = () => {
		// TODO: Implement edit profile
		console.log("Edit profile clicked");
	};

	return (
		<div className="space-y-6">
			{/* Avatar Section */}
			<div className="flex flex-col items-center py-6">
				<div className="relative">
					{user.avatarUrl ? (
						<img
							src={user.avatarUrl}
							alt={user.name}
							className="w-24 h-24 rounded-full object-cover"
						/>
					) : (
						<div className="w-24 h-24 rounded-full bg-accent-primary flex items-center justify-center">
							<span className="text-2xl font-semibold text-white">
								{initials}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Info Section */}
			<div className="space-y-4">
				<div className="bg-bg-surface rounded-xl p-4">
					<span className="text-xs text-text-secondary uppercase tracking-wide">
						Name
					</span>
					<p className="text-text-primary font-medium mt-1">{user.name}</p>
				</div>

				<div className="bg-bg-surface rounded-xl p-4">
					<span className="text-xs text-text-secondary uppercase tracking-wide">
						Email
					</span>
					<p className="text-text-primary font-medium mt-1">{user.email}</p>
				</div>
			</div>

			{/* Edit Button */}
			<button
				type="button"
				onClick={handleEdit}
				className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors"
			>
				<Edit3 className="w-5 h-5" />
				Edit Profile
			</button>
		</div>
	);
}
