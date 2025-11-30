# Zane Chat AI - Copilot Instructions

## Architecture Overview

**TanStack Start** full-stack application with AI agent capabilities powered by Claude (Anthropic), deployed to **Cloudflare Workers**.

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | TanStack Start | SSR/SPA hybrid with file-based routing |
| State | TanStack Store + Query | Global state + server cache |
| API | oRPC | Type-safe RPC at `/api/rpc` |
| AI | Vercel AI SDK + Anthropic | Streaming AI responses with tools |
| Styling | Tailwind CSS v4 + shadcn/ui | Component library (new-york style) |
| Deploy | Cloudflare Workers | Edge deployment via Wrangler |

## Project Structure

```
src/
├── routes/              # File-based routing (TanStack Router)
│   ├── __root.tsx       # Root layout, global providers
│   ├── api.$.ts         # Catch-all API handler
│   ├── api.rpc.$.ts     # oRPC endpoint handler
│   └── index.tsx        # Home page
├── orpc/                # Type-safe API definitions
│   ├── client.ts        # Isomorphic client (server/browser)
│   └── router/          # Procedures with Zod schemas
├── components/
│   ├── Header.tsx       # Main navigation component
│   └── ui/              # shadcn/ui components only
├── lib/                 # Shared utilities
│   └── utils.ts         # cn() helper for classNames
├── integrations/        # Third-party providers
│   └── tanstack-query/  # Query client setup
└── env.ts               # Environment validation (T3 Env)
```

## Quality Gates (MANDATORY)

Every PR must pass these checks before merge:

```bash
# 1. TypeScript - ZERO errors allowed
npx tsc --noEmit

# 2. Lint + Format
npm run check

# 3. Build verification
npm run build

# 4. Tests (when implemented)
npm run test
```

## Developer Commands

```bash
npm run dev          # Dev server (port 3027)
npm run build        # Production build + tsc --noEmit
npm run check        # Biome lint + format
npm run deploy       # Build + deploy to Cloudflare Workers
npm run cf-typegen   # Generate Cloudflare types
```

## Key Conventions

### Routes & API Endpoints
```typescript
// Page route: src/routes/my-feature.tsx
export const Route = createFileRoute('/my-feature')({
  component: MyFeature,
})

// API route: src/routes/api.my-endpoint.ts → GET /api/my-endpoint
export const Route = createFileRoute('/api/my-endpoint')({
  server: {
    handlers: {
      GET: async ({ request }) => new Response(JSON.stringify(data)),
    },
  },
})
```

### oRPC Procedures
```typescript
// src/orpc/router/my-feature.ts
import { os } from '@orpc/server'
import { z } from 'zod'

export const myProcedure = os
  .input(z.object({ id: z.string() }))
  .handler(({ input }) => { /* logic */ })
```

### Adding Components
```bash
pnpx shadcn@latest add <component>
```
- Use `@/components/ui/` path alias
- Use `cn()` from `@/lib/utils` for className merging
- Always add `type="button"` to non-submit buttons

### AI Integration Pattern
```typescript
import { anthropic } from '@ai-sdk/anthropic'
import { streamText } from 'ai'

const result = await streamText({
  model: anthropic('claude-haiku-4-5'),
  messages: convertToModelMessages(messages),
  tools: myTools, // Zod-validated tool definitions
})
return result.toUIMessageStreamResponse()
```

### State Management
```typescript
// Global state
import { Store, Derived } from '@tanstack/store'

const store = new Store({ count: 0 })
const doubled = new Derived({
  fn: () => store.state.count * 2,
  deps: [store],
})
doubled.mount() // Required for derived state
```

### Environment Variables
- Define in `src/env.ts` using T3 Env + Zod
- Server vars: no prefix
- Client vars: `VITE_` prefix required
- Required: `ANTHROPIC_API_KEY`

## Cloudflare Workers Deployment

### Configuration Files
- `wrangler.jsonc` - Worker configuration
- `.github/workflows/deploy.yml` - CI/CD pipeline

### GitHub Actions Secrets Required
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Code Style (Biome)

| Rule | Value |
|------|-------|
| Indentation | Tabs |
| Quotes | Double quotes |
| Semicolons | Required |
| Imports | Auto-organized |

Excluded from linting: `routeTree.gen.ts`, `styles.css`

## Reference Files
- [src/routes/__root.tsx](src/routes/__root.tsx) - Root layout pattern
- [src/router.tsx](src/router.tsx) - Router + SSR Query setup
- [src/orpc/client.ts](src/orpc/client.ts) - Isomorphic oRPC client
- [src/env.ts](src/env.ts) - Environment validation pattern
