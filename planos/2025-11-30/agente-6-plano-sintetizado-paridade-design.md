# Plano Sintetizado de Paridade de Design UI/UX

**AGENTE 6 - Síntese com Resolução de Discrepâncias**  
**Data:** 30 de novembro de 2025  
**Repositórios de Referência:** `rpironato1/zane-ai` + `rpironato1/zane-ai-ux-interface`

---

## 📊 RESUMO EXECUTIVO

| Métrica | Valor Atual | Meta | Consenso |
|---------|-------------|------|----------|
| **Paridade Geral** | ~78% | 95-100% | ✅ 4/4 agentes |
| **Componentes Críticos** | 7 | 7 | ✅ 4/4 agentes |
| **Tempo Estimado Final** | **10-14h** | - | Calculado abaixo |
| **Impacto Esperado** | +22% paridade | - | ✅ 4/4 agentes |

---

## ✅ SEÇÃO 1: ITENS DE PARIDADE (100% CONSENSO)

Os seguintes itens têm **concordância unânime** entre todos os 4 agentes:

### 1.1 AI Message Badge

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Formato | Quadrado `w-5 h-5 rounded-md` |
| Conteúdo | Letra "Z" única |
| Font | `font-serif font-bold text-[9px]` |
| Gradient | `from-accent-primary to-emerald-900` |
| Glow | `shadow-[0_0_10px_rgba(36,107,49,0.4)]` |
| Label separado | `text-[11px] font-bold uppercase tracking-wider text-zinc-500` |

### 1.2 EmptyState Container 3D

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Dimensões | `w-20 h-20` |
| Border Radius | `rounded-[24px]` |
| Background | `bg-bg-surface` (#27272a) |
| Border | `border border-white/5` |
| Shadow | `shadow-2xl` |
| Blur Layer | Atrás com `blur-xl animate-pulse` |
| Ícone interno | `w-8 h-8` |

### 1.3 EmptyState Títulos

| Módulo | Título Consensuado |
|--------|-------------------|
| Chat | "Olá! Como posso ajudar?" ou "Como posso te ajudar esta noite?" |
| Photo | "Zane Photo Studio" |
| Doc | "Zane Doc" |
| Canvas | "Zane Canvas" |
| Cor Mobile | `text-[#eecfa1]` (dourado) |
| Cor Desktop | `text-text-primary` |
| Tamanho | `text-3xl md:text-4xl` |

### 1.4 LoadingIndicator

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Label "Zane" | `font-bold text-xs text-accent-primary` |
| Posição Label | Antes do spinner e texto |
| Estrutura | "Zane" + Spinner + Texto contextual |

### 1.5 ReasoningSelector Popup

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Posição Popup | `bottom-full mb-4` (abre para cima) |
| Header | "Nível de Raciocínio" uppercase |
| Brain Icon | `transform scale-x-[-1]` (espelhado) |
| Container | `rounded-2xl` com `backdrop-blur-xl` |

### 1.6 Cores do Reasoning

| Nível | Cor Consensuada |
|-------|-----------------|
| Soft | `text-green-400` |
| Medium | `text-yellow-400` |
| Max | `text-[#15803d]` (verde escuro) |

### 1.7 Sources Chips

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Dot Indicator | `w-1.5 h-1.5 rounded-full bg-accent-primary` |
| Glow Hover | `shadow-[0_0_8px_rgba(36,107,49,0.8)]` |
| Background | `bg-zinc-900/50` |
| ExternalLink | `opacity-0 group-hover:opacity-100` |

### 1.8 UserMessage

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Shadow | `shadow-sm` |
| Border | `border border-white/5` |

### 1.9 AttachMenu

| Aspecto | Valor Consensuado |
|---------|-------------------|
| Backdrop | `backdrop-blur-xl` |
| Border Radius | `rounded-2xl` |
| Labels | "Câmera", "Fotos", "Arquivos" |
| Margem | `mb-4` |

---

## 🔄 SEÇÃO 2: ANÁLISE DE DISCREPÂNCIAS E RESOLUÇÕES

### DISCREPÂNCIA 1: Estimativa de Tempo Total

| Agente | Estimativa | Justificativa |
|--------|------------|---------------|
| Agente 1 | 14-18h | Sprints detalhados com validação |
| Agente 2 | 6-9h | Fases mais curtas, otimista |
| Agente 3 | 16-26h | Inclui criação de novos componentes |
| Agente 4 | 12h | Cronograma otimizado com código pronto |

**ANÁLISE:**
- Agente 2 subestima (6-9h) - não inclui testes e ajustes
- Agente 3 superestima (16-26h) - inclui componentes extras não consensuados
- Agentes 1 e 4 são mais realistas

**RESOLUÇÃO JUSTIFICADA:**
```
Média ponderada (removendo outliers):
- Agente 1: 16h (média de 14-18)
- Agente 4: 12h
- Média: (16 + 12) / 2 = 14h

Ajuste para buffer de testes: 10-14h

✅ DECISÃO FINAL: 10-14 horas
```

---

### DISCREPÂNCIA 2: Estrutura de Componentes

| Agente | Abordagem |
|--------|-----------|
| Agentes 1, 2, 4 | Modificar componentes existentes inline |
| Agente 3 | Criar novos componentes (ZaneBadge, EmptyStateContainer, ReasoningPopup) |

**ANÁLISE TÉCNICA (Princípio SOLID):**

**Opção A: Componentes Novos (Agente 3)**
- ✅ Single Responsibility: Cada componente com responsabilidade única
- ✅ Open/Closed: Extensível via props
- ✅ Reutilização: ZaneBadge pode ser usado em múltiplos lugares
- ❌ Over-engineering: Para casos de uso único, adiciona complexidade

**Opção B: Modificação Inline (Agentes 1, 2, 4)**
- ✅ Simplicidade: Menos arquivos para manter
- ✅ Velocidade: Implementação mais rápida
- ❌ Duplicação: Se badge for usado em outro lugar, terá código duplicado

**RESOLUÇÃO JUSTIFICADA:**
```
Análise de uso do ZaneBadge:
- Usado em: AIMessage (header), LoadingIndicator (opcional)
- Uso futuro possível: Headers de módulos, Settings

Critério: Se componente é usado em 2+ lugares → criar separado

✅ DECISÃO FINAL: 
- CRIAR apenas ZaneBadge (usado em 2+ lugares)
- EmptyStateContainer: modificar inline (uso único)
- ReasoningPopup: modificar inline (já existe estrutura)
```

---

### DISCREPÂNCIA 3: Spring Config (Framer Motion)

| Agente | Stiffness | Damping | Contexto |
|--------|-----------|---------|----------|
| Agente 1 | 400 | 40 | Sidebar |
| Agente 3 | 400 | 30 | Popups |
| Agente 4 | 400 | 30 | Todos |
| Context7 | 300-400 | 25-40 | Geral |

**ANÁLISE TÉCNICA:**
- `stiffness: 400` - Consenso unânime
- `damping: 30` - Usado por 2 agentes (3 e 4)
- `damping: 40` - Usado por 1 agente (1)

Maior damping (40) = animação mais suave, menos "bouncy"
Menor damping (30) = animação mais responsiva, leve bounce

**RESOLUÇÃO JUSTIFICADA:**
```
Para UI interativa (popups, menus):
- damping: 30 é mais adequado (feedback visual imediato)

Para transições maiores (Sidebar):
- damping: 40 pode ser mantido (transição mais suave)

✅ DECISÃO FINAL:
- Popups/Menus: stiffness: 400, damping: 30
- Sidebar: stiffness: 400, damping: 40 (manter atual)
- Mensagens: stiffness: 300, damping: 30 (Context7)
```

**Código Padronizado:**
```tsx
// Spring configs padronizados
const springConfigs = {
  popup: { type: "spring", stiffness: 400, damping: 30 },
  sidebar: { type: "spring", stiffness: 400, damping: 40 },
  message: { type: "spring", stiffness: 300, damping: 30 },
  default: { type: "spring", stiffness: 400, damping: 30 },
};
```

---

### DISCREPÂNCIA 4: Cor do Nível "Off/Disabled" do Reasoning

| Agente | Cor |
|--------|-----|
| Agentes 1, 2, 3 | `text-text-secondary` (neutro) |
| Agente 4 | `text-red-500` |

**ANÁLISE UX:**
- Vermelho indica erro/perigo - não adequado para "desativado"
- Cinza neutro indica estado inativo sem conotação negativa

**RESOLUÇÃO JUSTIFICADA:**
```
✅ DECISÃO FINAL: text-text-secondary

Justificativa: "Desativado" é um estado válido, não um erro.
Vermelho seria confuso para o usuário.
```

---

### DISCREPÂNCIA 5: Título do Chat (Variação de Texto)

| Agente | Texto |
|--------|-------|
| Agente 1 | "Olá! Como posso ajudar?" |
| Agente 2, 3, 4 | "Como posso te ajudar esta noite?" |

**ANÁLISE:**
- "esta noite" é contextual (dinâmico baseado em horário?)
- "Olá!" é mais amigável e universal

**RESOLUÇÃO JUSTIFICADA:**
```
✅ DECISÃO FINAL: "Olá! Como posso ajudar?"

Justificativa:
1. Não requer lógica de horário
2. Mais simples de implementar
3. Funciona em qualquer horário
4. Mais alinhado com padrão de saudação
```

---

## 📋 SEÇÃO 3: PLANO UNIFICADO FINAL

### Ordem de Implementação Otimizada

| Sprint | Prioridade | Componentes | Tempo |
|--------|------------|-------------|-------|
| **Sprint 1** | CRÍTICO | ZaneBadge, AIMessage Badge, EmptyState, LoadingIndicator | 4-5h |
| **Sprint 2** | CRÍTICO | ReasoningSelector (popup completo) | 2h |
| **Sprint 3** | IMPORTANTE | Sources Chips, UserMessage, AttachMenu | 2-3h |
| **Sprint 4** | VALIDAÇÃO | Testes visuais, ajustes finos, build | 2-4h |
| **TOTAL** | - | - | **10-14h** |

### Arquivos a Modificar

```
src/components/
├── ui/
│   └── zane-badge.tsx              # NOVO (Sprint 1)
├── chat/
│   ├── AIMessage.tsx               # Badge + Sources (Sprint 1+3)
│   ├── EmptyState.tsx              # Container 3D + Títulos (Sprint 1)
│   ├── LoadingIndicator.tsx        # Label Zane (Sprint 1)
│   └── UserMessage.tsx             # Shadow + Border (Sprint 3)
└── selectors/
    ├── ReasoningSelector.tsx       # Popup completo (Sprint 2)
    └── AttachMenu.tsx              # Blur + Labels (Sprint 3)
```

---

## 💻 SEÇÃO 4: CÓDIGO DEFINITIVO

### 4.1 ZaneBadge (Novo Componente)

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

### 4.2 AIMessage.tsx - Badge + Sources

**Arquivo:** `src/components/chat/AIMessage.tsx`

**Modificações necessárias:**

```tsx
// IMPORT ADICIONAL
import { ZaneBadge } from "@/components/ui/zane-badge";

// SUBSTITUIR seção do header (aprox. linha 62-66):
// DE:
<div className="mb-2">
  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent-primary to-emerald-600 px-3 py-1 text-xs font-medium text-white">
    Zane AI
  </span>
</div>

// PARA:
<div className="mb-2">
  <ZaneBadge variant="default" showLabel={true} />
</div>

// SUBSTITUIR seção de sources (aprox. linha 99-116):
// DE:
{sources && sources.length > 0 && (
  <div className="mt-3 pt-3 border-t border-border-default">
    <p className="text-xs text-text-secondary mb-2">Fontes:</p>
    <div className="flex flex-wrap gap-2">
      {sources.map((source, idx) => (
        <a
          key={`source-${source.title}-${idx}`}
          href={source.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-accent-primary hover:underline bg-accent-primary/10 px-2 py-1 rounded"
        >
          <ExternalLink className="w-3 h-3" />
          {source.title}
        </a>
      ))}
    </div>
  </div>
)}

// PARA:
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
```

---

### 4.3 EmptyState.tsx - Container 3D + Títulos

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
			{/* Container 3D com blur effect */}
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

			{/* Título com cor dourada no mobile */}
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

### 4.4 LoadingIndicator.tsx - Label Zane

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
			{/* Label "Zane" colorido */}
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

### 4.5 ReasoningSelector.tsx - Popup Completo

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

// CORES E DESCRIÇÕES CONSENSUADAS
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
		color: "text-green-400",
		icon: Brain,
	},
	medium: {
		label: "Médio",
		description: "Equilibrado (2k tokens)",
		color: "text-yellow-400",
		icon: Brain,
	},
	max: {
		label: "Max",
		description: "Análise profunda (4k tokens)",
		color: "text-[#15803d]",
		icon: Sparkles,
	},
} as const;

const LEVELS: ReasoningLevel[] = ["off", "soft", "medium", "max"];

// Spring config padronizado para popups
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
				{/* Brain icon espelhado */}
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
							// Popup abre para CIMA
							"absolute bottom-full left-0 mb-4 z-50",
							"min-w-[240px] p-1.5 rounded-2xl",
							"bg-[#1f1f22] border border-zinc-800",
							"shadow-xl backdrop-blur-xl",
						)}
					>
						{/* Header do popup */}
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
											{/* Brain icon espelhado no menu */}
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

### 4.6 UserMessage.tsx - Shadow + Border

**Arquivo:** `src/components/chat/UserMessage.tsx`

**Modificação simples - apenas trocar a classe do container:**

```tsx
// DE:
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-border-default">

// PARA:
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-white/5 shadow-sm">
```

---

### 4.7 AttachMenu.tsx - Blur + Labels

**Arquivo:** `src/components/selectors/AttachMenu.tsx`

**Modificações necessárias:**

```tsx
// ATUALIZAR menuItems (labels simplificados):
const menuItems: { type: AttachType; icon: typeof Camera; label: string }[] = [
	{ type: "camera", icon: Camera, label: "Câmera" },
	{ type: "gallery", icon: Image, label: "Fotos" },
	{ type: "files", icon: FileText, label: "Arquivos" },
];

// ATUALIZAR container motion.div:
// DE:
className={cn(
  "absolute bottom-full mb-2 left-0 origin-bottom",
  "min-w-[200px] rounded-xl p-1.5",
  "bg-white dark:bg-zinc-800",
  "border border-zinc-200 dark:border-zinc-700",
  "shadow-lg dark:shadow-zinc-900/50",
  className,
)}

// PARA:
className={cn(
  "absolute bottom-full mb-4 left-0 origin-bottom",
  "w-[220px] rounded-2xl p-2",
  "bg-[#1f1f22] backdrop-blur-xl",
  "border border-zinc-800",
  "shadow-xl",
  className,
)}

// ATUALIZAR classes dos botões:
// DE:
className={cn(
  "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg",
  ...
)}

// PARA:
className={cn(
  "flex w-full items-center gap-3 p-3 rounded-xl",
  "text-sm text-zinc-300",
  "hover:bg-[#2c2c2e] hover:text-white",
  "transition-colors duration-150",
)}
```

---

## 📅 SEÇÃO 5: CRONOGRAMA REALISTA

### Sprint 1: Identidade Visual (4-5h)

| Tarefa | Tempo | Dependências |
|--------|-------|--------------|
| Criar `zane-badge.tsx` | 30min | Nenhuma |
| Atualizar AIMessage Badge | 30min | zane-badge.tsx |
| Refatorar EmptyState completo | 2h | Nenhuma |
| Atualizar LoadingIndicator | 45min | Nenhuma |
| Validação visual Sprint 1 | 30min | Todas anteriores |

### Sprint 2: UX Interativa (2h)

| Tarefa | Tempo | Dependências |
|--------|-------|--------------|
| Refatorar ReasoningSelector | 1.5h | Nenhuma |
| Validação funcional popup | 30min | ReasoningSelector |

### Sprint 3: Refinamentos (2-3h)

| Tarefa | Tempo | Dependências |
|--------|-------|--------------|
| Implementar Sources Chips | 1h | Nenhuma |
| Atualizar UserMessage | 15min | Nenhuma |
| Atualizar AttachMenu | 45min | Nenhuma |
| Validação visual Sprint 3 | 30min | Todas anteriores |

### Sprint 4: Validação Final (2-4h)

| Tarefa | Tempo | Dependências |
|--------|-------|--------------|
| `npx tsc --noEmit` | 15min | Todas anteriores |
| `npm run check` | 15min | TypeScript OK |
| `npm run build` | 15min | Lint OK |
| Teste visual completo | 1-2h | Build OK |
| Ajustes finais | 1h | Testes |

---

## ✅ SEÇÃO 6: CHECKLIST DE VALIDAÇÃO

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
- [ ] Popup fecha com Escape

### Build

- [ ] `npx tsc --noEmit` passa sem erros
- [ ] `npm run check` passa sem erros
- [ ] `npm run build` compila com sucesso

---

## 📊 SEÇÃO 7: MÉTRICAS DE SUCESSO

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

## 🔗 SEÇÃO 8: DESIGN TOKENS DE REFERÊNCIA

### Cores Primárias
```css
--accent-primary: #246B31
--accent-textHighlight: #eecfa1
```

### Backgrounds
```css
--bg-surface: #27272a
--bg-hover: #2c2c2e
--popup-bg: #1f1f22
```

### Shadows
```css
shadow-[0_0_10px_rgba(36,107,49,0.4)]  /* Badge glow */
shadow-[0_0_8px_rgba(36,107,49,0.8)]   /* Sources hover glow */
shadow-2xl                              /* Container 3D */
shadow-sm                               /* User message */
shadow-xl                               /* Popups */
```

### Spring Configs Padronizados
```tsx
const springConfigs = {
  popup: { type: "spring", stiffness: 400, damping: 30 },
  sidebar: { type: "spring", stiffness: 400, damping: 40 },
  message: { type: "spring", stiffness: 300, damping: 30 },
};
```

### Reasoning Colors
```css
text-text-secondary  /* Off */
text-green-400       /* Soft */
text-yellow-400      /* Medium */
text-[#15803d]       /* Max */
```

---

## 📝 SEÇÃO 9: NOTAS FINAIS

### Decisões Chave Tomadas

1. **Tempo:** 10-14h (média ponderada dos agentes 1 e 4)
2. **Componentes:** Criar apenas ZaneBadge, demais inline
3. **Spring Config:** 400/30 para popups, 400/40 para sidebar
4. **Cor Off Reasoning:** `text-text-secondary` (não vermelho)
5. **Título Chat:** "Olá! Como posso ajudar?" (mais simples)

### Riscos Mitigados

| Risco | Mitigação |
|-------|-----------|
| Breaking changes | Manter assinaturas de props existentes |
| Over-engineering | Criar apenas 1 componente novo (ZaneBadge) |
| Inconsistência animações | Spring config padronizado |
| Regressões visuais | Checklist completo de validação |

---

**Gerado por:** AGENTE 6 - Síntese com Resolução de Discrepâncias  
**Baseado em:** Análises dos Agentes 1, 2, 3 e 4  
**Status:** ✅ Pronto para implementação  
**Data:** 30 de novembro de 2025
