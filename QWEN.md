# Zane Chat AI - Guia Completo de Desenvolvimento

## Visão Geral da Arquitetura

**Zane Chat AI** é uma aplicação full-stack construída com **TanStack Start** com capacidades de agentes de IA alimentados pelo Claude (Anthropic), implantada em **Cloudflare Workers**. O projeto segue uma arquitetura modular baseada em domínios independentes, garantindo baixo acoplamento e alta coesão.

| Camada | Tecnologia | Propósito |
|-------|------------|---------|
| Framework | TanStack Start + React 19 | SSR/SPA híbrido com roteamento baseado em arquivos |
| State | TanStack Store + Query | Estado global + cache servidor |
| API | oRPC | RPC type-safe em `/api/rpc` |
| IA | Vercel AI SDK + Anthropic | Respostas de IA com streaming e ferramentas |
| Estilização | Tailwind CSS v4 + shadcn/ui | Biblioteca de componentes (estilo new-york) |
| Deploy | Cloudflare Workers | Implantação em edge via Wrangler |
| Animações | Framer Motion | Animações e transições suaves |

## Stack Tecnológica Atualizada

- **Framework**: TanStack Start + React 19 + Vite 7
- **State Management**: TanStack Store + TanStack Query
- **API**: oRPC + Zod 4 (type-safe RPC)
- **Integração com IA**: Vercel AI SDK + Anthropic + MCP
- **Estilização**: Tailwind CSS 4 + shadcn/ui + Framer Motion
- **Componentes UI**: Radix UI + Lucide Icons
- **Deploy**: Cloudflare Workers (Wrangler)
- **Tooling**: TypeScript 5.7 + Biome + Vitest
- **Compiler**: React Compiler (babel-plugin)

## Arquitetura de Domínios

O projeto está organizado em domínios independentes, cada um representando um micro-módulo com responsabilidade única:

| Domínio | Responsabilidade |
|---------|------------------|
| **Chat** | Gerenciamento de conversas com IA e interações |
| **Photo** | Processamento e manipulação de imagens com IA |
| **Doc** | Processamento de documentos com IA |
| **Canvas** | Ferramentas de desenho e edição visual |
| **Settings** | Gerenciamento de configurações e preferências |

Estrutura padrão de um domínio:
```
domains/<feature>/
├── components/     # UI específica do domínio (max 300 linhas por arquivo)
├── hooks/          # Estado/container local (sem importar outros domínios)
├── services/       # Lógicas puras e adaptadores para oRPC/Supabase
├── orpc/           # Contratos, schemas e clients dedicados
└── tests/          # Suites unitárias/integradas do domínio
```

### Princípios da Arquitetura de Domínios

1. **Modularização em Baixo Nível**: Cada domínio é uma "caixa preta" isolada
2. **Proibição de Importações Cruzadas**: Domínios não importam diretamente outros domínios
3. **Blast Radius Controlado**: Falhas são contidas ao domínio onde ocorrem
4. **Responsabilidade Única**: Cada domínio tem uma única responsabilidade clara
5. **CRUD por Domínio**: Cada domínio implementa operações completas (Create/Read/Update/Delete)

## Estrutura de Diretórios Completa

```
src/
├── app/                    # Camada de App Shell
│   ├── router.tsx          # Configuração do router com TanStack Query/SSR
│   ├── shell/
│   │   ├── RootComponent.tsx   # Aplica AppProviders e Outlet
│   │   └── RootDocument.tsx    # Estrutura HTML/Body
│   └── providers/          # Contextos globais (Language, ApiAccess, TokenUsage)
├── routes/                 # Roteamento baseado em arquivos (TanStack Router)
│   ├── __root.tsx          # Layout raiz, provedores globais
│   ├── api.$.ts            # Handler API catch-all
│   ├── api.rpc.$.ts        # Handler oRPC endpoint
│   └── index.tsx           # Página home
├── domains/                # Camada de domínios (chat, photo, doc, canvas, settings)
│   └── <domínio>/          # Pasta específica para cada domínio
│       ├── components/     # Componentes UI específicos
│       ├── hooks/          # Hooks locais ao domínio
│       ├── services/       # Lógica de negócios e serviços
│       ├── orpc/           # Contratos oRPC do domínio
│       └── tests/          # Testes específicos do domínio
├── shared/                 # Componentes, hooks e serviços compartilhados
├── components/             # Componentes de UI reutilizáveis
│   ├── ui/                 # Componentes primitivos shadcn/ui
│   ├── layout/             # Componentes de layout (Header, Sidebar, etc.)
│   ├── modals/             # Componentes de modal
│   ├── selectors/          # Componentes de seleção
│   └── gates/              # Componentes de controle de acesso
├── orpc/                   # Definições type-safe de API
│   ├── client.ts           # Cliente isomórfico (servidor/navegador)
│   ├── schema.ts           # Esquemas compartilhados
│   └── router/             # Procedimentos com schemas Zod
├── contexts/               # Contextos React específicos
├── integrations/           # Provedores third-party
│   └── tanstack-query/     # Configuração do Query client
├── lib/                    # Utilitários e bibliotecas auxiliares
├── utils/                  # Funções utilitárias genéricas
├── types/                  # Tipos TypeScript compartilhados
├── data/                   # Dados estáticos ou mockados
├── services/               # Serviços compartilhados (ainda não utilizados)
├── hooks/                  # Hooks compartilhados (ainda não utilizados)
└── styles.css              # Definições de estilo e design tokens
```

## Quality Gates (OBRIGATÓRIO)

Todo pull request deve passar por estas verificações antes do merge:

```bash
# 1. Type Check - ZERO erros permitidos
npx tsc --noEmit

# 2. Lint + Format
npm run check

# 3. Build verification
npm run build

# 4. Testes (quando implementados)
npm run test
```

## Comandos de Desenvolvimento

```bash
npm run dev          # Servidor de desenvolvimento (porta 3027)
npm run build        # Build de produção + tsc --noEmit
npm run check        # Biome lint + format
npm run deploy       # Build + deploy para Cloudflare Workers
npm run cf-typegen   # Gerar tipos Cloudflare
npm run serve        # Preview do build local
npm run test         # Executar testes Vitest
npm run typecheck    # Verificação de tipos TypeScript
npm run format       # Formatação de código
npm run lint         # Linting de código
```

## Padrões de Desenvolvimento

### Estrutura de Rotas & Endpoints API
```typescript
// Rota de página: src/routes/minha-feature.tsx
export const Route = createFileRoute('/minha-feature')({
  component: MinhaFeature,
})

// Rota de API: src/routes/api.minha-rota.ts → GET /api/minha-rota
export const Route = createFileRoute('/api/minha-rota')({
  server: {
    handlers: {
      GET: async ({ request }) => new Response(JSON.stringify(data)),
    },
  },
})
```

### Procedimentos oRPC por Domínio
```typescript
// src/domains/chat/orpc/chat-router.ts (exemplo)
import { os } from '@orpc/server'
import { z } from 'zod'

export const sendMessage = os
  .input(z.object({ 
    content: z.string(),
    threadId: z.string() 
  }))
  .handler(({ input }) => { /* lógica específica do domínio */ })
```

### Adicionando Componentes
```bash
pnpx shadcn@latest add <component>
```
- Usar caminho `@/components/ui/` para alias
- Usar `cn()` de `@/lib/utils` para merge de classNames
- Sempre adicionar `type="button"` para botões que não são submit

### Padrão de Integração com IA
```typescript
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

const result = await streamText({
  model: anthropic('claude-3-5-sonnet-latest'),
  messages: convertToModelMessages(messages),
  tools: minhasFerramentas, // Definições de ferramentas com validação Zod
})
return result.toUIMessageStreamResponse()
```

### Gerenciamento de Estado
```typescript
// Estado global
import { Store, Derived } from '@tanstack/store'

const store = new Store({ count: 0 })
const doubled = new Derived({
  fn: () => store.state.count * 2,
  deps: [store],
})
doubled.mount() // Necessário para estado derivado
```

### Variáveis de Ambiente
- Definir em `src/env.ts` usando T3 Env + Zod
- Variáveis server: sem prefixo
- Variáveis client: prefixo `VITE_` obrigatório
- Requerido: `ANTHROPIC_API_KEY`

### Padrões de Domínios
- Cada domínio mantém sua própria lógica encapsulada
- Máximo de 300 linhas por arquivo TSX
- Não importar diretamente de outros domínios
- Comunicação entre domínios via `shared/` ou contextos globais
- Cada domínio implementa CRUD completo para suas entidades

## Deploy para Cloudflare Workers

### Arquivos de Configuração
- `wrangler.jsonc` - Configuração do Worker
- `vite.config.ts` - Configuração do build para Cloudflare

### Segredos Necessários no GitHub Actions
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Padrões de Qualidade e Estilo (Biome)

| Regra | Valor |
|-------|-------|
| Indentação | Tabs |
| Aspas | Aspas duplas |
| Ponto e vírgula | Obrigatório |
| Importações | Auto-organizadas |

Excluídos do linting: `routeTree.gen.ts`, `styles.css`

## Referências Importantes

- [ARQUITETURA-ALVO.md](ARQUITETURA-ALVO.md) - Documentação da arquitetura alvo do projeto
- [AGENTS.md](AGENTS.md) - Diretrizes e regras inegociáveis para agentes
- [src/app/README.md](src/app/README.md) - Documentação da camada App Shell
- [src/domains/README.md](src/domains/README.md) - Documentação da camada de Domínios
- [src/routes/__root.tsx](src/routes/__root.tsx) - Padrão de layout raiz
- [src/app/router.tsx](src/app/router.tsx) - Configuração de roteamento + SSR Query
- [src/orpc/client.ts](src/orpc/client.ts) - Cliente oRPC isomórfico
- [src/app/providers/AppProviders.tsx](src/app/providers/AppProviders.tsx) - Provedores globais
- [src/styles.css](src/styles.css) - Design tokens e estilos globais