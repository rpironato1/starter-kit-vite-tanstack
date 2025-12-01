import { Key, Lock } from "lucide-react";

interface ApiKeyGateProps {
	onConnect: () => Promise<void> | void;
	isConnecting?: boolean;
}

export function ApiKeyGate({
	onConnect,
	isConnecting = false,
}: ApiKeyGateProps) {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#09090b] px-6 text-center text-white">
			<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-accent-primary/20 text-accent-primary shadow-[0_10px_40px_rgba(0,0,0,0.4)]">
				<Key className="h-10 w-10" />
			</div>

			<h1 className="text-3xl font-serif font-medium tracking-wide">
				Acesso Zane AI
			</h1>

			<p className="mt-4 max-w-md text-base leading-relaxed text-zinc-400">
				Para utilizar os modelos de alta fidelidade (Gemini 3.0 Pro &amp; Image
				Generation), é necessário conectar uma chave de API válida do Google AI
				Studio.
			</p>

			<button
				type="button"
				onClick={onConnect}
				disabled={isConnecting}
				className="mt-8 inline-flex items-center gap-3 rounded-xl bg-accent-primary px-8 py-4 font-semibold text-white shadow-lg shadow-green-900/20 transition-all hover:scale-105 hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
			>
				<Lock className="h-5 w-5" />
				{isConnecting ? "Conectando..." : "Conectar Google AI Studio"}
			</button>

			<p className="mt-4 text-xs text-zinc-600">
				Cobranças podem ser aplicadas conforme o uso no seu projeto Google
				Cloud.
			</p>
		</div>
	);
}

export default ApiKeyGate;
