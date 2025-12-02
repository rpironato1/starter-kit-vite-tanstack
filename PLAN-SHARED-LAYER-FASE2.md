# Plano: Shared Layer – Fase 2 (CommandBarBase/InputBar)

## Contexto
- Continuação direta da pendência listada no `RELATORIO-PROGRESSO.md`: mover componentes verdadeiramente transversais para `src/shared` e estabelecer limites de importação.
- `CommandBarBase` (`src/components/layout/CommandBarBase.tsx`) e `InputBar` (`.../InputBar.tsx`) são wrappers genéricos dos protótipos. Mesmo que os domínios usem `Chat/Doc/Photo/CanvasInputArea`, manter essas bases no diretório global dificulta lint/import boundaries.
- Objetivo: reposicionar esses componentes em `src/shared/components`, atualizar qualquer consumidor (inclusive os command bars legados) e configurar uma regra lint/import-boundary para impedir que domínios importem diretamente de outros domínios.
- Referência: React patterns para componentes reutilizáveis (`/reactjs/react.dev` – components) garantem a validade da extração para um módulo compartilhado.

## Graph of Thoughts
```
{G1 Layout atual}
  -> {G2 CommandBarBase em src/components/layout}
       -> {G3 InputBar usa CommandBarBase}
       -> {G4 Doc/Photo/Canvas têm CommandBars legados (ainda presentes)}
  -> {G5 Domínios ativos usam InputAreas dedicadas que replicam estrutura}
{G6 Problema}
  -> {G7 Shared layer ainda incompleto + import path "@/components/layout/*"
       expõe módulos globais para qualquer domínio}
  -> {G8 Sem lint import-boundary; risco de dependências cruzadas}
{G9 Estado alvo}
  -> {G10 CommandBarBase/InputBar movidos para src/shared/components}
  -> {G11 Imports atualizados + legado documentado}
  -> {G12 Biome (ou lint equivalente) com regra de imports: domínios só podem
       importar de shared/components/layout, nunca de outro domínio}
Impacto: habilita futura remoção dos command bars e reforça arquitetura em camadas.
```

## Fluxograma
```
[Mapear consumidores e usos reais]
      ↓
[Mover CommandBarBase/InputBar → src/shared/components (+index)]
      ↓
[Ajustar imports/remover caminhos antigos/confirmar legado]
      ↓
[Configurar lint/import-boundary para evitar cross-domain]
      ↓
[Documentar (README/shared + relatório) + lint/build/tsc + testes manuais]
```

## Passos numerados
1. **Inventário detalhado**
   - Usar `rg` para listar consumidores de `CommandBarBase` e `InputBar`. Confirmar se `*CommandBar.tsx` ainda é usado (talvez apenas legado) e decidir se mantém apenas para referência ou remove se não houver referência.
   - Mapear dependências (ex.: `DocCommandBar`, `PhotoCommandBar`) e planejar a atualização de imports/apontadores.
2. **Movimentação física**
   - Criar `src/shared/components/CommandBarBase.tsx` e `InputBar.tsx` (copiar mantendo comentários/prop types).
   - Atualizar `src/shared/components/index.ts` para exportar ambos.
   - Remover os arquivos antigos de `src/components/layout`.
3. **Atualização dos consumidores**
   - Ajustar todos os imports (`DocCommandBar`, `PhotoCommandBar`, `CanvasCommandBar`, qualquer outro) para apontar para `@/shared/components`.
   - Caso `InputBar` esteja sem consumidores ativos, garantir export e anotar como legado/documentado para futuros reusos (evitar uso cruzado indevido).
   - Verificar `tsconfig`/paths se algo adicional for necessário.
4. **Lint/import-boundaries**
   - Configurar regra em `biome.json` (ou ferramenta equivalente) usando `lints.rules.style.useImportRestrictions` (ou similar) para impedir que algo em `src/domains/<feature>` importe diretamente de `src/domains/<other>` ou `src/components/layout`.
   - Documentar a regra no README ou em `RELATORIO-PROGRESSO`.
5. **Documentação + validação**
   - Atualizar `src/shared/README.md` listando os novos componentes.
   - Registrar no `RELATORIO-PROGRESSO.md` o avanço da Shared Layer.
   - Rodar `npm run lint`, `npm run build`, `npx tsc --noEmit`.
   - Executar testes manuais (Playwright MCP) nos quatro domínios (Chat/Photo/Doc/Canvas) garantindo que os inputs/command bars continuam íntegros.

## Checklist Regras Ingegociáveis
- [x] Graph of Thoughts e fluxograma documentados.
- [x] Context7 consultado (`/reactjs/react.dev` – components) para embasar reuso.
- [ ] SOLID/CRUD preservados (componentes continuam com responsabilidade única).
- [ ] Sem uso de `any`; garantir arquivos <300 linhas após a migração.
- [ ] Tokens de design mantidos (classes Tailwind existentes, sem CSS hardcoded novo).
- [ ] Responsividade validada (desktop/tablet/mobile) após mudanças.
- [ ] Supabase/oRPC não afetados; registrar se algo emergir.
- [ ] Lint/build/tsc e testes manuais Playwright executados ao final.
