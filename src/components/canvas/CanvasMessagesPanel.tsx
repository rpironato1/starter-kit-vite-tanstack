import { AnimatePresence, motion } from "framer-motion";
import type { RefObject } from "react";
import { ArtifactCard } from "@/components/canvas/ArtifactCard";
import { AIMessage } from "@/domains/chat/components/AIMessage";
import { EmptyState } from "@/domains/chat/components/EmptyState";
import { ReasoningBubble } from "@/domains/chat/components/ReasoningBubble";
import type { CanvasMessage } from "@/components/canvas/canvasTypes";
import type { CanvasArtifact, TokenUsage } from "@/types";

interface CanvasMessagesPanelProps {
	messages: CanvasMessage[];
	isLoading: boolean;
	executionPlan: string[];
	onTokenDetails: (usage: TokenUsage) => void;
	onArtifactSelect: (artifact: CanvasArtifact) => void;
	messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function CanvasMessagesPanel({
	messages,
	isLoading,
	executionPlan,
	onTokenDetails,
	onArtifactSelect,
	messagesEndRef,
}: CanvasMessagesPanelProps) {
	return (
		<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
			<div className="mx-auto flex h-full max-w-5xl flex-col gap-4 py-6 md:flex-row">
				<div className="flex-1 space-y-4">
					<AnimatePresence mode="popLayout">
						{messages.length === 0 && !isLoading ? (
							<div className="mt-12">
								<EmptyState variant="canvas" />
							</div>
						) : (
							messages.map((message) => {
								const artifact = message.artifact;
								return (
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
											<div className="flex justify-end">
												<div className="max-w-[85%] md:max-w-[65%] rounded-[20px] rounded-tr-[4px] border border-border-default bg-bg-surface px-5 py-3.5 text-text-primary shadow-sm">
													<p className="text-[15px] leading-relaxed">
														{message.content}
													</p>
												</div>
											</div>
										) : (
											<div className="space-y-3">
												<AIMessage
													content={message.content}
													executionPlan={message.executionPlan}
													onTokenDetails={onTokenDetails}
													usage={message.usage}
													isLastMessage={
														messages[messages.length - 1]?.id === message.id
													}
												/>
												{artifact ? (
													<div className="mt-3">
														<ArtifactCard
															artifact={artifact}
															onClick={() => onArtifactSelect(artifact)}
														/>
													</div>
												) : null}
											</div>
										)}
									</motion.div>
								);
							})
						)}
						{isLoading && (
							<ReasoningBubble
								key="reasoning-bubble"
								steps={executionPlan}
							/>
						)}
					</AnimatePresence>
					<div ref={messagesEndRef} />
				</div>
			</div>
		</div>
	);
}
