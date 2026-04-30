# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development (from repo root)
yarn dev                  # Start Next.js dev server (apps/web)
yarn build                # Production build
yarn test                 # Run Jest in watch mode
yarn test:ci              # Run Jest once (CI mode)

# Run commands directly in the web workspace
yarn workspace @oss-compass/web dev
yarn workspace @oss-compass/web build
yarn workspace @oss-compass/web lint
yarn workspace @oss-compass/web ts-lint   # TypeScript type checking (watch)
```

Node >= 16 required. Uses Yarn workspaces.

## Architecture

Monorepo: `apps/web` (Next.js 15, Pages Router) + shared packages (`packages/*`).

### Page ↔ Module pattern

Pages (`src/pages/`) are thin shells that delegate to modules (`src/modules/`). A page typically imports and renders a single module component. Modules contain their own components, hooks, stores, types, and constants. When adding a feature, create a module under `src/modules/<feature>/` and a corresponding page under `src/pages/<feature>/`.

### Shared code (`src/common/`)

- `components/` — Reusable UI components (Layout, Header, Footer, Form primitives, ECharts wrappers, etc.)
- `utils/` — Pure utility functions (format, time, url, number, i18n helpers, etc.)
- `hooks/` — Shared React hooks (useBreakpoint, useImagePreview, etc.)
- `lib/` — Cross-cutting libs like Google Analytics (`ga.tsx`)
- `monumentedStation/` — Custom event tracking/monitoring system
- `transform/` — Data transformation utilities

### GraphQL data layer (`packages/graphql/`)

Backend communication via `graphql-request`. The client is configured at `src/common/gqlClient.ts` and points to `/api/graphql`. Generated types live in `packages/graphql/src/generated.ts`. Use the `@oss-compass/graphql` package alias to import.

### API proxying

`src/middleware.ts` proxies `/api/*`, `/services/*`, `/badge/*`, `/files/*`, `/users/*` to the backend. In dev mode, hits a local dev proxy at `/api/development/proxy`. In production, uses `API_URL` env var. Nginx handles proxying in real production; the Next.js middleware handles Vercel preview environments.

### i18n

Uses `next-i18next` v15 with `en` (default) and `zh` locales. Translation JSON files in `apps/web/i18n/`. Namespaces: `common`, plus module-specific ones like `os-situation`. Use `useTranslation('<namespace>')` in components.

### UI stack

- **Tailwind CSS** + **daisyUI** as primary styling (dark mode via `class` strategy)
- **Ant Design 5** (`antd`) for complex widgets
- **MUI 5** (`@mui/material`) for some components
- **ECharts** (via `EChartX` wrapper in common) and **Highcharts** for charting

### State management

- **React Query** (`@tanstack/react-query`) for server state — configured in `_app.tsx` with `refetchOnWindowFocus: false`, `retry: false`
- **valtio** for client-side global state (e.g., user info store)

### Auth

Login via OAuth providers (GitHub, Gitee, AtomGit). Auth state flows through `UserInfoFetcher` → `UserInfoStore` (valtio). `AuthRequire` component guards pages that need authentication.

### Path aliases (from tsconfig)

| Alias                  | Path                   |
| ---------------------- | ---------------------- |
| `@oss-compass/graphql` | `packages/graphql/src` |
| `@oss-compass/ui`      | `packages/ui/src`      |
| `@common/*`            | `src/common/*`         |
| `@modules/*`           | `src/modules/*`        |
| `@graphql/*`           | `src/graphql/*`        |
| `@public/*`            | `public/*`             |
| `@styles/*`            | `src/styles/*`         |

Jest has matching moduleNameMapper entries in `jest.config.js`.

### Pre-commit hooks

Husky + lint-staged run Prettier and ESLint on staged files. Configuration in `.lintstagedrc.js`.
