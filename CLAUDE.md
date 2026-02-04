# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어

모든 소통은 한국어로 진행한다.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (eslint v9 flat config)
```

No test framework is configured in this project.

## Architecture

Next.js 16 App Router project (설스터디 — a Korean mentoring/tutoring platform). TypeScript strict mode. React 19.

### Styling — Tailwind CSS v4

All design tokens and custom utilities live in [app/globals.css](app/globals.css). Tailwind v4 uses the new `@theme` / `@utility` directives instead of a `tailwind.config` file:

- **Color palette:** `primary` (orange), `success`, `warning`, `error`, `gray` — all defined as CSS custom properties under `@theme`.
- **Typography scale:** Custom `@utility` classes: `text-heading-xl`, `text-heading-l`, `text-title-l`, `text-title-m`, `text-body-l`, `text-body-m`, `text-label-l`, `text-label-m`, `text-label-s`. Use these instead of raw font-size/weight classes.
- **Prettier** is configured with `prettier-plugin-tailwindcss`, which auto-sorts Tailwind class names on save.

### Font

Pretendard (Korean) is loaded via `next/font/local` in [app/fonts.ts](app/fonts.ts) and applied to `<body>` in the root layout. Weights available: 400, 500, 600, 700. The CSS variable `--font-pretendard` is set; `--font-sans` resolves to it.

### Route & component layout convention

- Each route is a directory under `app/` with a `page.tsx`.
- Route-specific components go in a `_components/` subdirectory (e.g., `app/login/_components/`).
- Only the outermost interactive component in a route tree needs `"use client"`. Pure presentational children (like `Login.tsx`) can remain server components as long as they receive data via props.

### Path alias

`@/*` maps to the project root. Use it for cross-route imports (e.g., `@/assets/...`). Relative imports are fine within the same route directory.

### Current routes

| Route | Status |
|---|---|
| `/` | Placeholder (home) |
| `/login` | Two-step auth flow: role selection → credential form. Backend not yet wired (`TODO` in `handleLogin`). |
| `/planner` | Empty stub |

### Login flow

The login page orchestrates a two-step flow via local state (`AuthStep`). Step 1 (`RoleSelect`) lets the user pick Mentee / Mentor / Parent; the selected role is passed down to Step 2 (`Login` form). Profile images for each role (default + hover states) live in [assets/profileImgs/](assets/profileImgs/).
