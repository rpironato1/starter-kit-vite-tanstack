import { motion } from "framer-motion";
import { useId, useState } from "react";
import type { SettingsView } from "./SettingsModal";

interface RefinementViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

interface RefinementData {
	preferredName: string;
	gender: "male" | "female" | "other" | "";
	workInterests: string;
	aboutYou: string;
	workStyle: string;
}

const genderOptions = [
	{ label: "Masculino", value: "male" },
	{ label: "Feminino", value: "female" },
	{ label: "Outro", value: "other" },
] as const;

export function RefinementView({ popView }: RefinementViewProps) {
	const [data, setData] = useState<RefinementData>({
		preferredName: "",
		gender: "",
		workInterests: "",
		aboutYou: "",
		workStyle: "",
	});

	const nameId = useId();
	const genderId = useId();
	const workId = useId();
	const aboutId = useId();
	const styleId = useId();

	const handleSave = () => {
		// TODO: Implement save refinement logic
		console.log("Save refinement:", data);
		popView();
	};

	const handleSkip = () => {
		popView();
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.2 }}
			className="space-y-6"
		>
			{/* Preferred Name */}
			<div className="space-y-2">
				<label
					htmlFor={nameId}
					className="text-sm font-medium text-text-primary"
				>
					Como devo te chamar?
				</label>
				<input
					id={nameId}
					type="text"
					value={data.preferredName}
					onChange={(e) =>
						setData((prev) => ({ ...prev, preferredName: e.target.value }))
					}
					placeholder="Seu nome ou apelido"
					className="w-full bg-bg-surface border border-border-default rounded-xl p-3 text-text-primary placeholder:text-text-secondary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-colors"
				/>
			</div>

			{/* Gender Dropdown */}
			<div className="space-y-2">
				<label
					htmlFor={genderId}
					className="text-sm font-medium text-text-primary"
				>
					Sexo
				</label>
				<select
					id={genderId}
					value={data.gender}
					onChange={(e) =>
						setData((prev) => ({
							...prev,
							gender: e.target.value as RefinementData["gender"],
						}))
					}
					className="w-full bg-bg-surface border border-border-default rounded-xl p-3 text-text-primary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-colors appearance-none cursor-pointer"
				>
					<option value="" disabled>
						Selecione uma opção
					</option>
					{genderOptions.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
			</div>

			{/* Work/Study/Interests */}
			<div className="space-y-2">
				<label
					htmlFor={workId}
					className="text-sm font-medium text-text-primary"
				>
					Trabalho/Estudos/Interesses
				</label>
				<div className="relative">
					<textarea
						id={workId}
						value={data.workInterests}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								workInterests: e.target.value.slice(0, 250),
							}))
						}
						placeholder="Ex: Desenvolvimento de Software, Marketing, Artes... (Max 250 chars)"
						rows={2}
						className="w-full bg-bg-surface border border-border-default rounded-xl p-3 text-text-primary placeholder:text-text-secondary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-colors resize-none"
					/>
					<span className="absolute bottom-2 right-3 text-xs text-text-secondary">
						{data.workInterests.length}/250
					</span>
				</div>
			</div>

			{/* About You */}
			<div className="space-y-2">
				<label
					htmlFor={aboutId}
					className="text-sm font-medium text-text-primary"
				>
					Conte mais sobre você
				</label>
				<div className="relative">
					<textarea
						id={aboutId}
						value={data.aboutYou}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								aboutYou: e.target.value.slice(0, 600),
							}))
						}
						placeholder="Compartilhe um pouco sobre sua rotina, objetivos ou ideias... (Max 600 chars)"
						rows={4}
						className="w-full bg-bg-surface border border-border-default rounded-xl p-3 text-text-primary placeholder:text-text-secondary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-colors resize-none"
					/>
					<span className="absolute bottom-2 right-3 text-xs text-text-secondary">
						{data.aboutYou.length}/600
					</span>
				</div>
			</div>

			{/* Work Style */}
			<div className="space-y-2">
				<label
					htmlFor={styleId}
					className="text-sm font-medium text-text-primary"
				>
					Como você gostaria que eu trabalhasse com você
				</label>
				<div className="relative">
					<textarea
						id={styleId}
						value={data.workStyle}
						onChange={(e) =>
							setData((prev) => ({
								...prev,
								workStyle: e.target.value.slice(0, 600),
							}))
						}
						placeholder="Ex: Seja direto, use analogias, explique passo-a-passo... (Max 600 chars)"
						rows={4}
						className="w-full bg-bg-surface border border-border-default rounded-xl p-3 text-text-primary placeholder:text-text-secondary focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-colors resize-none"
					/>
					<span className="absolute bottom-2 right-3 text-xs text-text-secondary">
						{data.workStyle.length}/600
					</span>
				</div>
			</div>

			{/* Action Buttons */}
			<div className="pt-4 space-y-3">
				<button
					type="button"
					onClick={handleSave}
					className="w-full py-3.5 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-green-900/10 active:scale-[0.98]"
				>
					Salvar
				</button>

				<button
					type="button"
					onClick={handleSkip}
					className="w-full py-3 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium"
				>
					Pular por enquanto
				</button>
			</div>
		</motion.div>
	);
}

export default RefinementView;
