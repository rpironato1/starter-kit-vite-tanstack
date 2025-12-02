import { AnimatePresence, motion } from "framer-motion";
import { Download } from "lucide-react";
import type { RefObject } from "react";
import { AIMessage } from "@/domains/chat/components/AIMessage";
import { EmptyState } from "@/domains/chat/components/EmptyState";
import { LoadingIndicator } from "@/domains/chat/components/LoadingIndicator";
import type { PhotoMessage } from "./photoTypes";
import type { TokenUsage } from "@/types";

interface PhotoMessagesPanelProps {
	messages: PhotoMessage[];
	isLoading: boolean;
	onTokenDetails: (usage: TokenUsage) => void;
	messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function PhotoMessagesPanel({
	messages,
	isLoading,
	onTokenDetails,
	messagesEndRef,
}: PhotoMessagesPanelProps) {
	return (
		<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
			<div className="max-w-3xl mx-auto py-6 space-y-6">
				<AnimatePresence mode="popLayout">
					{messages.length === 0 && !isLoading ? (
						<EmptyState variant="photo" />
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
										<div className="flex justify-end">
											<div className="max-w-[85%] md:max-w-[65%] bg-bg-surface text-text-primary px-5 py-3.5 rounded-[20px] rounded-tr-[4px] border border-border shadow-sm space-y-3">
												{message.imageUrl && (
													<img
														src={message.imageUrl}
														alt="User upload"
														className="max-h-48 w-full rounded-xl border border-border-default object-cover"
													/>
												)}
												<p className="text-[15px] leading-relaxed">
													{message.content}
												</p>
											</div>
										</div>
									) : (
										<div className="space-y-3">
											{message.generatedImageUrl && (
												<div className="relative group rounded-2xl overflow-hidden border border-border-default shadow-2xl bg-black/40 max-w-md">
													<img
														src={message.generatedImageUrl}
														alt="Generated"
														className="w-full h-auto object-cover"
													/>
													<div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
														<button
															type="button"
															title="Baixar imagem"
															onClick={() =>
																window.open(message.generatedImageUrl, "_blank")
															}
															className="p-4 bg-white/20 rounded-full hover:scale-110 transition-transform"
														>
															<Download className="w-6 h-6 text-white" />
														</button>
													</div>
												</div>
											)}
											<AIMessage
												content={message.content}
												usage={message.usage}
												executionPlan={message.executionPlan}
												onTokenDetails={onTokenDetails}
											/>
										</div>
									)}
								</motion.div>
							))}
							{isLoading && (
								<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
									<LoadingIndicator moduleVariant="photo" />
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
