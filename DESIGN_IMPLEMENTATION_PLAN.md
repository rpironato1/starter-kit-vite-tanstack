# Plano: Implementação 100% Design Zane AI

> **Data:** 29 de Novembro de 2025
> **Repositórios Fonte:** `rpironato1/zane-ai` e `rpironato1/zane-ai-ux-interface`
> **Projeto Destino:** `zane-chat-ai`

## Objetivo

Implementar todo o design system dos repos `zane-ai` e `zane-ai-ux-interface` incluindo TODAS as discrepâncias (Framer Motion, Light Mode, Canvas, Token Usage, Memory Timeline) no projeto `zane-chat-ai`, respeitando modularização <300 linhas, CSS tokens, SOLID e responsividade.

---

## Decisões do Usuário

| Pergunta | Decisão |
|----------|---------|
| Toggle de tema inicial | **Dark Mode padrão** |
| Ícones | **Usar ícones do design original (lucide-react)** - 100% fidelidade obrigatória |
| Canvas modelo AI | **Implementar apenas UI/UX** - sem lógica do modelo |
| Persistência de tema | **TanStack Store** |
| Animações mobile | **Manter Framer Motion** - avaliar depois |
| Ordem de execução | **Sequencial** - Parte 1 → 6 |

---

## PARTE 1: Fundação (Design Tokens + Dependências)

**1.** Instalar dependências: `framer-motion@11.1.7` via npm para animações spring e `AnimatePresence`

**2.** Adicionar fontes Inter e Playfair Display ao HTML via Google Fonts CDN em `src/routes/__root.tsx`

**3.** Refatorar `src/styles.css` adicionando CSS variables Zane:
- Background: `--bg-main: #18181b`, `--bg-sidebar: #121212`, `--bg-surface: #27272a`, `--bg-modal: #1c1c1e`, `--bg-hover: #2c2c2e`
- Text: `--text-primary: #e4e4e7`, `--text-secondary: #a1a1aa`
- Accent: `--accent-primary: #246B31`, `--accent-textHighlight: #eecfa1`
- Tipografia: `--font-sans: Inter`, `--font-serif: Playfair Display`

**4.** Adicionar tokens Light Mode em `:root` e Dark Mode em `.dark` para sistema dual-theme

**5.** Criar keyframes customizados: `@keyframes slideUp`, `@keyframes fadeIn` com valores mapeados

**6.** Atualizar `@theme inline` no styles.css mapeando novos tokens para classes Tailwind

---

## PARTE 2: Componentes UI Base

**7.** Criar `src/components/ui/backdrop.tsx` - overlay blur com `bg-black/60 backdrop-blur-[2px]`

**8.** Criar `src/components/ui/dropdown.tsx` - dropdown com Framer Motion `spring { stiffness: 350, damping: 25, mass: 0.8 }`

**9.** Criar `src/components/ui/modal.tsx` - modal full-screen com `animate-slide-up`

**10.** Atualizar `src/components/ui/button.tsx` adicionando variantes: Primary (`bg-accent-primary`), Icon-only, FAB (`rounded-full shadow-lg`)

**11.** Atualizar `src/components/ui/switch.tsx` com animação Framer Motion `spring { stiffness: 700, damping: 30 }`

**12.** Criar `src/components/ui/icon-button.tsx` - botão circular com hover states e `active:scale-95`

---

## PARTE 3: Layouts Estruturais

**13.** Refatorar `src/components/Header.tsx` → mover para `src/components/layout/Header.tsx` com backdrop-blur, model selector trigger, avatar button

**14.** Criar `src/components/layout/Sidebar.tsx` com Framer Motion variants:
- `sidebarVariants`: closed `x: -100%`, open `x: 0%` com `staggerChildren: 0.05`
- `itemVariants`: `opacity: 0, x: -20` → `opacity: 1, x: 0`
- Menu items: Chat, Photo, Doc, Canvas
- History section + User profile button

**15.** Criar `src/components/layout/InputBar.tsx` - pill shape `rounded-[32px]` com:
- Plus button (rotate-45 ao abrir)
- Divider `w-px h-5 bg-border`
- Brain button (reasoning)
- Input text
- Send button (enabled/disabled states)

**16.** Criar `src/components/layout/Footer.tsx` - gradient fade `bg-gradient-to-t from-background-main via-background-main/95 to-transparent`

**17.** Criar hook `src/hooks/useTheme.ts` - gerenciar dark/light mode com TanStack Store

**18.** Criar hook `src/hooks/useSidebar.ts` - estado aberto/fechado do sidebar com TanStack Store

---

## PARTE 4: Features de Chat

**19.** Criar `src/components/chat/UserMessage.tsx` - bubble direita `bg-[#27272a] rounded-[20px] rounded-tr-[4px]`

**20.** Criar `src/components/chat/AIMessage.tsx` - com label "Zane AI", gradient badge, actions (copy, like, dislike)

**21.** Criar `src/components/chat/LoadingIndicator.tsx` - `Loader2 animate-spin` + "Pensando..."

**22.** Criar `src/components/chat/EmptyState.tsx` - com variantes por view (Chat, Photo, Doc, Canvas), ícone pulse, título serif

**23.** Criar `src/components/selectors/ModelSelector.tsx` - dropdown com modelos, check animado, Framer Motion

**24.** Criar `src/components/selectors/ReasoningSelector.tsx` - níveis Soft/Médio/Max/Desativado com cores específicas

**25.** Criar `src/components/selectors/AttachMenu.tsx` - menu popup com opções Camera, Photos, Files

---

## PARTE 5: Features Avançadas (Discrepâncias)

**26.** Criar `src/components/settings/SettingsModal.tsx` - container full-screen com navegação interna entre views

**27.** Criar views do Settings: `MainView.tsx`, `ProfileView.tsx`, `PlanView.tsx`, `PrivacyView.tsx`, `SystemView.tsx` (cada uma <150 linhas)

**28.** Criar `src/components/settings/MemoryMenuView.tsx` - cards para Facts e Timeline

**29.** Criar `src/components/settings/MemoryFactsView.tsx` - lista de fatos com dots indicators e delete buttons

**30.** Criar `src/components/settings/MemoryTimelineView.tsx` - timeline vertical com linha conectora e event cards

**31.** Criar `src/components/modals/TokenUsageModal.tsx` - Framer Motion, cards de métricas (Input, Cache, Think, Output, Total), tabela de steps

**32.** Criar `src/components/canvas/CanvasWorkspace.tsx` - split view, header com tabs (Code/Preview), action buttons

**33.** Criar `src/components/canvas/CodeEditor.tsx` - textarea mono, `bg-[#1e1e1e] font-mono`

**34.** Criar `src/components/canvas/Preview.tsx` - iframe sandbox com refresh key

**35.** Criar `src/components/canvas/ArtifactCard.tsx` - card clicável "Ver Código Gerado" com hover purple

---

## PARTE 6: Integração e Views

**36.** Refatorar `src/routes/index.tsx` - implementar layout completo Chat com Header, Sidebar, Messages, InputBar

**37.** Criar `src/routes/photo.tsx` - view Photo com empty state específico (Wand2 icon, green accent)

**38.** Criar `src/routes/doc.tsx` - view Doc com empty state específico (BookOpen icon, blue accent)

**39.** Criar `src/routes/canvas.tsx` - view Canvas com workspace integrado, toggle code/preview

**40.** Atualizar `src/routes/__root.tsx` - adicionar fonts, providers, ThemeProvider

---

## Design Tokens Mapeados

### Cores (Dark Mode - Padrão)
| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-main` | `#18181b` | Fundo principal |
| `--bg-sidebar` | `#121212` | Sidebar |
| `--bg-surface` | `#27272a` | Cards, inputs |
| `--bg-modal` | `#1c1c1e` | Modais |
| `--bg-hover` | `#2c2c2e` | Estados hover |
| `--text-primary` | `#e4e4e7` | Textos principais |
| `--text-secondary` | `#a1a1aa` | Textos secundários |
| `--accent-primary` | `#246B31` | Botões, brand |
| `--accent-textHighlight` | `#eecfa1` | Destaques |
| `--border-default` | `#3f3f46` | Bordas |

### Cores (Light Mode)
| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-main` | `#f4f4f5` | Fundo principal |
| `--bg-sidebar` | `#ffffff` | Sidebar |
| `--bg-surface` | `#ffffff` | Cards, inputs |
| `--bg-modal` | `#ffffff` | Modais |
| `--bg-hover` | `#e4e4e7` | Estados hover |
| `--text-primary` | `#18181b` | Textos principais |
| `--text-secondary` | `#71717a` | Textos secundários |

### Tipografia
| Token | Valor |
|-------|-------|
| `--font-sans` | `'Inter', sans-serif` |
| `--font-serif` | `'Playfair Display', serif` |

### Framer Motion Springs
| Uso | Configuração |
|-----|--------------|
| Menus/Popups | `{ type: "spring", stiffness: 400, damping: 30 }` |
| Dropdowns | `{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }` |
| Sidebar | `{ type: "spring", stiffness: 400, damping: 40 }` + staggerChildren |
| Toggle | `{ type: "spring", stiffness: 700, damping: 30 }` |
| Messages | `{ type: "spring", stiffness: 300, damping: 30 }` |

### Keyframes CSS
```css
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## Estrutura de Arquivos

```
src/
├── styles.css                    # Design tokens + keyframes + fonts
├── components/
│   ├── ui/                       # Componentes atômicos (shadcn pattern)
│   │   ├── button.tsx           # Atualizado
│   │   ├── input.tsx            # Atualizado
│   │   ├── switch.tsx           # Atualizado
│   │   ├── dropdown.tsx         # NOVO
│   │   ├── modal.tsx            # NOVO
│   │   ├── backdrop.tsx         # NOVO
│   │   └── icon-button.tsx      # NOVO
│   ├── layout/                   # Layouts estruturais
│   │   ├── Header.tsx           # Refatorado
│   │   ├── Sidebar.tsx          # NOVO
│   │   ├── InputBar.tsx         # NOVO
│   │   └── Footer.tsx           # NOVO
│   ├── chat/                     # Componentes de chat
│   │   ├── UserMessage.tsx      # NOVO
│   │   ├── AIMessage.tsx        # NOVO
│   │   ├── LoadingIndicator.tsx # NOVO
│   │   └── EmptyState.tsx       # NOVO
│   ├── selectors/                # Seletores e menus
│   │   ├── ModelSelector.tsx    # NOVO
│   │   ├── ReasoningSelector.tsx# NOVO
│   │   └── AttachMenu.tsx       # NOVO
│   ├── settings/                 # Settings modal e views
│   │   ├── SettingsModal.tsx    # NOVO
│   │   ├── MainView.tsx         # NOVO
│   │   ├── ProfileView.tsx      # NOVO
│   │   ├── PlanView.tsx         # NOVO
│   │   ├── PrivacyView.tsx      # NOVO
│   │   ├── SystemView.tsx       # NOVO
│   │   ├── MemoryMenuView.tsx   # NOVO
│   │   ├── MemoryFactsView.tsx  # NOVO
│   │   ├── MemoryTimelineView.tsx # NOVO
│   │   └── SettingsItem.tsx     # NOVO
│   ├── canvas/                   # Canvas workspace (UI only)
│   │   ├── CanvasWorkspace.tsx  # NOVO
│   │   ├── CodeEditor.tsx       # NOVO
│   │   ├── Preview.tsx          # NOVO
│   │   └── ArtifactCard.tsx     # NOVO
│   └── modals/                   # Modais específicos
│       ├── TokenUsageModal.tsx  # NOVO
│       └── AlertDialog.tsx      # NOVO
├── hooks/                        # Hooks customizados (TanStack Store)
│   ├── useTheme.ts              # NOVO
│   └── useSidebar.ts            # NOVO
└── routes/                       # Views principais
    ├── index.tsx                # Refatorado → Chat view
    ├── photo.tsx                # NOVO
    ├── doc.tsx                  # NOVO
    ├── canvas.tsx               # NOVO
    └── __root.tsx               # Atualizado
```

---

## Ícones Lucide Utilizados

### Header/Navigation
`Menu`, `ChevronDown`, `ChevronLeft`, `ChevronRight`, `X`

### Sidebar
`MessageSquare`, `ImageIcon`, `FileText`, `LayoutGrid`, `Plus`

### Input Area
`Plus`, `Brain`, `Mic`, `Send`

### Attachments
`Camera`, `ImageIcon`, `FileText`, `FolderOpen`, `Link2`

### Messages
`Copy`, `Check`, `ThumbsUp`, `ThumbsDown`, `RotateCcw`, `Activity`, `ExternalLink`

### Settings
`User`, `CreditCard`, `SlidersHorizontal`, `Moon`, `Sun`, `Globe`, `Bell`, `Lock`, `LogOut`, `Sparkles`, `HardDrive`, `Terminal`, `Trash2`, `Download`, `Database`, `Clock`, `History`

### Loading
`Loader2`

### Empty States
`Wand2` (Photo), `BookOpen` (Doc), `LayoutGrid` (Canvas)

---

## Checklist de Regras

| Regra | Status |
|-------|--------|
| Graph of Thoughts | ✅ |
| Fluxograma | ✅ |
| Padrões do projeto | ✅ |
| MCP Context7 | ✅ |
| SOLID | ✅ |
| Proibido `any` | ✅ |
| CSS Design Tokens | ✅ |
| Responsividade | ✅ |
| Não simplificar | ✅ |
| Modularização <300 linhas | ✅ |
| Zero erros build/lint | ✅ |
| Testes Playwright MCP | ✅ |

---

## Metodologia de Execução

1. **Delegação por Agentes:** Cada parte será executada por agentes especializados
2. **Loops de Verificação:** Execução → Verificação contra repos fonte → Correção → Reexecução
3. **Validação Contínua:** `npm run lint`, `npm run build`, `tsc --noEmit` após cada parte
4. **Testes Visuais:** Screenshots comparativos via Playwright MCP
5. **Paridade 100%:** Comparação pixel-perfect com protótipos originais
