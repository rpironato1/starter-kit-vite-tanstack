import { motion } from "framer-motion";

interface UserMessageProps {
	message: string;
	timestamp?: Date;
}

export function UserMessage({ message, timestamp }: UserMessageProps) {
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
			<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3">
				<p className="text-[15px] text-text-primary">{message}</p>
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
