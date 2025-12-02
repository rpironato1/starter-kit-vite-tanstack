/**
 * Enterprise-Grade Logging System for Zane Chat AI
 *
 * Provides structured, color-coded, and grouped console logging
 * with performance tracking and environment-aware behavior.
 *
 * @module lib/logger
 * @version 1.0.0
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type LogLevel = "debug" | "info" | "warn" | "error" | "success";

interface LogOptions {
	/** Additional data to log */
	data?: unknown;
	/** Performance timing in milliseconds */
	duration?: number;
	/** Group related logs together */
	group?: string;
	/** Collapse the group by default */
	collapsed?: boolean;
}

interface LoggerConfig {
	/** Enable/disable all logging */
	enabled: boolean;
	/** Minimum log level to display */
	minLevel: LogLevel;
	/** Show timestamps */
	showTimestamp: boolean;
	/** Show performance metrics */
	showPerformance: boolean;
	/** Environment name */
	environment: "development" | "production" | "test";
}

interface PerformanceTracker {
	start: () => void;
	end: (message: string, options?: Omit<LogOptions, "duration">) => void;
	getDuration: () => number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

const LOG_LEVELS: Record<LogLevel, number> = {
	debug: 0,
	info: 1,
	success: 2,
	warn: 3,
	error: 4,
};

const LOG_COLORS: Record<LogLevel, string> = {
	debug: "#8B5CF6", // Purple
	info: "#3B82F6", // Blue
	success: "#10B981", // Green
	warn: "#F59E0B", // Amber
	error: "#EF4444", // Red
};

const LOG_ICONS: Record<LogLevel, string> = {
	debug: "🔍",
	info: "ℹ️",
	success: "✅",
	warn: "⚠️",
	error: "❌",
};

const MODULE_COLORS: Record<string, string> = {
	ROUTER: "#EC4899", // Pink
	API_ACCESS: "#F97316", // Orange
	QUERY_CLIENT: "#06B6D4", // Cyan
	THEME: "#8B5CF6", // Purple
	ROOT: "#10B981", // Green
	ORPC: "#6366F1", // Indigo
	TOKEN_USAGE: "#14B8A6", // Teal
	INIT: "#F59E0B", // Amber
	SSR: "#84CC16", // Lime
};

// ============================================================================
// CONFIGURATION
// ============================================================================

const getConfig = (): LoggerConfig => {
	const env = process.env as NodeJS.ProcessEnv & { NODE_ENV?: string };
	const isDev =
		typeof window !== "undefined"
			? (import.meta.env?.DEV ?? true)
			: env.NODE_ENV !== "production";

	return {
		enabled: isDev,
		minLevel: isDev ? "debug" : "warn",
		showTimestamp: true,
		showPerformance: true,
		environment: isDev ? "development" : "production",
	};
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getTimestamp = (): string => {
	const now = new Date();
	return now.toISOString().slice(11, 23); // HH:MM:SS.mmm
};

const getExecutionContext = (): "server" | "client" => {
	return typeof window === "undefined" ? "server" : "client";
};

const formatDuration = (ms: number): string => {
	if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
	if (ms < 1000) return `${ms.toFixed(2)}ms`;
	return `${(ms / 1000).toFixed(2)}s`;
};

const shouldLog = (level: LogLevel, config: LoggerConfig): boolean => {
	if (!config.enabled) return false;
	return LOG_LEVELS[level] >= LOG_LEVELS[config.minLevel];
};

// ============================================================================
// ACTIVE GROUPS TRACKING
// ============================================================================

const activeGroups = new Set<string>();

// ============================================================================
// CORE LOGGING FUNCTION
// ============================================================================

const createLogEntry = (
	level: LogLevel,
	module: string,
	message: string,
	options: LogOptions = {},
): void => {
	const config = getConfig();

	if (!shouldLog(level, config)) return;

	const context = getExecutionContext();
	const timestamp = getTimestamp();
	const icon = LOG_ICONS[level];
	const moduleColor = MODULE_COLORS[module] ?? "#64748B";
	const levelColor = LOG_COLORS[level];

	// Build prefix
	const prefix = config.showTimestamp ? `[${timestamp}]` : "";
	const contextBadge = context === "server" ? "[SSR]" : "[CSR]";

	// Build styled console arguments
	const styles = {
		prefix: "color: #64748B; font-weight: normal;",
		context: `color: ${context === "server" ? "#84CC16" : "#3B82F6"}; font-weight: bold;`,
		module: `color: ${moduleColor}; font-weight: bold;`,
		level: `color: ${levelColor}; font-weight: bold;`,
		message: "color: inherit; font-weight: normal;",
		duration: "color: #10B981; font-style: italic;",
	};

	// Handle grouping
	if (options.group && !activeGroups.has(options.group)) {
		activeGroups.add(options.group);
		const groupMethod = options.collapsed
			? console.groupCollapsed
			: console.group;
		groupMethod(
			`%c${icon} ${options.group}`,
			`color: ${moduleColor}; font-weight: bold; font-size: 12px;`,
		);
	}

	// Build the log message
	const durationStr =
		options.duration !== undefined
			? ` (${formatDuration(options.duration)})`
			: "";

	const logArgs: unknown[] = [
		`%c${prefix} %c${contextBadge} %c[${module}] %c${icon} %c${message}%c${durationStr}`,
		styles.prefix,
		styles.context,
		styles.module,
		styles.level,
		styles.message,
		styles.duration,
	];

	// Add data if present
	if (options.data !== undefined) {
		logArgs.push("\n→ Data:", options.data);
	}

	// Execute log
	const consoleMethod = level === "success" ? console.info : console[level];
	consoleMethod.apply(console, logArgs);
};

// ============================================================================
// GROUP MANAGEMENT
// ============================================================================

const endGroup = (groupName: string): void => {
	if (activeGroups.has(groupName)) {
		activeGroups.delete(groupName);
		console.groupEnd();
	}
};

const endAllGroups = (): void => {
	for (const _ of activeGroups) {
		console.groupEnd();
	}
	activeGroups.clear();
};

// ============================================================================
// PERFORMANCE TRACKING
// ============================================================================

const createPerformanceTracker = (module: string): PerformanceTracker => {
	let startTime: number;

	return {
		start: () => {
			startTime = performance.now();
		},
		end: (message: string, options: Omit<LogOptions, "duration"> = {}) => {
			const duration = performance.now() - startTime;
			createLogEntry("info", module, message, { ...options, duration });
		},
		getDuration: () => {
			return performance.now() - startTime;
		},
	};
};

// ============================================================================
// MODULE-SPECIFIC LOGGERS
// ============================================================================

interface ModuleLogger {
	debug: (message: string, options?: LogOptions) => void;
	info: (message: string, options?: LogOptions) => void;
	success: (message: string, options?: LogOptions) => void;
	warn: (message: string, options?: LogOptions) => void;
	error: (message: string, options?: LogOptions) => void;
	group: (name: string, collapsed?: boolean) => void;
	groupEnd: () => void;
	time: () => PerformanceTracker;
	table: (data: unknown[], columns?: string[]) => void;
}

const createModuleLogger = (module: string): ModuleLogger => {
	let currentGroup: string | null = null;

	return {
		debug: (message, options) =>
			createLogEntry("debug", module, message, options),
		info: (message, options) =>
			createLogEntry("info", module, message, options),
		success: (message, options) =>
			createLogEntry("success", module, message, options),
		warn: (message, options) =>
			createLogEntry("warn", module, message, options),
		error: (message, options) =>
			createLogEntry("error", module, message, options),
		group: (name, collapsed = true) => {
			currentGroup = `${module}::${name}`;
			createLogEntry("info", module, name, { group: currentGroup, collapsed });
		},
		groupEnd: () => {
			if (currentGroup) {
				endGroup(currentGroup);
				currentGroup = null;
			}
		},
		time: () => createPerformanceTracker(module),
		table: (data, columns) => {
			const config = getConfig();
			if (config.enabled) {
				console.table(data, columns);
			}
		},
	};
};

// ============================================================================
// PRE-CONFIGURED MODULE LOGGERS
// ============================================================================

export const logRouter = createModuleLogger("ROUTER");
export const logApiAccess = createModuleLogger("API_ACCESS");
export const logQueryClient = createModuleLogger("QUERY_CLIENT");
export const logTheme = createModuleLogger("THEME");
export const logRoot = createModuleLogger("ROOT");
export const logOrpc = createModuleLogger("ORPC");
export const logTokenUsage = createModuleLogger("TOKEN_USAGE");
export const logInit = createModuleLogger("INIT");
export const logSsr = createModuleLogger("SSR");

// ============================================================================
// INITIALIZATION SEQUENCE LOGGER
// ============================================================================

interface InitSequenceStep {
	name: string;
	status: "pending" | "running" | "success" | "error";
	duration?: number;
	error?: string;
}

class InitializationSequence {
	private steps: InitSequenceStep[] = [];
	private currentStep: number = -1;
	private startTime: number = 0;
	private stepStartTime: number = 0;

	constructor(private readonly name: string) {}

	start(): void {
		this.startTime = performance.now();
		logInit.group(`🚀 ${this.name} Initialization Sequence`, false);
		logInit.info("Sequence started", {
			data: { timestamp: new Date().toISOString() },
		});
	}

	addStep(name: string): void {
		this.steps.push({ name, status: "pending" });
	}

	beginStep(name: string): void {
		this.stepStartTime = performance.now();
		const stepIndex = this.steps.findIndex((s) => s.name === name);

		if (stepIndex === -1) {
			this.addStep(name);
		}

		this.currentStep = stepIndex === -1 ? this.steps.length - 1 : stepIndex;
		const currentStepEntry = this.steps[this.currentStep];
		if (!currentStepEntry) {
			return;
		}
		currentStepEntry.status = "running";

		logInit.info(`→ Step ${this.currentStep + 1}: ${name}`, {
			data: { status: "running" },
		});
	}

	completeStep(name: string): void {
		const duration = performance.now() - this.stepStartTime;
		const stepIndex = this.steps.findIndex((s) => s.name === name);

		if (stepIndex !== -1) {
			const step = this.steps[stepIndex];
			if (!step) {
				return;
			}
			step.status = "success";
			step.duration = duration;

			logInit.success(`✓ Step ${stepIndex + 1}: ${name}`, {
				duration,
			});
		}
	}

	failStep(name: string, error: string): void {
		const duration = performance.now() - this.stepStartTime;
		const stepIndex = this.steps.findIndex((s) => s.name === name);

		if (stepIndex !== -1) {
			const step = this.steps[stepIndex];
			if (!step) {
				return;
			}
			step.status = "error";
			step.duration = duration;
			step.error = error;

			logInit.error(`✗ Step ${stepIndex + 1}: ${name}`, {
				duration,
				data: { error },
			});
		}
	}

	complete(): void {
		const totalDuration = performance.now() - this.startTime;

		logInit.info("━".repeat(50));
		logInit.success(`🎉 ${this.name} Initialization Complete`, {
			duration: totalDuration,
			data: {
				totalSteps: this.steps.length,
				successfulSteps: this.steps.filter((s) => s.status === "success")
					.length,
				failedSteps: this.steps.filter((s) => s.status === "error").length,
			},
		});

		// Log summary table
		logInit.table(
			this.steps.map((s, i) => ({
				"#": i + 1,
				Step: s.name,
				Status:
					s.status === "success" ? "✅" : s.status === "error" ? "❌" : "⏳",
				Duration: s.duration ? formatDuration(s.duration) : "-",
				Error: s.error ?? "-",
			})),
		);

		logInit.groupEnd();
	}

	abort(reason: string): void {
		const totalDuration = performance.now() - this.startTime;

		logInit.error(`💥 ${this.name} Initialization Aborted`, {
			duration: totalDuration,
			data: { reason },
		});

		logInit.groupEnd();
	}
}

export const createInitSequence = (name: string): InitializationSequence => {
	return new InitializationSequence(name);
};

// ============================================================================
// GLOBAL INITIALIZATION SEQUENCE (Singleton)
// ============================================================================

let globalInitSequence: InitializationSequence | null = null;

export const getGlobalInitSequence = (): InitializationSequence => {
	if (!globalInitSequence) {
		globalInitSequence = createInitSequence("Zane Chat AI");
	}
	return globalInitSequence;
};

export const startGlobalInit = (): void => {
	const seq = getGlobalInitSequence();
	seq.start();
};

export const beginInitStep = (stepName: string): void => {
	const seq = getGlobalInitSequence();
	seq.beginStep(stepName);
};

export const completeInitStep = (stepName: string): void => {
	const seq = getGlobalInitSequence();
	seq.completeStep(stepName);
};

export const failInitStep = (stepName: string, error: string): void => {
	const seq = getGlobalInitSequence();
	seq.failStep(stepName, error);
};

export const completeGlobalInit = (): void => {
	const seq = getGlobalInitSequence();
	seq.complete();
	globalInitSequence = null;
};

// ============================================================================
// DIAGNOSTIC UTILITIES
// ============================================================================

export const logEnvironmentInfo = (): void => {
	const config = getConfig();
	if (!config.enabled) return;

	const context = getExecutionContext();

	logInit.group("🌍 Environment Info");

	const envInfo = {
		context,
		environment: config.environment,
		userAgent: context === "client" ? navigator.userAgent : "N/A",
		url: context === "client" ? window.location.href : "N/A",
		timestamp: new Date().toISOString(),
	};

	logInit.info("Environment details", { data: envInfo });
	logInit.groupEnd();
};

export const logMemoryUsage = (): void => {
	const config = getConfig();
	if (!config.enabled) return;

	if (typeof window !== "undefined" && "memory" in performance) {
		const memory = (
			performance as Performance & {
				memory?: {
					usedJSHeapSize: number;
					totalJSHeapSize: number;
					jsHeapSizeLimit: number;
				};
			}
		).memory;

		if (memory) {
			logInit.info("Memory usage", {
				data: {
					usedHeap: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
					totalHeap: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
					heapLimit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
				},
			});
		}
	}
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
	createModuleLogger,
	createLogEntry,
	endGroup,
	endAllGroups,
	createPerformanceTracker,
	type LogLevel,
	type LogOptions,
	type ModuleLogger,
	type PerformanceTracker,
};
