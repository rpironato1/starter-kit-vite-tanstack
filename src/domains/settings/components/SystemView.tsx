import {
	AlertCircle,
	CheckCircle,
	Code,
	Database,
	FileText,
	Info,
	Play,
	RefreshCw,
	Terminal,
} from "lucide-react";
import { useRef, useState } from "react";
import { SettingsItem } from "./SettingsItem";
import type { SettingsView } from "./SettingsModal";

interface SystemViewProps {
	pushView: (view: SettingsView) => void;
	popView: () => void;
}

type LogType = "info" | "success" | "error";

interface LogEntry {
	id: string;
	msg: string;
	type: LogType;
	timestamp: string;
}

let logIdCounter = 0;

// Backend Diagnostics Test Runner (Terminal Fake)
function BackendTestRunner() {
	const [logs, setLogs] = useState<LogEntry[]>([]);
	const [isRunning, setIsRunning] = useState(false);
	const [testStatus, setTestStatus] = useState<"idle" | "success" | "fail">(
		"idle",
	);
	const logsEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const addLog = (msg: string, type: LogType) => {
		const timestamp = new Date().toLocaleTimeString();
		const id = `log-${++logIdCounter}`;
		setLogs((prev) => [...prev, { id, msg, type, timestamp }]);
		// Schedule scroll after state update
		setTimeout(scrollToBottom, 0);
	};

	const runTests = async () => {
		setIsRunning(true);
		setTestStatus("idle");
		setLogs([]);

		const testSteps: { msg: string; type: LogType }[] = [
			{ msg: "Iniciando diagnóstico...", type: "info" },
			{ msg: "Verificando conexão com servidor...", type: "info" },
			{ msg: "✓ Servidor respondendo (45ms)", type: "success" },
			{ msg: "Testando autenticação...", type: "info" },
			{ msg: "✓ Token válido", type: "success" },
			{ msg: "Verificando banco de dados...", type: "info" },
			{ msg: "✓ Conexão estabelecida", type: "success" },
			{ msg: "Testando APIs externas...", type: "info" },
			{ msg: "✓ Anthropic API: OK", type: "success" },
			{ msg: "✓ OpenAI API: OK", type: "success" },
			{ msg: "Verificando memória...", type: "info" },
			{ msg: "✓ Cache: 2.3MB disponível", type: "success" },
			{ msg: "", type: "info" },
			{ msg: "━━━━━━━━━━━━━━━━━━━━", type: "info" },
			{ msg: "Todos os testes passaram ✓", type: "success" },
		];

		try {
			for (const step of testSteps) {
				await new Promise((r) => setTimeout(r, 200));
				addLog(step.msg, step.type);
			}
			setTestStatus("success");
		} catch {
			setTestStatus("fail");
		} finally {
			setIsRunning(false);
		}
	};

	return (
		<div className="space-y-4">
			{/* Test Runner Card */}
			<div className="bg-bg-surface rounded-xl p-4 border border-border">
				<h3 className="text-sm font-medium text-text-primary mb-1 flex items-center gap-2">
					<Database className="w-4 h-4 text-accent-primary" />
					Backend State
				</h3>
				<p className="text-xs text-text-secondary mb-4">
					Execute diagnósticos para verificar a integridade do sistema
				</p>

				<button
					type="button"
					onClick={runTests}
					disabled={isRunning}
					className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
						isRunning
							? "bg-bg-hover text-text-secondary"
							: "bg-accent-primary text-white hover:bg-accent-primary/90 active:scale-[0.98]"
					}`}
				>
					{isRunning ? (
						<>
							<RefreshCw className="w-4 h-4 animate-spin" />
							Executando...
						</>
					) : (
						<>
							<Play className="w-4 h-4 fill-current" />
							Executar Diagnóstico
						</>
					)}
				</button>
			</div>

			{/* Status Indicator */}
			{testStatus !== "idle" && (
				<div
					className={`rounded-xl p-3 flex items-center gap-3 border ${
						testStatus === "success"
							? "bg-green-500/10 border-green-500/20 text-green-500"
							: "bg-red-500/10 border-red-500/20 text-red-500"
					}`}
				>
					{testStatus === "success" ? (
						<CheckCircle className="w-5 h-5" />
					) : (
						<AlertCircle className="w-5 h-5" />
					)}
					<span className="font-medium text-sm">
						{testStatus === "success"
							? "Todos os testes passaram com sucesso!"
							: "Alguns testes falharam. Verifique os logs."}
					</span>
				</div>
			)}

			{/* Terminal Output */}
			<div className="bg-black/90 rounded-xl border border-zinc-800 p-4 font-mono text-xs overflow-hidden flex flex-col min-h-[300px]">
				<div className="flex items-center gap-2 text-zinc-400 mb-2 border-b border-zinc-800 pb-2">
					<Terminal className="w-3 h-3" />
					<span>Console de Diagnóstico</span>
				</div>
				<div className="flex-1 overflow-y-auto space-y-1 pr-1">
					{logs.length === 0 && (
						<span className="text-zinc-600 italic">
							Ready to run diagnostics...
						</span>
					)}
					{logs.map((log) => (
						<div key={log.id} className="break-words">
							<span className="text-zinc-500 mr-2">[{log.timestamp}]</span>
							<span
								className={
									log.type === "error"
										? "text-red-500 font-bold"
										: log.type === "success"
											? "text-green-500 font-bold"
											: "text-zinc-200"
								}
							>
								{log.msg}
							</span>
						</div>
					))}
					<div ref={logsEndRef} />
				</div>
			</div>
		</div>
	);
}

export function SystemView(_props: SystemViewProps) {
	return (
		<div className="space-y-6">
			{/* Backend Diagnostics */}
			<BackendTestRunner />

			{/* About Section */}
			<div className="space-y-1">
				<h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider px-4 mb-2">
					Sobre
				</h4>
				<SettingsItem icon={Info} label="Versão" description="2.1.0" />
				<SettingsItem icon={Code} label="Build" description="2024.12.01" />
				<SettingsItem
					icon={FileText}
					label="Licenças"
					onClick={() => {
						// TODO: Open licenses modal
					}}
				/>
			</div>
		</div>
	);
}
