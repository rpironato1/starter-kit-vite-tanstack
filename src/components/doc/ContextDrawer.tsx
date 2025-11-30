"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Plus, Trash2, X } from "lucide-react";

export interface UploadedDocument {
	id: string;
	name: string;
	type: string;
	content: string;
	size: number;
}

interface ContextDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	documents: UploadedDocument[];
	onRemoveDocument: (id: string) => void;
	onAddDocument: () => void;
}

const formatSize = (bytes: number): string => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function ContextDrawer({
	isOpen,
	onClose,
	documents,
	onRemoveDocument,
	onAddDocument,
}: ContextDrawerProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Drawer */}
					<motion.div
						variants={{
							hidden: { x: "100%" },
							visible: { x: 0 },
						}}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ type: "spring", damping: 30, stiffness: 300 }}
						className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-bg-modal z-50 border-l border-border flex flex-col"
					>
						{/* Header */}
						<div className="flex items-center justify-between p-4 border-b border-border">
							<div className="flex items-center gap-2">
								<h2 className="text-lg font-semibold text-text-primary">
									Contexto
								</h2>
								{documents.length > 0 && (
									<span className="text-xs text-text-secondary bg-bg-surface px-2 py-0.5 rounded-full">
										{documents.length} arquivos
									</span>
								)}
							</div>
							<button
								type="button"
								onClick={onClose}
								className="p-2 rounded-full hover:bg-bg-hover text-text-secondary hover:text-text-primary transition-colors"
								title="Fechar painel"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Add Button */}
						<div className="p-4 border-b border-border">
							<button
								type="button"
								onClick={onAddDocument}
								className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-accent-primary hover:bg-accent-primary/90 text-white font-medium text-sm transition-colors"
							>
								<Plus className="w-4 h-4" />
								Adicionar arquivo
							</button>
						</div>

						{/* Document List */}
						<div className="flex-1 overflow-y-auto p-4 space-y-3">
							{documents.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-48 text-text-secondary">
									<FileText className="w-8 h-8 mb-3 opacity-50" />
									<span className="text-sm text-center">
										Nenhum documento anexado
									</span>
								</div>
							) : (
								documents.map((doc) => (
									<div
										key={doc.id}
										className="group relative bg-bg-surface rounded-xl p-3 border border-border hover:border-accent-primary/30 transition-colors"
									>
										<div className="flex items-start gap-3 pr-8">
											<div className="p-2.5 bg-bg-hover rounded-lg shrink-0">
												<FileText className="w-5 h-5 text-accent-primary" />
											</div>
											<div className="flex-1 min-w-0">
												<div
													className="text-sm font-medium text-text-primary truncate"
													title={doc.name}
												>
													{doc.name}
												</div>
												<div className="text-[10px] text-text-secondary flex items-center gap-1 mt-1">
													<span className="uppercase font-bold tracking-wider">
														{doc.name.split(".").pop() || "TXT"}
													</span>
													<span className="w-1 h-1 bg-border rounded-full" />
													<span>{formatSize(doc.size)}</span>
												</div>
											</div>
										</div>
										<button
											type="button"
											onClick={() => onRemoveDocument(doc.id)}
											className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 text-text-secondary transition-all absolute right-2 top-2"
											title="Remover documento"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								))
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
