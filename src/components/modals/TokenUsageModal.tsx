"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Activity, Brain, Database, MessageSquare, X, Zap } from "lucide-react";
import { Backdrop } from "@/components/ui/backdrop";

export interface TokenUsage {
	inputTokens: number;
	outputTokens: number;
	totalTokens: number;
	cachedContentTokens: number;
	thinkingTokens: number;
	steps?: Array<{
		stepName: string;
		tool?: string;
		input: number;
		output: number;
		think: number;
		cache: number;
	}>;
}

interface TokenUsageModalProps {
	isOpen: boolean;
	onClose: () => void;
	usage: TokenUsage;
}

interface MetricCardProps {
	icon: React.ReactNode;
	title: string;
	value: number;
	subText?: string;
	iconColorClass: string;
}

function MetricCard({
	icon,
	title,
	value,
	subText,
	iconColorClass,
}: MetricCardProps) {
	return (
		<div className="bg-bg-surface p-4 rounded-xl border border-border flex flex-col gap-2">
			<div className="flex items-center gap-2 text-text-secondary text-xs uppercase font-bold tracking-wider">
				<span className={iconColorClass}>{icon}</span>
				<span>{title}</span>
			</div>
			<p className="text-2xl font-mono text-text-primary font-medium">
				{value.toLocaleString()}
			</p>
			{subText && <p className="text-xs text-text-secondary">{subText}</p>}
		</div>
	);
}

export function TokenUsageModal({
	isOpen,
	onClose,
	usage,
}: TokenUsageModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<Backdrop isOpen={isOpen} onClick={onClose} className="z-[100]" />
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none"
					>
						<div className="relative bg-bg-modal border border-border w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] pointer-events-auto">
							{/* Header */}
							<div className="flex items-center justify-between p-5 border-b border-border bg-bg-sidebar">
								<div className="flex items-center gap-3">
									<div className="p-2 bg-blue-500/10 rounded-lg">
										<Activity className="w-5 h-5 text-blue-400" />
									</div>
									<div>
										<h2 className="text-lg font-bold text-text-primary">
											Token Usage Report
										</h2>
										<p className="text-xs text-text-secondary">
											Detailed execution audit
										</p>
									</div>
								</div>
								<button
									type="button"
									onClick={onClose}
									className="p-2 hover:bg-bg-hover rounded-full text-text-secondary hover:text-text-primary transition-colors"
								>
									<X className="w-5 h-5" />
								</button>
							</div>

							{/* Content */}
							<div className="flex-1 overflow-y-auto p-6 space-y-6">
								{/* Metrics Grid */}
								<div className="grid grid-cols-2 md:grid-cols-5 gap-4">
									<MetricCard
										icon={<MessageSquare className="w-4 h-4" />}
										title="Input"
										value={usage.inputTokens}
										iconColorClass="text-blue-400"
									/>
									<MetricCard
										icon={<Database className="w-4 h-4" />}
										title="Cache"
										value={usage.cachedContentTokens}
										subText="Tokens retrieved"
										iconColorClass="text-amber-400"
									/>
									<MetricCard
										icon={<Brain className="w-4 h-4" />}
										title="Think"
										value={usage.thinkingTokens}
										subText="Reasoning (CoT)"
										iconColorClass="text-pink-500"
									/>
									<MetricCard
										icon={<Zap className="w-4 h-4" />}
										title="Output"
										value={usage.outputTokens}
										iconColorClass="text-purple-400"
									/>
									<MetricCard
										icon={<Activity className="w-4 h-4" />}
										title="Total"
										value={usage.totalTokens}
										subText="Total cost"
										iconColorClass="text-text-primary"
									/>
								</div>

								{/* Steps Table */}
								{usage.steps && usage.steps.length > 0 && (
									<div className="border border-border rounded-xl overflow-hidden">
										<table className="w-full text-sm text-left">
											<thead className="bg-bg-sidebar text-text-secondary font-medium uppercase text-xs">
												<tr>
													<th className="px-4 py-3">Step / Agent</th>
													<th className="px-4 py-3 text-center">Model</th>
													<th className="px-4 py-3 text-right">In</th>
													<th className="px-4 py-3 text-right text-amber-400">
														Cache
													</th>
													<th className="px-4 py-3 text-right text-pink-500">
														Think
													</th>
													<th className="px-4 py-3 text-right">Out</th>
													<th className="px-4 py-3 text-right font-bold">
														Total
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-border bg-bg-modal">
												{usage.steps.map((step, index) => (
													<tr
														key={`${step.stepName}-${index}`}
														className="hover:bg-bg-hover transition-colors"
													>
														<td className="px-4 py-3 font-medium text-text-primary">
															{step.stepName}
														</td>
														<td className="px-4 py-3 text-center">
															<span className="px-2 py-1 rounded bg-bg-surface border border-border text-xs text-blue-300">
																{step.tool || "default"}
															</span>
														</td>
														<td className="px-4 py-3 text-right text-text-secondary">
															{step.input.toLocaleString()}
														</td>
														<td className="px-4 py-3 text-right text-amber-400 font-medium">
															{step.cache.toLocaleString()}
														</td>
														<td className="px-4 py-3 text-right text-pink-500 font-medium">
															{step.think.toLocaleString()}
														</td>
														<td className="px-4 py-3 text-right text-text-secondary">
															{step.output.toLocaleString()}
														</td>
														<td className="px-4 py-3 text-right font-bold text-text-primary">
															{(
																step.input +
																step.output +
																step.think
															).toLocaleString()}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								)}

								{(!usage.steps || usage.steps.length === 0) && (
									<div className="border border-border rounded-xl p-8 text-center text-text-secondary italic">
										No step details available for this execution.
									</div>
								)}
							</div>

							{/* Footer */}
							<div className="p-4 border-t border-border bg-bg-sidebar flex justify-end">
								<button
									type="button"
									onClick={onClose}
									className="px-4 py-2 bg-bg-surface hover:bg-bg-hover border border-border rounded-lg text-sm font-medium text-text-primary transition-colors"
								>
									Close
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
