# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Development server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint validation
npm run start        # Production server
```

## Pre-commit Checks

Always run before committing:

```bash
npm run lint && npm run build
```

Both must pass without errors.

## Commit Conventions

Conventional Commits format required:

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scope (optional): blog, events, resources, formations, ui, api
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (in `components/ui/` - do not modify directly)
- **Forms**: React Hook Form + Zod
- **Integrations**: Luma (events), Resend (newsletter)

## Project Structure

```
app/
├── (public)/             # Public pages (landing, events, blog, etc.)
├── api/newsletter/       # Newsletter API route
└── layout.tsx            # Root layout

components/
├── ui/                   # shadcn/ui components (do not modify)
├── layout/               # Header, Footer
├── events/               # EventCard
├── blog/                 # ArticleCard
├── resources/            # ResourceCard, CopyButton
└── forms/                # NewsletterForm

lib/
├── supabase/             # Client, server, generated types
├── validations/          # Zod schemas
└── utils.ts              # Utilities (cn, formatDate, slugify)
```

## Code Conventions

- **Language**: French for UI text, English for code identifiers
- **Data fetching**: Server Components by default
- **Mutations**: Server Actions
- **Validation**: Zod schemas in `lib/validations/`
- **UI imports**: Always from `@/components/ui/`
- **Styling**: Tailwind only, use `cn()` for conditional classes

## Database Tables (Supabase)

- `articles`: slug, title, content, category, tags, published
- `resources`: type, parcours, difficulty
- `formations`: modules (JSONB)
- `events`: event_date, registration_url, replay_url, is_past, event_type
- `subscribers`: email, parcours
- `partners`: name, logo, website

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```
## MCP

- tu peux utiliser le MCP context7 pour aller chercher la documentation spécifique à une fonction, une version, un composant...