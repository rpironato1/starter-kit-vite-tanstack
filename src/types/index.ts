// === MODELOS ZANE ===
export type ZaneModel =
	| "Zane Mini 1.0"
	| "Zane Solo 1.0"
	| "Zane Pro 1.0"
	| "Zane Ultra 1.0";
export type ZaneImageModel =
	| "Zane img Lite"
	| "Zane img Pro"
	| "Zane img Ultra";
export type ZaneDocModel = "Zane doc mini" | "Zane doc pro" | "Zane doc ultra";
export type ZaneCanvasModel =
	| "Zane Canvas Draft"
	| "Zane Canvas Pro"
	| "Zane Canvas Studio";

// === CONFIGURAÇÕES ===
export type ReasoningLevel = "Desativado" | "Soft" | "Médio" | "Max";
export type Language = "pt-BR" | "en-US";
export type Theme = "light" | "dark";
export type ViewMode = "chat" | "photo" | "doc" | "canvas";
export type AspectRatio = "1:1" | "4:3" | "3:4" | "16:9" | "9:16";

// === TOKEN USAGE ===
export interface TokenUsageStep {
	stepName: string;
	tool?: string;
	input: number;
	output: number;
	think: number;
	cache: number;
}

export interface TokenUsage {
	inputTokens: number;
	outputTokens: number;
	totalTokens: number;
	cachedContentTokens: number;
	thinkingTokens: number;
	steps?: TokenUsageStep[];
}

// === CHAT ===
export interface ChatAttachment {
	name: string;
	mimeType: string;
	data: string; // Base64
	size?: number;
}

export interface ChatSource {
	title: string;
	uri: string;
}

export interface ChatMessage {
	id: string;
	role: "user" | "ai";
	content: string;
	image?: string;
	documents?: ChatAttachment[];
	sources?: ChatSource[];
	usage?: TokenUsage;
	executionPlan?: string[];
	metadata?: Record<string, unknown>;
}

export interface ChatSession {
	id: string;
	title: string;
	messages: ChatMessage[];
	lastUpdated: Date;
}

// === MODEL INFO ===
export interface ModelInfo {
	name: string;
	desc: string;
	id: string;
	highlightClass?: string;
}

// === GENERATION CONFIG ===
export interface GenerationConfig {
	model: ZaneModel | ZaneImageModel | ZaneDocModel | ZaneCanvasModel;
	prompt: string;
	history: ChatMessage[];
	image?: string;
	documents?: ChatAttachment[];
	mimeType?: string;
	imageSize?: "1K" | "2K" | "4K";
	imageAspectRatio?: AspectRatio;
	reasoningLevel?: ReasoningLevel;
	userId?: string;
}

// === CANVAS ===
export interface CanvasArtifact {
	id: string;
	title: string;
	type: "code" | "document";
	language: string;
	content: string;
	isVisible?: boolean;
}

// === DOCUMENTS ===
export interface UploadedDocument {
	id: string;
	name: string;
	type: string;
	content: string;
	size: number;
}

// === USER ===
export interface UserPreferences {
	theme: Theme;
	language: Language;
	notificationsEnabled: boolean;
	biometricEnabled: boolean;
}

export interface UserRefinement {
	preferredName?: string;
	gender?: "male" | "female" | "other" | "";
	workInterest?: string;
	about?: string;
	interactionStyle?: string;
}

export interface UserProfile {
	id: string;
	email: string;
	fullName: string;
	avatarUrl?: string;
	preferences: UserPreferences;
	refinement: UserRefinement;
	createdAt: Date;
	updatedAt: Date;
}

// === MEMORY ===
export interface MemoryFact {
	id: string;
	userId: string;
	content: string;
	importanceScore: number;
	createdAt: Date;
}

export interface MemoryTimelineEvent {
	id: string;
	userId: string;
	content: string;
	eventDate: Date;
	createdAt: Date;
}
