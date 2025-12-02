import { Mail, User } from "lucide-react";
import { useState } from "react";
import type { SettingsView } from "./SettingsModal";

interface ProfileViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

interface FormInputProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	onChange: (value: string) => void;
	maxLength?: number;
	type?: string;
}

function FormInput({
	icon,
	label,
	value,
	onChange,
	maxLength,
	type = "text",
}: FormInputProps) {
	const inputId = `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<label
					htmlFor={inputId}
					className="text-xs text-text-secondary uppercase tracking-wide"
				>
					{label}
				</label>
				{maxLength && (
					<span className="text-xs text-text-secondary">
						{value.length}/{maxLength}
					</span>
				)}
			</div>
			<div className="relative">
				<div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
					{icon}
				</div>
				<input
					id={inputId}
					type={type}
					value={value}
					onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
					maxLength={maxLength}
					placeholder={label}
					className="w-full bg-bg-surface rounded-xl p-4 pl-12 text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
				/>
			</div>
		</div>
	);
}

export function ProfileView(_props: ProfileViewProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const handleSave = () => {
		// TODO: Implement save profile
		console.log("Save profile:", { name, email });
	};

	return (
		<div className="flex-1 overflow-y-auto p-4 space-y-6 bg-background-modal no-scrollbar">
			<FormInput
				icon={<User className="w-4 h-4" />}
				label="Nome"
				value={name}
				onChange={setName}
				maxLength={50}
			/>
			<FormInput
				icon={<Mail className="w-4 h-4" />}
				label="Email"
				value={email}
				onChange={setEmail}
				maxLength={100}
				type="email"
			/>
			<button
				type="button"
				onClick={handleSave}
				className="w-full py-3 bg-accent-primary text-white rounded-xl font-semibold hover:bg-accent-primary/90 transition-colors"
			>
				Salvar
			</button>
		</div>
	);
}
