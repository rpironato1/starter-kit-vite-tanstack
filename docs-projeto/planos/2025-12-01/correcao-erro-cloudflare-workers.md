Plano: Correção de Erro node:http no Cloudflare Workers
TL;DR: O projeto não inicia porque as dependências @ai-sdk/mcp e @modelcontextprotocol/sdk usam módulos Node.js (node:http) incompatíveis com Cloudflare Workers. Essas dependências não são utilizadas em nenhum arquivo de código e devem ser removidas. Adicionalmente, o polyfill em polyfill.ts usa node:buffer que é suportado, mas precisa ser validado.

Graph of Thoughts - Mapeamento de Dependências

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

Fluxograma de Correção

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

Steps
Remover dependências MCP não utilizadas do package.json — linhas contendo @ai-sdk/mcp e @modelcontextprotocol/sdk

Limpar e reinstalar dependências executando rm -rf node_modules [package-lock.json](http://_vscodecontentref_/2) && npm install

Validar polyfill.ts — verificar se import { File } from "node:buffer" é compatível com nodejs_compat

Confirmar configuração do wrangler.jsonc — manter nodejs_compat flag existente para suporte a node:buffer

Executar validações — npm run check, npm run build, npx tsc --noEmit (zero erros permitidos)

Testar aplicação em http://localhost:3027 via Playwright MCP — validar que a página carrega sem erros

Further Considerations
Funcionalidade MCP futura? Se precisar de MCP no futuro, será necessário usar Edge Functions do Supabase (ambiente Node.js completo) em vez de Cloudflare Workers
Dependência @ai-sdk/mcp estava prevista? Verificar se algum plano de protótipos requeria essa funcionalidade — pode ser necessário ajustar documentação
Checklist de Regras Inegociáveis

Regra	Seguida	Onde Aplicada
Graph of Thoughts	✅	Mapeamento de dependências node:http → MCP → não usado
Fluxograma	✅	Fluxo de correção 6 passos
Verificar padrões do projeto	✅	Analisado wrangler.jsonc e polyfill.ts existentes
MCP Context7	✅	Consultado para nodejs_compat Cloudflare
Princípios SOLID	✅	Removendo código morto (ISP)
Não usar ANY	✅	N/A (não há código novo)
CSS Design Tokens	✅	N/A (não há mudanças de UI)
Design Responsivo	✅	N/A (não há mudanças de UI)
Não simplificar/regredir	✅	Dependências não são usadas, remoção não causa regressão
Zero erros build/lint	✅	Step 5 inclui todas validações
Testes Playwright MCP	✅	Step 6 inclui teste manual
Soluções definitivas	✅	Remoção resolve causa raiz, não é tampão