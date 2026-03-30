# MyUI — React Component Library

A production-quality component library built to demonstrate senior-level frontend engineering: token-driven design, spring physics animations, full accessibility, and comprehensive test coverage. Showcases the kind of systematic thinking product teams at Airbnb, Linear, and Vercel expect on day one.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Storybook](https://img.shields.io/badge/Storybook-7-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-000000?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![Tests](https://img.shields.io/badge/tests-53%20passing-brightgreen)](./coverage)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**[→ Live Storybook](https://YOUR_STORYBOOK_URL)** &nbsp;|&nbsp; **[→ Portfolio](https://YOUR_PORTFOLIO_URL)** &nbsp;|&nbsp; **[→ GitHub](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)**

> Replace the three links above with your real URLs after deploying to Vercel.

---

## Why this library?

Most UI libraries give you unstyled primitives or opinionated theme lock-in. MyUI sits in the middle: fully styled, token-driven, and easy to fork and adapt. Every component is:

- **Accessible by default** — ARIA roles, live regions, focus traps, keyboard navigation, WCAG AA contrast
- **Animated with intent** — Framer Motion spring physics, not arbitrary `ease-in-out` durations
- **Typed precisely** — strict TypeScript, all props and return types exported
- **Tested thoroughly** — 53 unit tests across all 10 components using Vitest + React Testing Library
- **Documented in Storybook** — autodocs, interactive controls, dark mode, a11y panel

---

## Component Library

| Component | Category | Highlights |
|-----------|----------|------------|
| **Button** | Core | 4 variants · 3 sizes · loading state · icon slots · `forwardRef` |
| **Input** | Form | Floating label · prefix/suffix addons · validation states |
| **Textarea** | Form | Auto-resize · character count · error state |
| **Badge** | Display | 6 variants · dot indicator · removable pill |
| **Avatar** | Display | Image · initials fallback · status ring · `AvatarGroup` |
| **Card** | Layout | Compound API (`Card.Header`, `.Body`, `.Footer`, `.Image`) · 3 variants |
| **Modal** | Overlay | Focus trap · body scroll lock · `createPortal` · 5 sizes |
| **Toast** | Feedback | Context API (`useToast`) · progress bar · pause-on-hover · stacking |
| **Tooltip** | Overlay | 4 placements · open delay · keyboard accessible |
| **Toggle** | Form | Spring physics · 3 sizes · `role="switch"` · label slots |

---

## Design Tokens

All visual properties — color, spacing, typography, radius, elevation, motion — are defined as CSS custom properties in [`src/styles/tokens.css`](./src/styles/tokens.css). Both light and dark themes are fully specified.

```css
/* Usage in any component */
background: var(--color-bg-primary);
color: var(--color-text-primary);
padding: var(--space-4);
border-radius: var(--radius-md);
box-shadow: var(--shadow-md);
transition: color var(--transition-fast);
```

Token categories: `color-brand`, `color-neutral`, `color-success/warning/danger/info`, `color-bg-*`, `color-text-*`, `color-border-*`, `space-1` through `space-16`, `font-*`, `text-*`, `radius-*`, `shadow-*`, `transition-*`.

---

## Architecture

```
src/
├── components/         # One folder per component
│   └── Button/
│       ├── index.tsx       # Component implementation
│       ├── styles.module.css   # Scoped styles using tokens
│       ├── stories.tsx     # Storybook stories (autodocs)
│       ├── stories.module.css  # Story-specific layout styles
│       └── test.tsx        # Vitest + RTL unit tests
├── stories/
│   └── Introduction.stories.mdx  # Storybook docs entry (tokens, inventory)
├── styles/
│   ├── tokens.css      # Full design token system (light + dark)
│   └── global.css      # Reset and base styles
├── utils/
│   ├── cn.ts           # clsx-style class merging utility
│   ├── useId.ts        # Stable ID generation for ARIA
│   ├── useFocusTrap.ts # Focus trap for Modal and overlays
│   └── useTooltip.ts   # Tooltip positioning logic
├── index.ts            # Public API — all components and types re-exported
├── App.tsx             # Portfolio landing page
└── App.css             # Landing page styles
```

---

## Local Setup

```bash
# Install dependencies
npm install

# Start the portfolio app (localhost:5173)
npm run dev

# Start Storybook (localhost:6006)
npm run storybook

# Run all tests
npm run test

# Run tests with coverage report
npm run test:coverage

# TypeScript type check (no emit)
npm run type-check

# Lint
npm run lint
```

---

## Deploying Storybook to Vercel

1. Build the static Storybook output:

```bash
npm run build-storybook
```

2. This generates a `storybook-static/` folder.

3. Deploy via Vercel CLI or drag-and-drop:

```bash
# Option A: CLI
npx vercel storybook-static --prod

# Option B: Dashboard → New Project → drag storybook-static/
```

4. After deploying, update the `STORYBOOK_URL` constant in `src/App.tsx` and the link in this README.

---

## Public API

All components and TypeScript types are exported from the library entry point:

```ts
import {
  Button,
  Input,
  Textarea,
  Badge,
  Avatar, AvatarGroup,
  Card,
  Modal,
  ToastProvider, useToast,
  Tooltip,
  Toggle,
} from "./src";
```

---

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server for portfolio page |
| `npm run build` | Production build of portfolio page |
| `npm run storybook` | Storybook on port 6006 |
| `npm run build-storybook` | Static Storybook export |
| `npm run test` | Vitest test run |
| `npm run test:coverage` | Vitest with v8 coverage report |
| `npm run type-check` | TypeScript strict check (no emit) |
| `npm run lint` | ESLint |

---

## License

MIT — see [LICENSE](./LICENSE)
