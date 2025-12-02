import { motion } from "framer-motion";

interface UserMessageProps {
	content: string;
	imageUrl?: string | undefined;
	timestamp?: Date | undefined;
}

const springTransition = {
	type: "spring",
	stiffness: 500,
	damping: 30,
} as const;

export function UserMessage({
	content,
	imageUrl,
	timestamp,
}: UserMessageProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={springTransition}
			className="ml-auto max-w-[85%] md:max-w-md"
		>
			<div className="rounded-2xl rounded-tr-sm bg-bg-surface px-4 py-3 shadow-sm border border-border-default/30">
				{imageUrl && (
					<div className="mb-3">
						<img
							src={imageUrl}
							alt="Imagem anexada"
							className="max-w-xs max-h-48 w-auto rounded-xl object-cover border border-border-default/50"
						/>
					</div>
				)}
				<p className="text-base text-text-primary whitespace-pre-wrap leading-relaxed font-light">
					{content}
				</p>
				{timestamp && (
					<time className="mt-2 block text-xs text-text-secondary">
						{timestamp.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</time>
				)}
			</div>
		</motion.div>
	);
}

export default UserMessage;
