import { Key, Lock, ShieldCheck, Sparkles } from "lucide-react";

interface ApiKeyGateProps {
	onConnect: () => Promise<void> | void;
	isConnecting?: boolean;
}

export function ApiKeyGate({
	onConnect,
	isConnecting = false,
}: ApiKeyGateProps) {
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-bg-main text-text-primary">
			{/* Ambient glow per design spec */}
			<div aria-hidden="true" className="pointer-events-none absolute inset-0">
				<div className="absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-accent-primary/20 blur-[140px]" />
				<div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent-primary/20 blur-[160px]" />
			</div>

			<div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
				<div className="w-full max-w-3xl rounded-[32px] border border-border-default/70 bg-bg-modal/70 p-10 text-center shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
					<div className="flex flex-col items-center gap-5">
						<span className="inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-primary">
							<ShieldCheck className="h-3.5 w-3.5" />
							Secure Access
						</span>

						<div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-border-default/60 bg-bg-surface/70 text-accent-primary shadow-[0_10px_60px_rgba(9,255,128,0.25)]">
							<Key className="h-10 w-10 animate-pulse" />
						</div>

						<div className="space-y-3">
							<h1 className="font-serif text-3xl tracking-wide text-text-primary">
								Conecte sua chave do Google AI Studio
							</h1>
							<p className="mx-auto max-w-xl text-base leading-relaxed text-text-secondary">
								Liberamos os modelos de alta fidelidade (Gemini 3.0 Pro &amp;
								Image Generation) apenas após a autenticação segura. Isso
								garante billing correto e libera os recursos do protótipo
								oficial.
							</p>
						</div>
					</div>

					<div className="mt-8 grid gap-3 text-left text-sm text-text-secondary md:grid-cols-3">
						<div className="rounded-2xl border border-border-default/60 bg-bg-surface/70 p-4">
							<p className="font-semibold text-text-primary">
								Modelos alinhados
							</p>
							<p>Escolha Mini/Solo/Pro/Ultra como no protótipo.</p>
						</div>
						<div className="rounded-2xl border border-border-default/60 bg-bg-surface/70 p-4">
							<p className="font-semibold text-text-primary">Token auditável</p>
							<p>O modal de uso é habilitado logo após a conexão.</p>
						</div>
						<div className="rounded-2xl border border-border-default/60 bg-bg-surface/70 p-4">
							<p className="font-semibold text-text-primary">
								Shell responsivo
							</p>
							<p>Header + Sidebar carregam com as preferências atuais.</p>
						</div>
					</div>

					<button
						type="button"
						onClick={onConnect}
						disabled={isConnecting}
						className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-primary px-8 py-4 font-semibold text-white shadow-[0_20px_40px_rgba(2,132,96,0.45)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/40 disabled:cursor-wait disabled:opacity-70"
					>
						<Lock className="h-5 w-5" />
						{isConnecting ? "Conectando..." : "Conectar Google AI Studio"}
					</button>

					<p className="mt-4 flex items-center justify-center gap-2 text-xs text-text-secondary">
						<Sparkles className="h-3.5 w-3.5 text-accent-primary" />
						Conexão única por navegador. Custos são calculados no seu projeto
						Google Cloud.
					</p>
				</div>
			</div>
		</div>
	);
}

export default ApiKeyGate;
