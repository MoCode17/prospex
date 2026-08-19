# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

`prospera` is a Next.js app freshly bootstrapped from `create-next-app`. As of this writing `app/page.tsx` is still the default starter page — there is no custom application logic, no test setup, and no API routes yet. Treat this as a greenfield codebase.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint
```

There is no test runner configured yet.

## Architecture & conventions

- **Next.js 16 with the App Router** (`app/` directory). `app/layout.tsx` is the root layout; route segments are added as subdirectories under `app/`.
- **React 19**.
- **Tailwind CSS v4**, configured via `@import "tailwindcss"` in `app/globals.css` and the `@tailwindcss/postcss` plugin (`postcss.config.mjs`). There is no `tailwind.config.js` — theme tokens are declared inline with `@theme` in `globals.css`. Dark mode uses `prefers-color-scheme` and the `dark:` variant.
- **Path alias**: `@/*` maps to the repo root (e.g. `import x from "@/app/..."`).
- **Fonts**: Geist Sans / Geist Mono loaded via `next/font/google` in the root layout, exposed as the `--font-geist-sans` / `--font-geist-mono` CSS variables.
- TypeScript is `strict`. ESLint extends `next/core-web-vitals` and `next/typescript` via the flat config in `eslint.config.mjs`.

## Brand & design

See @docs/BRAND.md for Prospera's palette rationale, typography, and voice rules.
Design tokens (colors, fonts) live in @docs/design-tokens.css — reference these
CSS variables in all components instead of hardcoding hex values or font names.
