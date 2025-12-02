# Plano: Shared Layer - Componentes Transversais

## Contexto
- Pendência do relatório: revisar componentes/utilitários duplicados (ex.: `PrototypeInputContainer`) e mover o que for transversal para `src/shared`, garantindo limites de importação entre domínios.
- Componentes mapeados em `src/components/layout/*` e domínios (`ChatInputArea`, `PhotoInputArea`, `DocInputArea`, `CanvasInputArea`) compartilham o mesmo wrapper visual.
- Regras: seguir AGENTS.md, manter arquivos <300 linhas, sem `any`, tokens de `src/index.css`/`tailwind.config.ts` apenas, SOLID/CRUD e responsividade intactos.
- Referência técnica: React reuso de componentes (`/reactjs/react.dev` – components) confirma que wrappers reutilizáveis devem ser extraídos e importados via props/children.

## Graph of Thoughts
```
{G1 Layout atual}
  -> {G2 PrototypeInputContainer em src/components/layout}
       -> {G3 Consumido por Chat/Photo/Doc/Canvas InputAreas}
       -> {G4 Depende apenas de cn + tokens => totalmente compartilhável}
  -> {G5 CommandBarBase + InputBar herdados dos protótipos}
       -> {G6 CommandBarBase só usado por CommandBars legadas (não referenciadas)}
{G7 Problema}
  -> {G8 Domínios importam via "@/components/layout/*" => fere fronteira}
  -> {G9 Shared/components vazio; não há contrato público documentado}
{G10 Estado alvo}
  -> {G11 PrototypeInputContainer movido para src/shared/components + index.ts}
  -> {G12 Domínios passam a importar via "@/shared/components"}
  -> {G13 Layout/CommandBarBase revisado (marcar legado ou mover quando voltar a ser usado)}
Impacto: garante fronteira clara e prepara lint/import-boundaries futuros.
```

## Fluxograma
```
[Inventariar componentes layout]
      ↓
[Classificar: compartilhável x legado]
      ↓
[Mover os compartilháveis para src/shared/components]
      ↓
[Atualizar imports nos domínios + root components]
      ↓
[Documentar shared layer + validar lint/build/tsc/Playwright]
```

## Passos (sequência numerada)
1. **Inventário detalhado (`src/components/layout`)**
   - Listar arquivos e mapear quem os consome via `rg`. Confirmar que `PrototypeInputContainer` é usado em `Chat/Photo/Doc/Canvas InputArea` e que `CommandBarBase` hoje alimenta apenas `*CommandBar` legados (não usados pelos routes).
   - Registrar decisão: mover apenas o componente realmente compartilhado nesta etapa; anotar que `CommandBarBase` ficará pendente (legado) até ser reintroduzido.
2. **Preparar Shared Layer**
   - Criar `src/shared/components/PrototypeInputContainer.tsx` (copiando lógica atual) e `src/shared/components/index.ts` exportando o componente.
   - Garantir comentários sucintos explicando o objetivo cross-domain e manter dependências (`cn`) apontando para `@/lib/utils`.
3. **Atualizar consumidores**
   - Ajustar imports em `ChatInputArea.tsx`, `PhotoInputArea.tsx`, `DocInputArea.tsx`, `CanvasInputArea.tsx` (e quaisquer outros detectados) para ler de `@/shared/components`.
   - Remover arquivo antigo de `src/components/layout` caso nenhum outro consumidor reste.
4. **Documentar**
   - Atualizar `src/shared/README.md` com a nova responsabilidade.
   - Atualizar `RELATORIO-PROGRESSO.md` (status atual + próximos passos) registrando que a camada shared passou a hospedar o wrapper.
5. **Validação completa**
   - Rodar `npm run lint`, `npm run build`, `npx tsc --noEmit`. 
   - Subir o preview (`npm run dev -- --port 3027`) e executar testes manuais Playwright MCP nos fluxos Chat → Photo → Doc → Canvas para garantir que o input bar continua responsivo e sem regressões; verificar console para ausência de erros.
   - Registrar resultado nos relatórios necessários (caso aplicável).

## Checklist Regras Ingegociáveis
- [x] Graph of Thoughts e Fluxograma incluídos antes da execução.
- [x] Context7 consultado (`/reactjs/react.dev` – components) e citado no plano.
- [x] SOLID/CRUD preservados (componentes com responsabilidade única, domínios consumindo via hooks/props).
- [x] Sem uso de `any`; manter arquivos `.tsx` < 300 linhas durante a migração.
- [x] Tokens de design: apenas classes/tokens existentes (sem CSS hardcoded novo).
- [x] Responsividade confirmada em desktop/tablet/mobile após mover o wrapper (passo 5 cobre validação total, incluindo responsividade).
- [x] `supabase/functions` não afetado (fora de escopo) – registrar se algo impactar.
- [x] Execução encerrada somente após lint/build/tsc + Playwright manual sem erros.
