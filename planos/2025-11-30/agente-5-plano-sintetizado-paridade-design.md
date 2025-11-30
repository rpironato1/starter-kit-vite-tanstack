# Plano Sintetizado de Paridade de Design UI/UX

**AGENTE 5 - Síntese Consolidada**  
**Data:** 30 de novembro de 2025  
**Repositórios de Referência:** `rpironato1/zane-ai` + `rpironato1/zane-ai-ux-interface`

---

## 📊 RESUMO EXECUTIVO

| Métrica | Valor Atual | Meta | Consenso |
|---------|-------------|------|----------|
| **Paridade Geral** | ~78% | 95-100% | ✅ 4/4 agentes |
| **Componentes Críticos** | 5 | 5 | ✅ 4/4 agentes |
| **Tempo Estimado** | 12-16h | - | Média consolidada |
| **Impacto Esperado** | +22% paridade | - | ✅ 4/4 agentes |

---

## ✅ ITENS DE CONSENSO (4/4 AGENTES CONCORDAM)

### 1. AI Message Badge - CRÍTICO

**Diagnóstico Unânime:**
- Badge atual: `rounded-full px-3 py-1` formato pill com "Zane AI"
- Badge esperado: `w-5 h-5 rounded-md` quadrado com "Z"
- Glow ausente: `shadow-[0_0_10px_rgba(36,107,49,0.4)]`
- Gradient incorreto: `to-emerald-600` → `to-emerald-900`

**Paridade:** 30-40% → 100%

### 2. EmptyState Container 3D - CRÍTICO

**Diagnóstico Unânime:**
- Ícone atual: Renderizado diretamente `size-16 sm:size-20`
- Container esperado: `w-20 h-20 rounded-[24px]` com blur effect
- Blur layer: `blur-xl animate-pulse` atrás do container
- Cor título mobile: `text-[#eecfa1]` (dourado)
- Títulos incorretos para Photo/Doc/Canvas

**Paridade:** 40-50% → 100%

### 3. LoadingIndicator Label "Zane" - CRÍTICO

**Diagnóstico Unânime:**
- Atual: Apenas spinner + texto
- Esperado: Label "Zane" colorido + spinner + texto contextual
- Cores por módulo: chat/photo=verde, doc=azul, canvas=roxo
- Textos específicos por módulo

**Paridade:** 50-75% → 100%

### 4. ReasoningSelector Popup - CRÍTICO

**Diagnóstico Unânime:**
- Posição atual: `top-full mt-2` (abre para baixo)
- Posição esperada: `bottom-full mb-4` (abre para cima)
- Brain icon: Falta `transform scale-x-[-1]` (espelhamento)
- Cores incorretas: soft=blue→green, max=red→#15803d
- Header ausente: "Nível de Raciocínio"
- Descrições sem tokens: "(1k/2k/4k tokens)"

**Paridade:** 60% → 100%

### 5. UserMessage Shadow - IMPORTANTE

**Diagnóstico Unânime:**
- Shadow ausente: Adicionar `shadow-sm`
- Border incorreto: `border-border-default` → `border-white/5`

**Paridade:** 85% → 100%

### 6. Sources Chips - IMPORTANTE

**Diagnóstico Unânime:**
- Dot indicator ausente
- Glow no hover ausente: `shadow-[0_0_8px_rgba(36,107,49,0.8)]`
- Background incorreto: `bg-accent-primary/10` → `bg-zinc-900/50`
- ExternalLink sempre visível → hover only

**Paridade:** 30% → 100%

### 7. AttachMenu - IMPORTANTE

**Diagnóstico Unânime:**
- Backdrop blur ausente: `backdrop-blur-xl`
- Radius incorreto: `rounded-xl` → `rounded-2xl`
- Labels incorretos: "Tirar foto" → "Câmera", etc.
- Margem: `mb-2` → `mb-4`

**Paridade:** 70% → 100%

---

## 🔄 RESOLUÇÃO DE DISCREPÂNCIAS

### 1. Tempo Estimado Total

| Agente | Estimativa | Justificativa |
|--------|------------|---------------|
| Agente 1 | 14-18h | Sprints detalhados |
| Agente 2 | 6-9h | Fases mais curtas |
| Agente 3 | 16-26h | Inclui novos componentes |
| Agente 4 | 12h | Cronograma otimizado |

**DECISÃO:** 12-16h (média ponderada, removendo outliers)

### 2. Cor do título EmptyState mobile

| Agente | Valor |
|--------|-------|
| Agente 1 | `text-[#eecfa1]` |
| Agente 2 | `text-[#eecfa1]` |
| Agente 3 | `text-[#eecfa1]` |
| Agente 4 | `text-[#eecfa1]` |

**DECISÃO:** `text-[#eecfa1]` (100% consenso)

### 3. Cores do ReasoningSelector

| Nível | Agente 1/2/3/4 | Decisão |
|-------|----------------|---------|
| Soft | `text-green-400` | ✅ Consenso |
| Medium | `text-yellow-400` | ✅ Consenso |
| Max | `text-[#15803d]` | ✅ Consenso |
| Off/Disabled | `text-red-500` / `text-text-secondary` | `text-text-secondary` (mais neutro) |

### 4. Títulos EmptyState por Módulo

| Módulo | Título Final (Consenso) |
|--------|------------------------|
| Chat | "Olá! Como posso ajudar?" ou "Como posso te ajudar esta noite?" |
| Photo | "Zane Photo Studio" |
| Doc | "Zane Doc" |
| Canvas | "Zane Canvas" |

**DECISÃO:** Usar versão mais curta para Chat: "Olá! Como posso ajudar?"

### 5. Criação de Novos Componentes

| Agente | Novos Componentes Propostos |
|--------|----------------------------|
| Agente 3 | ZaneBadge, EmptyStateContainer, ReasoningPopup |
| Outros | Refatorar inline nos componentes existentes |

**DECISÃO:** Criar apenas `ZaneBadge` como componente reutilizável. Demais correções inline para evitar over-engineering.

---

## 📋 LISTA DEFINITIVA DE COMPONENTES A MODIFICAR

### Ordem de Implementação Otimizada

| Ordem | Componente | Arquivo | Prioridade | Tempo |
|-------|------------|---------|------------|-------|
| 1 | ZaneBadge (novo) | `src/components/ui/zane-badge.tsx` | CRÍTICO | 30min |
| 2 | AIMessage Badge | `src/components/chat/AIMessage.tsx` | CRÍTICO | 1h |
| 3 | EmptyState Container | `src/components/chat/EmptyState.tsx` | CRÍTICO | 2h |
| 4 | LoadingIndicator | `src/components/chat/LoadingIndicator.tsx` | CRÍTICO | 45min |
| 5 | ReasoningSelector | `src/components/selectors/ReasoningSelector.tsx` | CRÍTICO | 2h |
| 6 | Sources Chips | `src/components/chat/AIMessage.tsx` | IMPORTANTE | 1h |
| 7 | UserMessage | `src/components/chat/UserMessage.tsx` | IMPORTANTE | 15min |
| 8 | AttachMenu | `src/components/selectors/AttachMenu.tsx` | IMPORTANTE | 45min |

**Total: 8h 15min** (estimativa otimista) a **12h** (com testes e ajustes)

---

## 💻 CÓDIGO DE CORREÇÃO CONSOLIDADO

### 1. ZaneBadge (Novo Componente)

**Arquivo:** `src/components/ui/zane-badge.tsx`

```tsx
import { cn } from "@/lib/utils";

type ZaneBadgeVariant = "default" | "photo" | "doc" | "canvas";

interface ZaneBadgeProps {
	variant?: ZaneBadgeVariant;
	showLabel?: boolean;
	className?: string;
}

const variantConfig = {
	default: {
		gradient: "from-accent-primary to-emerald-900",
		label: "Zane AI",
	},
	photo: {
		gradient: "from-accent-primary to-emerald-900",
		label: "Zane Photo",
	},
	doc: {
		gradient: "from-blue-500 to-blue-700",
		label: "Zane Doc",
	},
	canvas: {
		gradient: "from-purple-500 to-purple-700",
		label: "Zane Canvas",
	},
};

export function ZaneBadge({
	variant = "default",
	showLabel = true,
	className,
}: ZaneBadgeProps) {
	const config = variantConfig[variant];

	return (
		<div className={cn("flex items-center gap-2 pl-1 select-none", className)}>
			{/* Badge quadrado com "Z" */}
			<div
				className={cn(
					"w-5 h-5 rounded-md flex items-center justify-center",
					"bg-gradient-to-br",
					config.gradient,
					"text-white font-serif font-bold text-[9px]",
					"shadow-[0_0_10px_rgba(36,107,49,0.4)]",
				)}
			>
				Z
			</div>

			{/* Label separado */}
			{showLabel && (
				<span className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">
					{config.label}
				</span>
			)}
		</div>
	);
}
```

---

### 2. AIMessage.tsx - Correção Completa

**Arquivo:** `src/components/chat/AIMessage.tsx`

```tsx
import { motion } from "framer-motion";
import {
	Activity,
	Check,
	Copy,
	ExternalLink,
	RotateCcw,
	ThumbsDown,
	ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TokenUsage } from "@/types";
import { ZaneBadge } from "@/components/ui/zane-badge";
import { MessageRenderer } from "./MessageRenderer";
import { TodoListPanel } from "./TodoListPanel";

interface AIMessageProps {
	content: string;
	timestamp?: Date;
	isLoading?: boolean;
	image?: string;
	sources?: Array<{ title: string; uri: string }>;
	usage?: TokenUsage;
	executionPlan?: string[];
	hideCodeBlocks?: boolean;
	onCopy?: () => void;
	onLike?: () => void;
	onDislike?: () => void;
	onRetry?: () => void;
	onTokenDetails?: (usage: TokenUsage) => void;
	isLastMessage?: boolean;
}

export function AIMessage({
	content,
	timestamp,
	isLoading = false,
	image,
	sources,
	usage,
	executionPlan,
	hideCodeBlocks = false,
	onCopy,
	onLike,
	onDislike,
	onRetry,
	onTokenDetails,
	isLastMessage = false,
}: AIMessageProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			onCopy?.();
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
			className="group mr-auto max-w-[90%] md:max-w-2xl"
		>
			{/* Header with Zane AI badge - CORRIGIDO */}
			<div className="mb-2">
				<ZaneBadge variant="default" showLabel={true} />
			</div>

			{/* Message content */}
			<div className="px-1">
				{isLoading ? (
					<div className="flex items-center gap-1">
						<motion.span
							animate={{ opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity }}
							className="h-2 w-2 rounded-full bg-accent-primary"
						/>
						<motion.span
							animate={{ opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
							className="h-2 w-2 rounded-full bg-accent-primary"
						/>
						<motion.span
							animate={{ opacity: [0.4, 1, 0.4] }}
							transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
							className="h-2 w-2 rounded-full bg-accent-primary"
						/>
					</div>
				) : (
					<>
						{/* Execution Plan */}
						{executionPlan && executionPlan.length > 0 && (
							<TodoListPanel items={executionPlan} />
						)}

						{/* Main Content */}
						<MessageRenderer
							content={content}
							hideCodeBlocks={hideCodeBlocks}
						/>

						{/* Generated Image */}
						{image && (
							<div className="mt-3">
								<img
									src={image}
									alt="Imagem gerada"
									className="rounded-lg max-w-full border border-border-default"
								/>
							</div>
						)}

						{/* Sources Chips - CORRIGIDO */}
						{sources && sources.length > 0 && (
							<div className="mt-4 pt-4 border-t border-white/5 w-full">
								<div className="flex items-center gap-3 mb-3">
									<span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
										Fontes Consultadas
									</span>
									<div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
								</div>
								<div className="flex flex-wrap gap-2">
									{sources.map((source, idx) => (
										<a
											key={`source-${source.title}-${idx}`}
											href={source.uri}
											target="_blank"
											rel="noopener noreferrer"
											className={cn(
												"group/source flex items-center gap-2",
												"pl-2 pr-3 py-1.5 rounded-lg",
												"bg-zinc-900/50 hover:bg-zinc-800",
												"border border-white/5 hover:border-white/10",
												"transition-all duration-300 no-underline",
											)}
										>
											{/* Dot indicator com glow */}
											<div
												className={cn(
													"w-1.5 h-1.5 rounded-full",
													"bg-zinc-600",
													"group-hover/source:bg-accent-primary",
													"group-hover/source:shadow-[0_0_8px_rgba(36,107,49,0.8)]",
													"transition-all",
												)}
											/>
											<span
												className={cn(
													"text-xs font-medium truncate max-w-[200px]",
													"text-zinc-400 group-hover/source:text-zinc-200",
													"transition-colors",
												)}
											>
												{source.title}
											</span>
											<ExternalLink
												className={cn(
													"w-3 h-3",
													"text-zinc-700 group-hover/source:text-zinc-400",
													"opacity-0 group-hover/source:opacity-100",
													"-ml-1 group-hover/source:ml-0",
													"transition-all",
													"transform group-hover/source:translate-x-0.5",
												)}
											/>
										</a>
									))}
								</div>
							</div>
						)}
					</>
				)}

				{timestamp && (
					<time className="mt-2 block text-xs text-text-secondary">
						{timestamp.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</time>
				)}
			</div>

			{/* Action buttons footer - CORRIGIDO: opacidade base */}
			{!isLoading && (
				<div className="mt-3 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity duration-200">
					<div className="flex items-center gap-1">
						<button
							type="button"
							onClick={handleCopy}
							className={cn(
								"flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary",
								copied && "text-accent-primary",
							)}
							aria-label={copied ? "Copiado" : "Copiar mensagem"}
						>
							{copied ? (
								<Check className="h-4 w-4" />
							) : (
								<Copy className="h-4 w-4" />
							)}
						</button>

						<button
							type="button"
							onClick={onLike}
							className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
							aria-label="Gostei"
						>
							<ThumbsUp className="h-4 w-4" />
						</button>

						<button
							type="button"
							onClick={onDislike}
							className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
							aria-label="Não gostei"
						>
							<ThumbsDown className="h-4 w-4" />
						</button>

						{isLastMessage && onRetry && (
							<button
								type="button"
								onClick={onRetry}
								className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary transition-colors hover:bg-bg-hover hover:text-text-primary"
								aria-label="Tentar novamente"
							>
								<RotateCcw className="h-4 w-4" />
							</button>
						)}
					</div>

					{/* Token Usage Button */}
					{onTokenDetails && usage && (
						<button
							type="button"
							onClick={() => onTokenDetails(usage)}
							className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-text-secondary hover:bg-bg-hover hover:text-text-primary"
							aria-label="Ver detalhes de tokens"
						>
							<Activity className="h-4 w-4" />
							<span>{usage.totalTokens.toLocaleString()}</span>
						</button>
					)}
				</div>
			)}
		</motion.div>
	);
}

export default AIMessage;
```

---

### 3. EmptyState.tsx - Correção Completa

**Arquivo:** `src/components/chat/EmptyState.tsx`

```tsx
import { motion } from "framer-motion";
import { BookOpen, LayoutGrid, MessageSquare, Wand2 } from "lucide-react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type EmptyStateVariant = "chat" | "photo" | "doc" | "canvas";

interface EmptyStateProps {
	variant?: EmptyStateVariant;
	customTitle?: string;
	customSubtitle?: string;
}

interface VariantConfig {
	icon: ElementType;
	title: string;
	subtitle: string;
	iconClassName: string;
	blurClassName: string;
}

const variantConfigs: Record<EmptyStateVariant, VariantConfig> = {
	chat: {
		icon: MessageSquare,
		title: "Olá! Como posso ajudar?",
		subtitle: "Faça uma pergunta para começar",
		iconClassName: "text-accent-primary",
		blurClassName: "bg-accent-primary/20",
	},
	photo: {
		icon: Wand2,
		title: "Zane Photo Studio",
		subtitle: "Imagine, descreva e crie. Use o poder da IA para dar vida às suas ideias.",
		iconClassName: "text-accent-primary",
		blurClassName: "bg-accent-primary/20",
	},
	doc: {
		icon: BookOpen,
		title: "Zane Doc",
		subtitle: "Faça upload de documentos de texto ou código e converse com eles.",
		iconClassName: "text-blue-500",
		blurClassName: "bg-blue-500/10",
	},
	canvas: {
		icon: LayoutGrid,
		title: "Zane Canvas",
		subtitle: "Um espaço dedicado para construção de ideias, escrita longa e projetos complexos.",
		iconClassName: "text-purple-500",
		blurClassName: "bg-purple-500/10",
	},
};

export function EmptyState({
	variant = "chat",
	customTitle,
	customSubtitle,
}: EmptyStateProps) {
	const config = variantConfigs[variant];
	const Icon = config.icon;

	const title = customTitle ?? config.title;
	const subtitle = customSubtitle ?? config.subtitle;

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="flex flex-1 flex-col items-center justify-center px-4 text-center"
		>
			{/* Container 3D com blur effect - CORRIGIDO */}
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="relative mb-6"
			>
				{/* Blur layer pulsante */}
				<div
					className={cn(
						"absolute inset-0 blur-xl rounded-full animate-pulse",
						config.blurClassName,
					)}
				/>

				{/* Container 3D principal */}
				<div
					className={cn(
						"relative w-20 h-20",
						"bg-bg-surface",
						"rounded-[24px]",
						"flex items-center justify-center",
						"border border-white/5",
						"shadow-2xl",
					)}
				>
					<Icon
						className={cn("w-8 h-8", config.iconClassName)}
						strokeWidth={1.5}
					/>
				</div>
			</motion.div>

			{/* Título com cor dourada no mobile - CORRIGIDO */}
			<motion.h1
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.2 }}
				className="mb-3 font-serif text-3xl md:text-4xl text-[#eecfa1] sm:text-text-primary text-center whitespace-pre-line"
			>
				{title}
			</motion.h1>

			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4, delay: 0.3 }}
				className="max-w-sm text-base text-text-secondary sm:text-lg leading-relaxed"
			>
				{subtitle}
			</motion.p>
		</motion.div>
	);
}
```

---

### 4. LoadingIndicator.tsx - Correção Completa

**Arquivo:** `src/components/chat/LoadingIndicator.tsx`

```tsx
import { motion } from "framer-motion";
import { Brain, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ModuleVariant = "chat" | "photo" | "doc" | "canvas";

interface LoadingIndicatorProps {
	variant?: "default" | "reasoning";
	module?: ModuleVariant;
	text?: string;
}

const moduleConfig = {
	chat: {
		color: "text-accent-primary",
		text: "Pensando...",
	},
	photo: {
		color: "text-accent-primary",
		text: "Criando sua obra de arte...",
	},
	doc: {
		color: "text-blue-400",
		text: "Lendo documentos e analisando...",
	},
	canvas: {
		color: "text-purple-400",
		text: "Estruturando ideias...",
	},
};

export function LoadingIndicator({
	variant = "default",
	module = "chat",
	text,
}: LoadingIndicatorProps) {
	const config = moduleConfig[module];
	const isReasoning = variant === "reasoning";
	const displayText = text ?? (isReasoning ? "Raciocinando..." : config.text);
	const Icon = isReasoning ? Brain : Loader2;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="flex items-center gap-2 text-text-secondary"
		>
			{/* Label "Zane" colorido - ADICIONADO */}
			<span className={cn("font-bold text-xs", config.color)}>Zane</span>

			<Icon
				className={cn(
					"size-4",
					isReasoning ? "animate-pulse" : "animate-spin",
				)}
			/>
			<span className="text-sm">{displayText}</span>
		</motion.div>
	);
}
```

---

### 5. ReasoningSelector.tsx - Correção Completa

**Arquivo:** `src/components/selectors/ReasoningSelector.tsx`

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Check, ChevronDown, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ReasoningLevel = "off" | "soft" | "medium" | "max";

interface ReasoningSelectorProps {
	value: ReasoningLevel;
	onChange: (level: ReasoningLevel) => void;
	variant?: "dropdown" | "inline";
	className?: string;
}

// CORRIGIDO: Cores e descrições conforme protótipos
const REASONING_LEVELS = {
	off: {
		label: "Desativado",
		description: "Raciocínio Desativado",
		color: "text-text-secondary",
		icon: Zap,
	},
	soft: {
		label: "Soft",
		description: "Rápido e direto (1k tokens)",
		color: "text-green-400", // CORRIGIDO: era text-blue-400
		icon: Brain,
	},
	medium: {
		label: "Médio",
		description: "Equilibrado (2k tokens)",
		color: "text-yellow-400", // CORRIGIDO: era text-amber-400
		icon: Brain,
	},
	max: {
		label: "Max",
		description: "Análise profunda (4k tokens)",
		color: "text-[#15803d]", // CORRIGIDO: era text-red-400
		icon: Sparkles,
	},
} as const;

const LEVELS: ReasoningLevel[] = ["off", "soft", "medium", "max"];

const springConfig = {
	type: "spring" as const,
	stiffness: 400,
	damping: 30,
};

export function ReasoningSelector({
	value,
	onChange,
	variant = "dropdown",
	className,
}: ReasoningSelectorProps) {
	if (variant === "inline") {
		return (
			<InlineSelector value={value} onChange={onChange} className={className} />
		);
	}
	return (
		<DropdownSelector value={value} onChange={onChange} className={className} />
	);
}

function InlineSelector({
	value,
	onChange,
	className,
}: Omit<ReasoningSelectorProps, "variant">) {
	return (
		<div
			className={cn(
				"flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-surface)]",
				className,
			)}
		>
			{LEVELS.map((level) => {
				const config = REASONING_LEVELS[level];
				const isSelected = level === value;
				return (
					<button
						key={level}
						type="button"
						onClick={() => onChange(level)}
						className={cn(
							"relative px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
							isSelected
								? config.color
								: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
						)}
					>
						{isSelected && (
							<motion.div
								layoutId="reasoning-pill"
								className="absolute inset-0 bg-[var(--bg-hover)] rounded-md"
								transition={springConfig}
							/>
						)}
						<span className="relative z-10">{config.label}</span>
					</button>
				);
			})}
		</div>
	);
}

function DropdownSelector({
	value,
	onChange,
	className,
}: Omit<ReasoningSelectorProps, "variant">) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const selected = REASONING_LEVELS[value];
	const Icon = selected.icon;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") setIsOpen(false);
		}
		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.addEventListener("keydown", handleKeyDown);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div ref={containerRef} className={cn("relative", className)}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					"flex items-center gap-2 px-3 py-2 rounded-lg",
					"text-sm font-medium transition-colors",
					"bg-[var(--bg-surface)] hover:bg-[var(--bg-hover)]",
					"border border-zinc-700/50",
				)}
			>
				{/* CORRIGIDO: Brain icon espelhado */}
				<Icon
					className={cn(
						"size-4",
						selected.color,
						value !== "off" && Icon === Brain && "scale-x-[-1]",
					)}
				/>
				<span className={selected.color}>{selected.label}</span>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={springConfig}
				>
					<ChevronDown className="size-4 text-[var(--text-secondary)]" />
				</motion.div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: 8, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.95 }}
						transition={springConfig}
						className={cn(
							// CORRIGIDO: Popup abre para cima
							"absolute bottom-full left-0 mb-4 z-50",
							"min-w-[240px] p-1.5 rounded-2xl",
							"bg-[#1f1f22] border border-zinc-800",
							"shadow-xl",
						)}
					>
						{/* ADICIONADO: Header do popup */}
						<div className="px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
							Nível de Raciocínio
						</div>

						{LEVELS.map((level) => {
							const config = REASONING_LEVELS[level];
							const LevelIcon = config.icon;
							const isSelected = level === value;
							return (
								<button
									key={level}
									type="button"
									onClick={() => {
										onChange(level);
										setIsOpen(false);
									}}
									className={cn(
										"w-full flex items-start justify-between p-2.5 rounded-xl",
										"text-left transition-colors",
										isSelected
											? "bg-zinc-800 text-white"
											: "text-zinc-400 hover:bg-[#2c2c2e] hover:text-zinc-200",
									)}
								>
									<div className="flex items-start gap-3">
										<div className="mt-0.5">
											{/* CORRIGIDO: Brain icon espelhado no menu */}
											<LevelIcon
												className={cn(
													"size-4",
													config.color,
													level !== "off" &&
														LevelIcon === Brain &&
														"scale-x-[-1]",
												)}
											/>
										</div>
										<div className="text-left">
											<div className="text-xs font-medium">{config.label}</div>
											<div className="text-[10px] text-zinc-500 leading-tight">
												{config.description}
											</div>
										</div>
									</div>
									{isSelected && (
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={springConfig}
										>
											<Check className="w-3 h-3 text-accent-primary mt-1" />
										</motion.div>
									)}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
```

---

### 6. UserMessage.tsx - Correção

**Arquivo:** `src/components/chat/UserMessage.tsx`

```tsx
import { motion } from "framer-motion";

interface UserMessageProps {
	content: string;
	imageUrl?: string;
	timestamp?: Date;
}

export function UserMessage({
	content,
	imageUrl,
	timestamp,
}: UserMessageProps) {
	return (
		<motion.div
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{
				type: "spring",
				stiffness: 500,
				damping: 30,
			}}
			className="ml-auto max-w-[85%] md:max-w-[65%]"
		>
			{/* CORRIGIDO: shadow-sm e border-white/5 */}
			<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-white/5 shadow-sm">
				{imageUrl && (
					<div className="mb-2">
						<img
							src={imageUrl}
							alt="Attached"
							className="w-full max-w-[200px] rounded-lg object-cover"
						/>
					</div>
				)}
				<p className="text-[15px] text-text-primary">{content}</p>
				{timestamp && (
					<time className="mt-1 block text-xs text-text-secondary">
						{timestamp.toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</time>
				)}
			</div>
		</motion.div>
	);
}

export default UserMessage;
```

---

### 7. AttachMenu.tsx - Correção

**Arquivo:** `src/components/selectors/AttachMenu.tsx`

```tsx
import { AnimatePresence, motion } from "framer-motion";
import { Camera, FileText, Image } from "lucide-react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type AttachType = "camera" | "gallery" | "files";

interface AttachMenuProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (type: AttachType) => void;
	className?: string;
}

// CORRIGIDO: Labels curtos conforme protótipos
const menuItems: { type: AttachType; icon: typeof Camera; label: string }[] = [
	{ type: "camera", icon: Camera, label: "Câmera" },
	{ type: "gallery", icon: Image, label: "Fotos" },
	{ type: "files", icon: FileText, label: "Arquivos" },
];

const springTransition = {
	type: "spring",
	stiffness: 400,
	damping: 30,
} as const;

export function AttachMenu({
	isOpen,
	onClose,
	onSelect,
	className,
}: AttachMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleKeyDown);
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleSelect = (type: AttachType) => {
		onSelect(type);
		onClose();
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					ref={menuRef}
					initial={{ opacity: 0, scale: 0.9, y: 10 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.9, y: 10 }}
					transition={springTransition}
					className={cn(
						// CORRIGIDO: mb-4, rounded-2xl, backdrop-blur-xl
						"absolute bottom-full mb-4 left-0 origin-bottom",
						"w-[220px] rounded-2xl p-2",
						"bg-[#1f1f22] backdrop-blur-xl",
						"border border-zinc-800",
						"shadow-xl",
						className,
					)}
				>
					<ul className="flex flex-col gap-0.5">
						{menuItems.map(({ type, icon: Icon, label }) => (
							<li key={type}>
								<button
									type="button"
									onClick={() => handleSelect(type)}
									className={cn(
										// CORRIGIDO: p-3 rounded-xl
										"flex w-full items-center gap-3 p-3 rounded-xl",
										"text-sm text-zinc-300",
										"hover:bg-[#2c2c2e] hover:text-white",
										"transition-colors duration-150",
										"focus:outline-none focus:ring-2 focus:ring-accent-primary/50",
									)}
								>
									<Icon className="size-4 text-zinc-400" />
									<span className="font-medium">{label}</span>
								</button>
							</li>
						))}
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
```

---

## 📈 ORDEM DE IMPLEMENTAÇÃO OTIMIZADA

### Sprint 1: Identidade Visual (5-6h)

| # | Tarefa | Arquivo | Tempo |
|---|--------|---------|-------|
| 1 | Criar ZaneBadge | `ui/zane-badge.tsx` | 30min |
| 2 | Corrigir AIMessage Badge | `chat/AIMessage.tsx` | 30min |
| 3 | Corrigir EmptyState Container 3D | `chat/EmptyState.tsx` | 2h |
| 4 | Corrigir LoadingIndicator | `chat/LoadingIndicator.tsx` | 45min |
| 5 | Corrigir ReasoningSelector | `selectors/ReasoningSelector.tsx` | 2h |

### Sprint 2: Refinamentos (3-4h)

| # | Tarefa | Arquivo | Tempo |
|---|--------|---------|-------|
| 6 | Corrigir Sources Chips | `chat/AIMessage.tsx` | 1h |
| 7 | Corrigir UserMessage | `chat/UserMessage.tsx` | 15min |
| 8 | Corrigir AttachMenu | `selectors/AttachMenu.tsx` | 45min |
| 9 | Testes visuais e ajustes | Todos | 1-2h |

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Visuais

- [ ] Badge Zane AI é quadrado 20x20 com letra "Z" em serif bold
- [ ] Badge tem gradient `from-accent-primary to-emerald-900`
- [ ] Badge tem glow verde `shadow-[0_0_10px_rgba(36,107,49,0.4)]`
- [ ] Label "ZANE AI" está separado em uppercase tracking-wider
- [ ] Empty states têm container 3D 80x80 com `rounded-[24px]`
- [ ] Container tem blur pulsante atrás
- [ ] Container tem `shadow-2xl` e `border border-white/5`
- [ ] Ícone dentro do container é 32x32
- [ ] Título empty state é dourado `text-[#eecfa1]` no mobile
- [ ] Título usa `text-3xl md:text-4xl font-serif`
- [ ] Chat diz "Olá! Como posso ajudar?"
- [ ] Photo diz "Zane Photo Studio"
- [ ] Doc diz "Zane Doc"
- [ ] Canvas diz "Zane Canvas"
- [ ] LoadingIndicator mostra "Zane" em cor do módulo antes do spinner
- [ ] Textos de loading são contextuais por módulo
- [ ] ReasoningSelector abre popup `bottom-full mb-4`
- [ ] Popup tem header "Nível de Raciocínio" uppercase
- [ ] Brain icon está espelhado `transform scale-x-[-1]`
- [ ] Cores: soft=green-400, medium=yellow-400, max=#15803d
- [ ] Sources têm dot 6x6 com glow verde no hover
- [ ] Sources background é `bg-zinc-900/50`
- [ ] ExternalLink aparece apenas no hover com transition
- [ ] UserMessage tem `shadow-sm` e `border-white/5`
- [ ] AttachMenu tem `backdrop-blur-xl` e `rounded-2xl`
- [ ] AttachMenu labels são "Câmera", "Fotos", "Arquivos"

### Funcionais

- [ ] Copiar mensagem ainda funciona
- [ ] Links de Sources abrem em nova aba
- [ ] Loading indicator anima corretamente
- [ ] Reasoning selector altera estado corretamente
- [ ] AttachMenu fecha ao clicar fora

### Build

- [ ] `npx tsc --noEmit` passa sem erros
- [ ] `npm run check` passa sem erros
- [ ] `npm run build` compila com sucesso

---

## 📊 MÉTRICAS DE SUCESSO

| Componente | Antes | Depois | Impacto |
|------------|-------|--------|---------|
| AIMessage Badge | 30-40% | 100% | +8% geral |
| AIMessage Sources | 30% | 100% | +2% geral |
| EmptyState Container | 40-50% | 100% | +6% geral |
| LoadingIndicator | 50-75% | 100% | +3% geral |
| UserMessage | 85% | 100% | +1% geral |
| ReasoningSelector | 60% | 100% | +4% geral |
| AttachMenu | 70% | 100% | +1% geral |
| **TOTAL** | **~78%** | **~100%** | **+22%** |

---

## 📁 ARQUIVOS MODIFICADOS (RESUMO)

```
src/components/
├── ui/
│   └── zane-badge.tsx              # NOVO
├── chat/
│   ├── AIMessage.tsx               # Badge + Sources
│   ├── EmptyState.tsx              # Container 3D + Títulos
│   ├── LoadingIndicator.tsx        # Label Zane
│   └── UserMessage.tsx             # Shadow + Border
└── selectors/
    ├── ReasoningSelector.tsx       # Popup + Cores + Icon flip
    └── AttachMenu.tsx              # Blur + Labels
```

---

## 🔗 DESIGN TOKENS DE REFERÊNCIA

```css
/* Cores Primárias */
--accent-primary: #246B31
--accent-textHighlight: #eecfa1

/* Backgrounds */
--bg-surface: #27272a
--bg-hover: #2c2c2e

/* Shadows */
shadow-[0_0_10px_rgba(36,107,49,0.4)]  /* Badge glow */
shadow-[0_0_8px_rgba(36,107,49,0.8)]   /* Sources hover glow */
shadow-2xl                              /* Container 3D */
shadow-sm                               /* User message */

/* Reasoning Colors */
text-green-400   /* Soft */
text-yellow-400  /* Medium */
text-[#15803d]   /* Max */
```

---

**Gerado por:** AGENTE 5 - Síntese de Planos de Paridade  
**Baseado em:** 4 análises independentes (Agentes 1, 2, 3, 4)  
**Status:** ✅ Pronto para implementação  
**Data:** 30 de novembro de 2025
