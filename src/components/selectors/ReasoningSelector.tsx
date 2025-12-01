import { ReasoningSelectorDropdown } from "./ReasoningSelectorDropdown";
import { ReasoningSelectorInline } from "./ReasoningSelectorInline";
import type { ReasoningLevel } from "./reasoningConfig";

interface ReasoningSelectorProps {
	value: ReasoningLevel;
	onChange: (level: ReasoningLevel) => void;
	variant?: "dropdown" | "inline";
	className?: string;
}

export function ReasoningSelector({
	value,
	onChange,
	variant = "dropdown",
	className,
}: ReasoningSelectorProps) {
	if (variant === "inline") {
		return (
			<ReasoningSelectorInline
				value={value}
				onChange={onChange}
				className={className}
			/>
		);
	}

	return (
		<ReasoningSelectorDropdown
			value={value}
			onChange={onChange}
			className={className}
		/>
	);
}
