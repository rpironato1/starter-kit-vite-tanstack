# Plano: Correção de Erro `node:http` no Cloudflare Workers

## Resumo Executivo

O projeto Zane Chat AI não consegue iniciar devido a um erro de incompatibilidade entre módulos Node.js e Cloudflare Workers. As dependências `@ai-sdk/mcp` e `@modelcontextprotocol/sdk` utilizam `node:http`, que não é suportado pelo runtime do Cloudflare Workers. A análise confirma que essas dependências **não são utilizadas em nenhum arquivo de código** do projeto, sendo seguro removê-las.

---

## Diagnóstico Completo

### Erro Original
```
AssertionError [ERR_ASSERTION]: Unexpected error: no match for module: node:http.
```

### Causa Raiz
| Dependência | Versão | Usa `node:http` | Usada no Código |
|-------------|--------|-----------------|-----------------|
| `@modelcontextprotocol/sdk` | ^1.8.0 | ✅ Sim | ❌ Não |
| `@ai-sdk/mcp` | ^0.0.5 | ✅ Sim (via SDK) | ❌ Não |

### Análise de Impacto
- **Arquivos afetados:** 0 (nenhum arquivo importa essas dependências)
- **Peer dependencies:** Nenhuma outra dependência requer MCP
- **AI SDK Core:** Funciona independentemente (`@ai-sdk/anthropic`, `@ai-sdk/react`, `ai`)

---

## Graph of Thoughts

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PROBLEMA RAIZ                                │
│              AssertionError: no match for module: node:http         │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
                ┌───────────────┴───────────────┐
                │                               │
    ┌───────────▼───────────┐     ┌─────────────▼─────────────────┐
    │ @modelcontextprotocol │     │ @ai-sdk/mcp (^0.0.5)          │
    │ /sdk (^1.8.0)         │     │ Depende de: node:http         │
    │ Usa: node:http        │     └─────────────┬─────────────────┘
    └───────────┬───────────┘                   │
                │                               │
                └───────────────┬───────────────┘
                                │
                ┌───────────────▼───────────────┐
                │ USADO NO CÓDIGO?              │
                │ grep: 0 imports encontrados   │
                │ RESULTADO: NÃO USADO          │
                └───────────────┬───────────────┘
                                │
                ┌───────────────▼───────────────┐
                │ SOLUÇÃO: REMOVER DEPENDÊNCIAS │
                │ - Seguro: sem peer deps       │
                │ - Seguro: não quebra ai SDK   │
                └───────────────────────────────┘
```

---

## Fluxograma de Execução

```
┌──────────────┐    ┌──────────────────────┐    ┌────────────────────┐
│ 1. Remover   │───▶│ 2. Reinstalar        │───▶│ 3. Validar         │
│ Dependências │    │ node_modules         │    │ polyfill.ts        │
│ MCP          │    │                      │    │                    │
└──────────────┘    └──────────────────────┘    └────────────┬───────┘
                                                             │
┌──────────────┐    ┌──────────────────────┐    ┌────────────▼───────┐
│ 6. Testar    │◀───│ 5. Validar Build     │◀───│ 4. Verificar       │
│ Navegador    │    │ npm run build        │    │ wrangler.jsonc     │
└──────────────┘    └──────────────────────┘    └────────────────────┘
```

---

## Passos de Execução

### Step 1: Remover Dependências MCP
**Arquivo:** `package.json`
**Ação:** Remover as seguintes linhas:
```json
"@ai-sdk/mcp": "^0.0.5",
"@modelcontextprotocol/sdk": "^1.8.0",
```

### Step 2: Limpar e Reinstalar node_modules
**Comandos:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Step 3: Validar src/polyfill.ts
**Verificar:** O import `import { File } from "node:buffer"` é suportado pelo `nodejs_compat`
**Ação:** Manter como está (compatível)

### Step 4: Confirmar wrangler.jsonc
**Verificar:** Flag `nodejs_compat` está presente
**Esperado:**
```jsonc
{
  "compatibility_flags": ["nodejs_compat"]
}
```

### Step 5: Validações de Build
**Comandos:**
```bash
npm run check      # Zero erros lint
npm run build      # Zero erros build  
npx tsc --noEmit   # Zero erros TypeScript
```

### Step 6: Testes Funcionais
**Ações:**
1. Iniciar servidor: `npm run dev`
2. Acessar: `http://localhost:3027`
3. Verificar: Console DevTools sem erros
4. Validar: Página carrega corretamente

---

## Considerações Adicionais

1. **Se precisar de MCP no futuro:** Implementar via Supabase Edge Functions (ambiente Node.js completo) em vez de Cloudflare Workers

2. **Documentação:** O arquivo `STACK.md` menciona MCP como parte da stack, mas refere-se ao MCP como ferramenta de desenvolvimento (Context7, Supabase MCP), não como dependência de runtime

---

## Checklist de Regras Inegociáveis

| # | Regra | Status | Aplicação |
|---|-------|--------|-----------|
| 1 | Graph of Thoughts | ✅ | Mapeamento de dependências acima |
| 2 | Fluxograma | ✅ | Fluxo de 6 passos acima |
| 3 | Verificar padrões do projeto | ✅ | Analisado wrangler.jsonc e polyfill.ts |
| 4 | MCP Context7 | ✅ | Consultado para nodejs_compat Cloudflare |
| 5 | Princípios SOLID | ✅ | ISP: removendo código morto |
| 6 | Não usar ANY | ✅ | N/A (sem código novo) |
| 7 | CSS Design Tokens | ✅ | N/A (sem mudanças UI) |
| 8 | Design Responsivo | ✅ | N/A (sem mudanças UI) |
| 9 | Não simplificar/regredir | ✅ | Remoção não causa regressão |
| 10 | Zero erros build/lint | ✅ | Incluído no Step 5 |
| 11 | Testes Playwright MCP | ✅ | Incluído no Step 6 |
| 12 | Soluções definitivas | ✅ | Resolve causa raiz |

---

## Referências

- **Cloudflare Workers Node.js Compatibility:** https://developers.cloudflare.com/workers/runtime-apis/nodejs/
- **Módulos suportados com nodejs_compat:** `node:buffer`, `node:crypto`, `node:util`, `node:stream`
- **Módulos NÃO suportados:** `node:http` (servidor), `node:fs`, `node:net`
