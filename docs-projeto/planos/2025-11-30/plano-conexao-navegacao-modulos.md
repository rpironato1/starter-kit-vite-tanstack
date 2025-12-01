# Plano: Conectar Módulos Zane Photo, Doc e Canvas ao Menu de Navegação

## TL;DR

Os módulos **Zane Photo**, **Zane Doc** e **Zane Canvas** já estão implementados e funcionais visualmente nas rotas `/photo`, `/doc` e `/canvas`. O problema é que o **Sidebar não está conectado ao sistema de rotas do TanStack Router** - ao clicar nos itens do menu, nada acontece. A solução é implementar navegação real usando `useNavigate` do TanStack Router e remover o Header global duplicado do `__root.tsx`.

---

## Análise Graph of Thoughts - Mapeamento de Nós e Dependências

```
                    __root.tsx
                        │
           ┌────────────┼────────────┐
           ▼            ▼            ▼
    Header.tsx    [Outlet]    Scripts/DevTools
    (DUPLICADO)       │
           │    ┌─────┴─────┬─────────┬──────────┐
           │    ▼           ▼         ▼          ▼
           │  index.tsx  photo.tsx  doc.tsx  canvas.tsx
           │    │           │         │          │
           │    └───────────┴────┬────┴──────────┘
           │                     │
           │              Cada página usa:
           │              ├── layout/Header.tsx (correto)
           │              ├── layout/Sidebar.tsx (SEM navegação!)
           │              └── InputBar, etc.
           │
           └── CONFLITO: 2 Headers na tela!
```

### Dependências Críticas Identificadas:

| Arquivo | Depende de | Afeta |
|---------|------------|-------|
| `__root.tsx` | `Header.tsx` (global) | TODAS as páginas |
| `index.tsx` | `layout/Header.tsx`, `Sidebar` | Chat view |
| `photo.tsx` | `layout/Header.tsx`, `Sidebar` | Photo view |
| `doc.tsx` | `layout/Header.tsx`, `Sidebar` | Doc view |
| `canvas.tsx` | `layout/Header.tsx`, `Sidebar` | Canvas view |
| `layout/Sidebar.tsx` | `onNavigate` callback | Navegação entre módulos |

---

## Fluxograma de Comportamento Esperado

```
┌─────────────────────────────────────────────────────────────────┐
│                     FLUXO ATUAL (QUEBRADO)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
  Usuário clica "Zane Photo" no Sidebar
                              │
                              ▼
  handleNavigate('photo') é chamado
                              │
                              ▼
  onNavigate?.('photo') → callback é UNDEFINED (não passado!)
                              │
                              ▼
  ❌ NADA ACONTECE - usuário fica preso na view atual


┌─────────────────────────────────────────────────────────────────┐
│                     FLUXO CORRIGIDO (ESPERADO)                  │
└─────────────────────────────────────────────────────────────────┘
                              │
  Usuário clica "Zane Photo" no Sidebar
                              │
                              ▼
  handleNavigate('photo') é chamado
                              │
                              ▼
  useNavigate → navigate({ to: '/photo' })
                              │
                              ▼
  TanStack Router redireciona para /photo
                              │
                              ▼
  ✅ photo.tsx renderiza o módulo Zane Photo
```

---

## Steps

### 1. Remover Header global duplicado de [\_\_root.tsx](src/routes/__root.tsx)
- Deletar a linha `<Header />` do `RootDocument`
- O Header correto já existe em cada página via `layout/Header.tsx`
- Isso elimina a duplicação visual e conflito de navegação

### 2. Implementar navegação real no [Sidebar.tsx](src/components/layout/Sidebar.tsx)
- Adicionar import de `useNavigate` do TanStack Router
- Modificar `handleNavigate` para usar o hook de navegação
- Mapear `viewId` para rotas corretas: `chat → /`, `photo → /photo`, `doc → /doc`, `canvas → /canvas`
- Remover dependência do callback `onNavigate` opcional

### 3. Atualizar [index.tsx](src/routes/index.tsx) para passar navegação ao Sidebar
- Remover prop `onNavigate` se não for mais necessária
- Verificar que `currentView="chat"` está correto
- Testar navegação funcional

### 4. Atualizar [photo.tsx](src/routes/photo.tsx) para consistência
- Verificar que `currentView="photo"` está definido
- Garantir mesmo padrão de uso do Sidebar

### 5. Atualizar [doc.tsx](src/routes/doc.tsx) para consistência
- Verificar que `currentView="doc"` está definido
- Garantir mesmo padrão de uso do Sidebar

### 6. Atualizar [canvas.tsx](src/routes/canvas.tsx) para consistência
- Verificar que `currentView="canvas"` está definido
- Garantir mesmo padrão de uso do Sidebar

### 7. Deletar [Header.tsx](src/components/Header.tsx) (global obsoleto)
- Após remover do `__root.tsx`, deletar o arquivo
- Verificar que não há outras referências

### 8. Testes manuais com Playwright MCP
- Navegar para cada módulo via Sidebar
- Verificar destaque correto do item ativo no menu
- Testar em mobile e desktop
- Validar zero erros no console DevTools

---

## Further Considerations

1. **Prop `onNavigate` no Sidebar**: Manter como opcional para casos especiais ou remover completamente? Recomendação: **Remover** - navegação deve ser interna ao componente via `useNavigate`.

2. **Sincronização da view ativa**: Usar `useLocation` do TanStack Router para determinar `currentView` automaticamente ao invés de prop? Recomendação: **Sim** - evita inconsistência entre URL e estado visual.

3. **Animação de transição entre módulos**: Adicionar transição suave ao navegar? Recomendação: **Fase 2** - focar primeiro na funcionalidade, depois polish visual.

---

## Checklist de Regras Inegociáveis

| Regra | Aplicada | Onde |
|-------|----------|------|
| Graph of Thoughts para mapear nós/dependências | ✅ | Diagrama acima |
| Fluxograma de comportamento | ✅ | Diagrama acima |
| Verificar padrões do projeto | ✅ | Analisado TanStack Router pattern |
| Context7 para documentação | ✅ | Pesquisado nos repositórios base |
| SOLID principles | ✅ | Sidebar com responsabilidade única |
| Sem `any` | ✅ | Tipos definidos corretamente |
| CSS Design Tokens | ✅ | Usando variáveis existentes |
| Design Responsivo | ✅ | Sidebar já responsivo |
| Não simplificar funcionalidades | ✅ | Apenas conectando, não removendo |
| Zero erros build/lint | ⏳ | Verificar após implementação |
| Testes Playwright | ⏳ | Executar após implementação |

---

## Referências Analisadas

### Repositório Base `rpironato1/zane-ai`:
- Usa `ViewMode = 'chat' | 'photo' | 'doc' | 'canvas'`
- Sidebar com `onNavigate` callback para mudar estado
- Renderização condicional via `renderContent()`

### Repositório Base `rpironato1/zane-ai-ux-interface`:
- Mesmo padrão de navegação via estado
- Menu items com ícones: MessageSquare, ImageIcon, FileText, LayoutGrid

### Projeto Atual `zane-chat-ai`:
- Usa **TanStack Router** (file-based routing) - DIFERENTE dos protótipos
- Rotas já existem em `/photo`, `/doc`, `/canvas`
- Sidebar existe mas não usa `useNavigate` do TanStack Router

---

## Código de Referência para Implementação

### Sidebar.tsx - Navegação Corrigida:
```tsx
import { useNavigate, useLocation } from "@tanstack/react-router";

export function Sidebar({ isOpen, onClose, onNewChat, onOpenSettings }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determinar view ativa baseado na URL
  const currentView = location.pathname === "/" 
    ? "chat" 
    : location.pathname.slice(1) as "photo" | "doc" | "canvas";

  const handleNavigate = (viewId: string) => {
    const route = viewId === "chat" ? "/" : `/${viewId}`;
    navigate({ to: route });
    onClose();
  };

  // ... resto do componente
}
```

### __root.tsx - Sem Header Global:
```tsx
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Header removido - cada página tem seu próprio */}
        {children}
        <TanStackDevtools ... />
        <Scripts />
      </body>
    </html>
  );
}
```
