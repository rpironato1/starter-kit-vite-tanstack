# Plano: Análise do Protótipo `prototipos-zane/zane-ai`

> **Data:** 02/12/2025  
> **Objetivo:** Avaliar o backend prototipado (Supabase + SSR TanStack/Cloudflare) e verificar aderência à arquitetura alvo com micro módulos e alta segurança/baixa latência.

---

## Contexto
- Repositório principal segue diretrizes do `AGENTS.md`.
- Protótipo em `prototipos-zane/zane-ai` contém lógicas backend preliminares (Zod, schemas, contratos).
- Precisamos decidir que partes migram para Supabase Edge Functions (foco segurança/SQL) vs Cloudflare Workers (latência).

---

## Graph of Thoughts (Nós/Dependências a mapear)
```
{N1 Supabase (SQL, RLS, Edge Functions)}
  -> interage com {N2 Schemas/Contracts (Zod, oRPC, APIs)}
      -> consumidos por {N3 Servidores SSR/Workers (TanStack + Cloudflare)}
          -> expostos a {N4 Frontend Domínios (chat/doc/photo/...)}
```
Análise deve verificar se protótipo respeita limites entre N1–N4 e se encaixa na arquitetura alvo.

---

## Fluxograma de Avaliação
```
[Coletar arquivos e dependências do protótipo]
   ↓
[Mapear features (auth, chat, doc, etc.) → identificar onde rodam hoje]
   ↓
[Classificar requisitos: segurança alta = Supabase; baixa latência = Cloudflare]
   ↓
[Comparar com arquitetura alvo → checar modularização e contratos]
   ↓
[Produzir relatório: aderência, gaps, recomendações de refinamento]
```

---

## Passos Numerados
1. Ler integralmente o pedido + AGENTS.md (garantir alinhamento).
2. Listar estrutura do protótipo (`ls prototipos-zane/zane-ai`, `package.json`, configs).
3. Identificar módulos chave: schemas Zod, handlers, edge functions simuladas, integração com Supabase/Workers.
4. Construir mapa de dependências (Graph of Thoughts detalhado) mostrando fluxos dados → contratos → execução.
5. Criar fluxograma funcional por feature (chat/doc/photo/canvas, auth, storage) destacando pontos sensíveis.
6. Avaliar aderência à arquitetura alvo (domínios isolados, SOLID, microserviços) e apontar gaps.
7. Classificar funcionalidades para Supabase (segurança/RLS) vs Cloudflare (latência/SSR) com justificativas.
8. Redigir relatório final com recomendações de refinamento/ajustes estruturais.

---

## Checklist Regras Innegociáveis
- [x] Graph of Thoughts incluído.
- [x] Fluxograma definido.
- [x] Context7 será consultado se necessário para SSR/Workers/Supabase padrões.
- [x] SOLID/CRUD considerados nas avaliações (passos 4-7).
- [x] Plano numerado e completo antes da execução.

---

> Após validar o plano, iniciarei a análise seguindo os passos acima.
