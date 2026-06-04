# FluxoNexus — Logística Integrada

Site institucional da FluxoNexus, consultora portuguesa em logística integrada (projeto académico).

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript estrito
- Tailwind CSS v4 (tokens em `app/globals.css`)
- `@vercel/analytics` (cookieless, sem banner)
- Server Actions para o formulário de contacto (entrega via Telegram opcional)

## Arrancar localmente

```bash
npm install      # ou pnpm install
npm run dev      # arranca em http://localhost:3003
```

A URL canónica é `http://localhost:3003/pt` — o middleware redireciona `/` → `/pt`.

## Estrutura

```
app/
  [locale]/              # /pt como raiz pública
    layout.tsx           # header, footer, JSON-LD, analytics, fonts
    page.tsx             # Home
    sobre/page.tsx       # Sobre nós
    servicos/page.tsx    # Serviços
    contactos/page.tsx   # Contactos
    contactos/actions.ts # Server Action (Telegram opcional)
    opengraph-image.tsx  # OG dinâmica
  layout.tsx             # html/body + fonts
  globals.css            # tokens Tailwind v4
  robots.ts, sitemap.ts, icon.tsx, not-found.tsx
components/              # Header, Footer, Hero, ServicesGrid, ContactForm, WhatsAppFab, …
lib/
  business.ts            # ÚNICA fonte de factos (telefone, morada, equipa, redes)
  i18n/                  # pt.ts é a ÚNICA fonte das strings
middleware.ts            # prefixa /pt em qualquer rota sem locale
```

## Edição rápida

- **Factos do negócio (telefone, email, equipa, redes)** → `lib/business.ts`
- **Conteúdo de texto (todas as páginas)** → `lib/i18n/pt.ts`
- **Cores e tipografia** → `app/globals.css` (`@theme`)

## Entrega de leads (opcional, para uso real)

O formulário funciona sem configuração: faz log no servidor. Para entrega via Telegram:

1. Criar bot no Telegram via `@BotFather` → `TELEGRAM_BOT_TOKEN`
2. Enviar uma mensagem ao bot e ler `chat_id` em `https://api.telegram.org/bot<token>/getUpdates`
3. Adicionar em `.env.local`:
   ```
   TELEGRAM_BOT_TOKEN=...
   TELEGRAM_CHAT_ID=...
   ```
