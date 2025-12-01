import { AnimatePresence, motion } from "framer-motion";
import { FileText, UploadCloud } from "lucide-react";
import type { RefObject } from "react";
import { AIMessage } from "@/components/chat/AIMessage";
import { EmptyState } from "@/components/chat/EmptyState";
import { LoadingIndicator } from "@/components/chat/LoadingIndicator";
import type { DocMessage } from "@/components/doc/docTypes";
import type { TokenUsage } from "@/types";

interface DocMessagesPanelProps {
	messages: DocMessage[];
	isLoading: boolean;
	onTokenDetails: (usage: TokenUsage) => void;
	onRetry?: () => void;
	onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	accept: string;
	messagesEndRef: RefObject<HTMLDivElement | null>;
}

export function DocMessagesPanel({
	messages,
	isLoading,
	onTokenDetails,
	onRetry,
	onFileUpload,
	accept,
	messagesEndRef,
}: DocMessagesPanelProps) {
	return (
		<div className="h-full overflow-y-auto pb-32 px-4 md:px-6">
			<div className="max-w-3xl mx-auto py-6 space-y-6">
				<AnimatePresence mode="popLayout">
					{messages.length === 0 && !isLoading ? (
						<div className="flex flex-col items-center justify-center min-h-[60vh]">
							<EmptyState variant="doc" />
							<label className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/10 text-blue-400 rounded-full cursor-pointer hover:bg-blue-600/20 transition-colors border border-blue-500/30">
								<UploadCloud className="w-5 h-5" />
								<span>Adicionar arquivos</span>
								<input
									type="file"
									multiple
									accept={accept}
									onChange={onFileUpload}
									className="hidden"
								/>
							</label>
						</div>
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
											<div className="max-w-[85%] md:max-w-[65%] bg-bg-surface text-text-primary px-5 py-3.5 rounded-[20px] rounded-tr-[4px] border border-border shadow-sm">
												{message.attachedFiles &&
													message.attachedFiles.length > 0 && (
														<div className="flex flex-wrap gap-2 mb-3">
															{message.attachedFiles.map((file) => (
																<div
																	key={file.id}
																	className="flex items-center gap-2 px-3 py-1.5 bg-bg-hover rounded-lg text-xs"
																>
																	<FileText className="w-3 h-3 text-blue-400" />
																	<span className="text-text-secondary truncate max-w-[150px]">
																		{file.name}
																	</span>
																</div>
															))}
														</div>
													)}
												<p className="text-[15px] leading-relaxed">
													{message.content}
												</p>
											</div>
										</div>
									) : (
										<AIMessage
											content={message.content}
											usage={message.usage}
											executionPlan={message.executionPlan}
											onTokenDetails={onTokenDetails}
											onRetry={onRetry}
										/>
									)}
								</motion.div>
							))}
							{isLoading && (
								<LoadingIndicator
									moduleVariant="doc"
									text="Analisando documentos..."
								/>
							)}
						</>
					)}
				</AnimatePresence>
				<div ref={messagesEndRef} />
			</div>
		</div>
	);
}
