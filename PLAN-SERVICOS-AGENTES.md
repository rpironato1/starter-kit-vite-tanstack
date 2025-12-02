# Plano: Serviços de Agentes por Domínio

## Contexto
- Pendência atual: hooks `useChatExperience`, `usePhotoExperience`, `useDocExperience` e `useCanvasExperience` ainda concentram simulações dos agentes (setTimeouts, geração de mensagens, cálculos de usage), contrariando a meta dos domínios independentes documentada em RELATORIO-PROGRESSO.md.
- Objetivo: extrair agentes/serviços dedicados (ex.: `chatAgent`, `docAnalyzer`, `photoRenderAgent`, `canvasBuilder`) em `src/domains/<feature>/services`, deixando os hooks responsáveis apenas por estado/UI e conectando-os aos novos serviços.
- Escopo: Chat, Photo, Doc e Canvas. Settings não sofre alterações funcionais. Photo já possui `PromptEnhancer`; vamos padronizar os demais serviços mantendo arquivos < 300 linhas e sem `any`.
- Referências: AGENTS.md (regras inegociáveis), RELATORIO-PROGRESSO.md (pendências), Context7 `/reactjs/react.dev` (hooks), PLAN-DOMINIOS-LOGICA.md (arquitetura de domínios) e componentes atuais (chatMocks, docConfig, canvasConfig).

## Graph of Thoughts
```
{G1 Rotas containerizadas}
  -> {G2 Hooks de experiência (Chat/Photo/Doc/Canvas)}
       -> {G3 Lógica agentica embutida (setTimeout + criação de mensagens)}
            -> {G4 Dependem de mocks utilitários (createMockUsage, planos, parseArtifact)}
  -> {G5 Diretórios services vazios por domínio}
       -> {G6 Falta de contratos para consumo futuro via oRPC/Supabase}
{G7 Estado alvo}
  -> {G8 Hooks delegam toda a orquesração ao serviço do domínio}
       -> {G9 Serviços isolam side effects (simulações de IA, delays, cálculos de usage)}
  -> {G10 Facilita troca do mock por orquestradores reais (Supabase/oRPC) sem tocar na UI}
Impacto: evita regressões nos domínios e permite testes unitários dos serviços.
```

## Fluxograma
```
[Auditar hooks + dependências por domínio]
      ↓
[Definir contratos dos serviços (inputs/outputs, delays, tipos)]
      ↓
[Criar serviços em src/domains/<feature>/services + index.ts]
      ↓
[Refatorar hooks para usar os serviços via async/await]
      ↓
[Atualizar docs/checklists e rodar lint/build/tsc + testes manuais (Playwright)]
```

## Passos
1. **Inventário e alinhamento de dependências**
   - Mapear, por domínio, quais funções/constantes permanecem no hook (estado/UI) e quais movem para serviços (mensagens mockadas, delays, cálculos de usage, parsing de artifacts).
   - Confirmar padrões existentes (PromptEnhancer em Photo, canvasConfig exportando planos) para replicar consistência. Documentar no README do domínio caso surjam novos contratos públicos.

2. **Contratos dos serviços (SOLID + CRUD)**
   - Definir interfaces por domínio (ex.: `ChatAgentRequest`, `DocAnalyzerRequest`, `PhotoRenderRequest`, `CanvasBuilderRequest`) garantindo operações CRUD mínimas onde aplicável (envio, reprocessamento, gestão de anexos).
   - Planejar helpers compartilhados (ex.: função `wait(ms)` em `src/shared/utils/async.ts`) para remover setTimeout direto no hook e facilitar testes.

3. **Implementação dos serviços**
   - Criar `src/domains/<feature>/services/<service>.ts` contendo apenas lógica agentica e exportar via `services/index.ts`.
   - Mover/centralizar constantes (`PHOTO_EXECUTION_PLAN`, `createPhotoUsage`, `DOC_EXECUTION_PLAN`, `createDocUsage`) para dentro do serviço ou de arquivos dedicados conforme necessidade, respeitando limites de linhas.

4. **Refatorar hooks para consumir serviços**
   - Atualizar `handleSend`, `handleRetry`, `handleEnhance`, `openWorkspace` etc. para chamar os novos serviços via `async/await`, mantendo estado no hook.
   - Garantir dependências corretas no `useCallback` (sem funções recriadas) e que referências (`messagesEndRef`, `setIsLoading`) continuam funcionando.

5. **Validação e documentação**
   - Revisar imports nas rotas/componentes para garantir que somente hooks expõem estado e serviços permanecem isolados.
   - Atualizar `RELATORIO-PROGRESSO.md` e README dos domínios com a nova arquitetura.
   - Executar `npm run lint`, `npm run build`, `npx tsc --noEmit` e testes manuais (Playwright MCP) atravessando Chat → Photo → Doc → Canvas, conferindo consoles/responsividade.

## Checklist Regras Ingegociáveis
- [x] Graph of Thoughts + Fluxograma documentados.
- [x] Context7 consultado (`/reactjs/react.dev` – Hooks) para padrões de delegação.
- [x] SOLID + CRUD: serviços com responsabilidade única e preparados para operações de envio/análise.
- [x] Sem uso de `any`; tipagem derivada de `chatTypes`, `docTypes`, `photoTypes`, `canvasTypes`.
- [x] CSS tokens/responsividade preservados (nenhuma alteração de estilo planejada).
- [x] Sem regressão funcional: hooks continuam expostos com mesma API pública.
- [x] Supabase/oRPC não alterados nesta etapa, mas contratos já pensados para integração futura.
- [x] Testes obrigatórios (lint/build/tsc + Playwright manual) previstos no passo 5.
- [x] Arquivo de plano criado antes da execução.
