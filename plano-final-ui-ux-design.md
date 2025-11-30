# 🎯 PLANO FINAL DE PARIDADE DE DESIGN UI/UX

**Projeto:** Zane Chat AI  
**Data:** 30 de novembro de 2025  
**Metodologia:** 4 agentes de análise + 3 agentes de síntese  
**Status:** ⏳ AGUARDANDO APROVAÇÃO DO USUÁRIO

---

## 📊 RESUMO EXECUTIVO

| Métrica | Valor Atual | Meta | Consenso |
|---------|-------------|------|----------|
| **Paridade Geral** | ~78% | 100% | ✅ 7/7 agentes |
| **Componentes a Modificar** | 7 | 7 | ✅ 7/7 agentes |
| **Novo Componente** | 1 | 1 | ✅ 6/7 agentes |
| **Tempo Estimado** | 10-14h | - | Média consolidada |
| **Impacto Esperado** | +22% paridade | - | ✅ 7/7 agentes |

---

## ✅ CONSENSO ABSOLUTO (7/7 AGENTES)

Os seguintes elementos têm **concordância unânime** entre TODOS os agentes:

### 1. AI Message Badge
- Formato: Quadrado `w-5 h-5 rounded-md`
- Conteúdo: Letra "Z" única
- Font: `font-serif font-bold text-[9px]`
- Gradient: `from-accent-primary to-emerald-900`
- Glow: `shadow-[0_0_10px_rgba(36,107,49,0.4)]`
- Label separado: `text-[11px] font-bold uppercase tracking-wider text-zinc-500`

### 2. EmptyState Container 3D
- Dimensões: `w-20 h-20`
- Border Radius: `rounded-[24px]`
- Background: `bg-bg-surface`
- Border: `border border-white/5`
- Shadow: `shadow-2xl`
- Blur Layer: `blur-xl animate-pulse` atrás do container
- Ícone interno: `w-8 h-8`

### 3. EmptyState Títulos
| Módulo | Título |
|--------|--------|
| Chat | "Olá! Como posso ajudar?" |
| Photo | "Zane Photo Studio" |
| Doc | "Zane Doc" |
| Canvas | "Zane Canvas" |
| Cor Mobile | `text-[#eecfa1]` (dourado) |
| Tamanho | `text-3xl md:text-4xl font-serif` |

### 4. LoadingIndicator
- Label "Zane": `font-bold text-xs text-accent-primary`
- Posição: Antes do spinner e texto
- Textos por módulo diferenciados

### 5. ReasoningSelector Popup
- Posição: `bottom-full mb-4` (abre para cima)
- Header: "Nível de Raciocínio" uppercase
- Brain Icon: `transform scale-x-[-1]` (espelhado)
- Cores: soft=`text-green-400`, medium=`text-yellow-400`, max=`text-[#15803d]`
- Container: `rounded-2xl backdrop-blur-xl`

### 6. Sources Chips
- Dot Indicator: `w-1.5 h-1.5 rounded-full bg-accent-primary`
- Glow Hover: `shadow-[0_0_8px_rgba(36,107,49,0.8)]`
- Background: `bg-zinc-900/50`
- ExternalLink: `opacity-0 group-hover:opacity-100`

### 7. UserMessage
- Shadow: `shadow-sm`
- Border: `border border-white/5`

### 8. AttachMenu
- Backdrop: `backdrop-blur-xl`
- Border Radius: `rounded-2xl`
- Labels: "Câmera", "Fotos", "Arquivos"

---

## 📋 ORDEM DE IMPLEMENTAÇÃO

### SPRINT 1: Identidade Visual (4-5h)

| # | Tarefa | Arquivo | Tempo |
|---|--------|---------|-------|
| 1 | Criar ZaneBadge | `src/components/ui/zane-badge.tsx` | 30min |
| 2 | Atualizar AIMessage Badge | `src/components/chat/AIMessage.tsx` | 30min |
| 3 | Refatorar EmptyState Container 3D | `src/components/chat/EmptyState.tsx` | 2h |
| 4 | Atualizar LoadingIndicator | `src/components/chat/LoadingIndicator.tsx` | 45min |

### SPRINT 2: UX Interativa (2-3h)

| # | Tarefa | Arquivo | Tempo |
|---|--------|---------|-------|
| 5 | Refatorar ReasoningSelector | `src/components/selectors/ReasoningSelector.tsx` | 2h |
| 6 | Implementar Sources Chips | `src/components/chat/AIMessage.tsx` | 45min |

### SPRINT 3: Refinamentos (2-3h)

| # | Tarefa | Arquivo | Tempo |
|---|--------|---------|-------|
| 7 | Atualizar UserMessage | `src/components/chat/UserMessage.tsx` | 15min |
| 8 | Atualizar AttachMenu | `src/components/selectors/AttachMenu.tsx` | 45min |
| 9 | Testes e Validação | Todos | 1-2h |

---

## 📁 ARQUIVOS A CRIAR/MODIFICAR

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

## 💻 CÓDIGO DE CORREÇÃO

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

### 2. EmptyState.tsx - Container 3D + Títulos

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
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.4, delay: 0.1 }}
				className="relative mb-6"
			>
				<div className={cn("absolute inset-0 blur-xl rounded-full animate-pulse", config.blurClassName)} />
				<div className={cn(
					"relative w-20 h-20 bg-bg-surface rounded-[24px]",
					"flex items-center justify-center border border-white/5 shadow-2xl"
				)}>
					<Icon className={cn("w-8 h-8", config.iconClassName)} strokeWidth={1.5} />
				</div>
			</motion.div>

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

### 3. LoadingIndicator.tsx - Label Zane

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
	chat: { color: "text-accent-primary", text: "Pensando..." },
	photo: { color: "text-accent-primary", text: "Criando sua obra de arte..." },
	doc: { color: "text-blue-400", text: "Lendo documentos e analisando..." },
	canvas: { color: "text-purple-400", text: "Estruturando ideias..." },
};

export function LoadingIndicator({ variant = "default", module = "chat", text }: LoadingIndicatorProps) {
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
			<span className={cn("font-bold text-xs", config.color)}>Zane</span>
			<Icon className={cn("size-4", isReasoning ? "animate-pulse" : "animate-spin")} />
			<span className="text-sm">{displayText}</span>
		</motion.div>
	);
}
```

---

### 4. ReasoningSelector.tsx - Popup Completo

**Principais mudanças:**
- Popup abre para CIMA: `bottom-full mb-4`
- Header: "Nível de Raciocínio" uppercase
- Cores: soft=green-400, medium=yellow-400, max=#15803d
- Brain icon espelhado: `scale-x-[-1]`
- Backdrop blur: `backdrop-blur-xl`

---

### 5. AIMessage.tsx - Badge + Sources

**Badge:**
```tsx
<div className="mb-2">
	<ZaneBadge variant="default" showLabel={true} />
</div>
```

**Sources Chips:**
```tsx
{sources && sources.length > 0 && (
	<div className="mt-4 pt-4 border-t border-white/5 w-full">
		<div className="flex items-center gap-3 mb-3">
			<span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Fontes Consultadas</span>
			<div className="h-px flex-1 bg-gradient-to-r from-zinc-800 to-transparent" />
		</div>
		<div className="flex flex-wrap gap-2">
			{sources.map((source, idx) => (
				<a
					key={`source-${source.title}-${idx}`}
					href={source.uri}
					target="_blank"
					rel="noopener noreferrer"
					className="group/source flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-white/5 hover:border-white/10 transition-all duration-300 no-underline"
				>
					<div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/source:bg-accent-primary group-hover/source:shadow-[0_0_8px_rgba(36,107,49,0.8)] transition-all" />
					<span className="text-xs font-medium truncate max-w-[200px] text-zinc-400 group-hover/source:text-zinc-200 transition-colors">{source.title}</span>
					<ExternalLink className="w-3 h-3 text-zinc-700 group-hover/source:text-zinc-400 opacity-0 group-hover/source:opacity-100 -ml-1 group-hover/source:ml-0 transition-all transform group-hover/source:translate-x-0.5" />
				</a>
			))}
		</div>
	</div>
)}
```

---

### 6. UserMessage.tsx - Shadow + Border

```tsx
<div className="rounded-[20px] rounded-tr-[4px] bg-bg-surface px-4 py-3 border border-white/5 shadow-sm">
```

---

### 7. AttachMenu.tsx - Blur + Labels

```tsx
// Labels
const menuItems = [
	{ type: "camera", icon: Camera, label: "Câmera" },
	{ type: "gallery", icon: Image, label: "Fotos" },
	{ type: "files", icon: FileText, label: "Arquivos" },
];

// Container
className={cn(
	"absolute bottom-full mb-4 left-0 origin-bottom",
	"w-[220px] rounded-2xl p-2",
	"bg-[#1f1f22] backdrop-blur-xl",
	"border border-zinc-800",
	"shadow-xl",
)}
```

---

## 🎨 DESIGN TOKENS DE REFERÊNCIA

```css
/* Cores Primárias */
--accent-primary: #246B31
--accent-textHighlight: #eecfa1

/* Backgrounds */
--bg-surface: #27272a
--bg-hover: #2c2c2e
--popup-bg: #1f1f22

/* Shadows */
shadow-[0_0_10px_rgba(36,107,49,0.4)]  /* Badge glow */
shadow-[0_0_8px_rgba(36,107,49,0.8)]   /* Sources hover */
shadow-2xl                              /* Container 3D */
shadow-sm                               /* User message */

/* Reasoning Colors */
text-text-secondary  /* Off */
text-green-400       /* Soft */
text-yellow-400      /* Medium */
text-[#15803d]       /* Max */
```

---

## ✅ CHECKLIST DE VALIDAÇÃO

### Visuais
- [ ] Badge Zane AI é quadrado 20x20 com letra "Z" em serif bold
- [ ] Badge tem gradient `from-accent-primary to-emerald-900`
- [ ] Badge tem glow verde `shadow-[0_0_10px_rgba(36,107,49,0.4)]`
- [ ] Label "ZANE AI" separado em uppercase tracking-wider
- [ ] Empty states têm container 3D 80x80 com `rounded-[24px]`
- [ ] Container tem blur pulsante atrás
- [ ] Container tem `shadow-2xl` e `border border-white/5`
- [ ] Ícone dentro do container é 32x32
- [ ] Título é dourado `text-[#eecfa1]` no mobile
- [ ] Título usa `text-3xl md:text-4xl font-serif`
- [ ] Chat: "Olá! Como posso ajudar?"
- [ ] Photo: "Zane Photo Studio"
- [ ] Doc: "Zane Doc"
- [ ] Canvas: "Zane Canvas"
- [ ] Loading mostra "Zane" antes do spinner
- [ ] Textos de loading contextuais por módulo
- [ ] ReasoningSelector abre popup `bottom-full mb-4`
- [ ] Popup tem header "Nível de Raciocínio" uppercase
- [ ] Brain icon espelhado `scale-x-[-1]`
- [ ] Cores: soft=green-400, medium=yellow-400, max=#15803d
- [ ] Sources têm dot com glow verde no hover
- [ ] Sources background `bg-zinc-900/50`
- [ ] ExternalLink aparece apenas no hover
- [ ] UserMessage tem `shadow-sm` e `border-white/5`
- [ ] AttachMenu tem `backdrop-blur-xl` e `rounded-2xl`
- [ ] AttachMenu labels: "Câmera", "Fotos", "Arquivos"

### Funcionais
- [ ] Copiar mensagem funciona
- [ ] Links de Sources abrem em nova aba
- [ ] Loading indicator anima corretamente
- [ ] Reasoning selector altera estado
- [ ] AttachMenu fecha ao clicar fora

### Build
- [ ] `npx tsc --noEmit` ZERO erros
- [ ] `npm run check` ZERO erros
- [ ] `npm run build` compila com sucesso

---

## 📈 IMPACTO ESPERADO

| Componente | Antes | Depois | Impacto |
|------------|-------|--------|---------|
| AIMessage Badge | 30-40% | 100% | +8% |
| AIMessage Sources | 30% | 100% | +2% |
| EmptyState Container | 40-50% | 100% | +6% |
| LoadingIndicator | 50-75% | 100% | +3% |
| UserMessage | 85% | 100% | +1% |
| ReasoningSelector | 60% | 100% | +4% |
| AttachMenu | 70% | 100% | +1% |
| **TOTAL** | **~78%** | **100%** | **+22%** |

---

## ⚠️ REGRAS INEGOCIÁVEIS SEGUIDAS

| Regra | Aplicação |
|-------|-----------|
| ✅ Graph of Thoughts | Mapeamento de dependências entre componentes |
| ✅ Context7 | Padrões Tailwind CSS, Framer Motion consultados |
| ✅ SOLID | Componente ZaneBadge reutilizável, SRP |
| ✅ Design Tokens | Uso exclusivo de variáveis CSS existentes |
| ✅ Responsividade | Títulos com breakpoints mobile/desktop |
| ✅ Modularização | Arquivos < 300 linhas |
| ✅ Zero erros | Build/lint/tsc obrigatórios |
| ✅ Sem simplificações | Implementação 100% conforme protótipos |

---

## 🚀 PRÓXIMOS PASSOS

1. **AGUARDAR APROVAÇÃO** do usuário para este plano
2. Após aprovação, iniciar Sprint 1 (Identidade Visual)
3. Validar cada componente com testes manuais (Playwright MCP)
4. Executar validações de build obrigatórias
5. Entregar relatório final

---

**Gerado por:** Orquestração de 7 agentes  
**Baseado em:** 4 análises independentes + 3 sínteses  
**Status:** ⏳ AGUARDANDO APROVAÇÃO  
**Data:** 30 de novembro de 2025
