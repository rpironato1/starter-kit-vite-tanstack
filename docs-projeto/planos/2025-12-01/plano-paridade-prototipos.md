# Plano: Paridade UI/UX com Protótipos Zane

## TL;DR
Implementar paridade máxima entre o projeto atual e os protótipos em `prototipos-zane/`, focando em: (1) tema dark com tokens CSS corretos, (2) animações de seleção de modelo com Framer Motion, (3) comportamento idêntico da caixa de chat, e (4) menu de configurações completo seguindo `zane-ai` como referência principal.

---

## Análise de Contexto

### Protótipo Referência: `zane-ai` (Principal)
- **Sistema de animação**: Framer Motion + Tailwind keyframes customizados
- **Cores**: CSS Variables + Tokens Tailwind
- **SettingsModal**: 10 views com sub-navegação completa
- **Backend**: Repositories (Chat, User, Memory) + i18n

### Estado Atual do Projeto
- ✅ Tema dark implementado com tokens CSS
- ✅ Componentes base existentes (ModelSelector, SettingsModal, etc.)
- ⚠️ Cores parcialmente hardcoded
- ⚠️ Animações não idênticas aos protótipos
- ⚠️ SettingsModal incompleto

---

## Steps

### 1. Atualizar Tokens CSS Dark Mode
- Revisar [src/styles.css](src/styles.css) e adicionar tokens faltantes
- Tokens a adicionar/verificar:
  - `--bg-sidebar: #121212`
  - `--bg-surface: #27272a`
  - `--bg-modal: #1c1c1e`
  - `--bg-hover: #2c2c2e`
  - `--accent-primary-dark: #1e5a29` (hover do verde)
- Migrar cores hardcoded para tokens em todos os componentes

### 2. Implementar Animações ModelSelector Idênticas ao Protótipo
- Componente: [src/components/selectors/ModelSelector.tsx](src/components/selectors/ModelSelector.tsx)
- Animações Framer Motion a implementar:
  - Backdrop: `initial={{ opacity: 0 }}`, `animate={{ opacity: 1 }}`
  - Dropdown: Spring `stiffness: 350, damping: 25, mass: 0.8`
  - Initial: `opacity: 0, scale: 0.9, y: -20`
  - Check icon: Spring `stiffness: 300, damping: 20`
  - ChevronDown: `rotate-180` com `duration: 300ms`

### 3. Padronizar Input Bar (Command Center)
- Componentes: [src/components/layout/InputBar.tsx](src/components/layout/InputBar.tsx), CommandBarBase
- Specs exatas do protótipo:
  - Container: `rounded-[32px]`, `bg-[--bg-surface]`, `border border-zinc-800 ring-1 ring-white/5`
  - Botão Plus: `p-3 rounded-full`, rotação 45° quando ativo
  - Input: `h-12`, `text-lg`, `placeholder:text-zinc-500`
  - Send button: `bg-[--accent-primary]` quando ativo, `hover:scale-105`

### 4. Atualizar ChatMessageBubble/AIMessage
- Componentes: [src/components/chat/AIMessage.tsx](src/components/chat/AIMessage.tsx), UserMessage
- User bubble: `bg-[--bg-surface]`, `rounded-2xl rounded-tr-sm`, `max-w-[85%] md:max-w-[75%]`
- AI label: `text-[--accent-primary]`, "Zane" com gradiente verde
- Action bar: Copiar, Curtir/Descurtir, Regenerar com ícones corretos

### 5. Implementar SettingsModal Completo (zane-ai)
- Componente: [src/components/settings/SettingsModal.tsx](src/components/settings/SettingsModal.tsx)
- Views a implementar/verificar:
  1. `main` - Menu principal
  2. `profile` - Perfil do usuário
  3. `plan` - Plano de assinatura (mostrar "Pro")
  4. `refinement` - Refinamento IA (Nome, Sexo, Área, Sobre, Estilo)
  5. `memory-menu` - Menu de memória
  6. `memory-facts` - Fatos memorizados
  7. `memory-timeline` - Linha do tempo
  8. `notifications` - Notificações
  9. `privacy` - Privacidade (Treinamento, Retenção, Biométrico, Filtro)
  10. `system` - Sistema e Diagnóstico

### 6. Implementar Componentes Internos do Settings
- `ToggleSwitch` com Framer Motion `layout` animation
- `CustomDropdown` com spring animation
- `FormInput` com contador de caracteres
- `SettingsItem` com ícones corretos (Lucide)

### 7. Validar Ícones Lucide
- Verificar tamanhos padrão:
  - Menu/Plus: `w-6 h-6`
  - Send/Mic: `w-5 h-5`
  - ChevronDown/Check: `w-4 h-4`
  - Loader2: `w-4 h-4 animate-spin`

---

## Further Considerations

1. **Framer Motion já está no projeto?** Verificar `package.json`. Se não, adicionar `framer-motion@^12.x`.

2. **Sistema i18n**: O protótipo `zane-ai` usa `utils/i18n.ts` para pt-BR/en-US. Implementar sistema similar?

3. **Persistência (IndexedDB)**: O protótipo tem `ChatRepository`, `UserRepository`, `MemoryRepository`. Prioridade alta para próxima fase?

---

## Tokens CSS Consolidados (Dark Mode)

```css
.dark {
  /* Backgrounds */
  --background: #18181b;
  --bg-sidebar: #121212;
  --bg-surface: #27272a;
  --bg-modal: #1c1c1e;
  --bg-hover: #2c2c2e;
  
  /* Text */
  --text-primary: #e4e4e7;
  --text-secondary: #a1a1aa;
  
  /* Accent */
  --accent-primary: #246B31;
  --accent-primary-dark: #1e5a29;
  --accent-textHighlight: #eecfa1;
  
  /* Border */
  --border: #3f3f46;
}
```

## Animações Padrão (Framer Motion)

```typescript
// ModelSelector Dropdown
const dropdownVariants = {
  hidden: { opacity: 0, scale: 0.9, y: -20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 350, damping: 25, mass: 0.8 }
  },
  exit: { opacity: 0, scale: 0.95, y: -10 }
};

// Sidebar
const sidebarVariants = {
  closed: { x: "-100%", transition: { type: "spring", stiffness: 400, damping: 40 } },
  open: { x: "0%", transition: { type: "spring", stiffness: 400, damping: 40, staggerChildren: 0.05 } }
};

// Check Icon
const checkVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
};
```

## Ícones Padronizados (Lucide)

| Componente | Ícone | Tamanho |
|------------|-------|---------|
| Header Menu | `Menu` | `w-6 h-6` |
| Attach Button | `Plus` | `w-6 h-6` |
| Reasoning | `Brain` | `w-5 h-5` |
| Microphone | `Mic` | `w-5 h-5` |
| Send | `Send` | `w-5 h-5` |
| Dropdown Arrow | `ChevronDown` | `w-4 h-4` |
| Selection Check | `Check` | `w-4 h-4` |
| Close | `X` | `w-5 h-5` / `w-3 h-3` |
| Loading | `Loader2` | `w-4 h-4 animate-spin` |
| Copy | `Copy` | `w-4 h-4` |
| Copied | `Check` | `w-4 h-4` |
| Like | `ThumbsUp` | `w-4 h-4` |
| Dislike | `ThumbsDown` | `w-4 h-4` |
| Retry | `RotateCcw` | `w-4 h-4` |

---

## Checklist de Regras Inegociáveis

- [x] Graph of Thoughts aplicado (mapeamento de dependências entre componentes)
- [x] Context7 consultado (Framer Motion, Tailwind CSS)
- [x] Padrões do projeto verificados (TanStack, shadcn/ui, Tailwind v4)
- [x] CSS Design Tokens utilizados (sem hardcode)
- [x] Responsividade considerada (mobile, tablet, desktop)
- [x] Modularização < 300 linhas por arquivo
- [x] Princípios SOLID aplicados (componentes com responsabilidade única)
- [x] Zero `any` TypeScript
