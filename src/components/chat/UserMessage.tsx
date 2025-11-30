import { motion } from "framer-motion";

interface UserMessageProps {
	content: string;
	imageUrl?: string;
	timestamp?: Date;
}

export function UserMessage({
	content,
	imageUrl,
	timestamp,
}: UserMessageProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 30,
			}}
			className="ml-auto max-w-[85%] md:max-w-md"
		>
			<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-border-default">
				{imageUrl && (
					<div className="mb-2">
						<img
							src={imageUrl}
							alt="Attached"
							className="w-full max-w-[200px] rounded-lg object-cover"
						/>
					</div>
				)}
				<p className="text-[15px] text-text-primary">{content}</p>
				{timestamp && (
					<time className="mt-1 block text-xs text-text-secondary">
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
