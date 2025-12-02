import { AnimatePresence, motion } from "framer-motion";
import { AIMessage } from "./AIMessage";
import { EmptyState } from "./EmptyState";
import { LoadingIndicator } from "./LoadingIndicator";
import { UserMessage } from "./UserMessage";
import type { ChatMessage } from "./chatTypes";
import type { TokenUsage } from "@/types";

interface ChatMessagesPanelProps {
	messages: ChatMessage[];
	isLoading: boolean;
	onTokenDetails: (usage: TokenUsage) => void;
	onRetry: () => void;
	messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessagesPanel({
	messages,
	isLoading,
	onTokenDetails,
	onRetry,
	messagesEndRef,
}: ChatMessagesPanelProps) {
	return (
		<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
			<div className="max-w-3xl mx-auto py-6 space-y-6">
				<AnimatePresence mode="popLayout">
					{messages.length === 0 && !isLoading ? (
						<EmptyState variant="chat" />
					) : (
						<>
							{messages.map((message) => (
								<motion.div
									key={message.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 30,
									}}
								>
									{message.role === "user" ? (
										<UserMessage
											content={message.content}
											imageUrl={message.imageUrl}
										/>
									) : (
										<AIMessage
											content={message.content}
											usage={message.usage}
											executionPlan={message.executionPlan}
											onTokenDetails={onTokenDetails}
											onRetry={onRetry}
											isLastMessage={
												messages[messages.length - 1]?.id === message.id
											}
										/>
									)}
								</motion.div>
							))}
							{isLoading && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
								>
									<LoadingIndicator moduleVariant="chat" />
								</motion.div>
							)}
						</>
					)}
				</AnimatePresence>
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
}
