# NEXUS — React Component Library

NEXUS is a production-grade UI component library built with React 18, TypeScript 5, Framer Motion, and Storybook 7.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Storybook](https://img.shields.io/badge/Storybook-7-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-000000?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![Tests](https://img.shields.io/badge/tests-53%20passing-brightgreen)](./coverage)
[![License](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

**[â†’ Live Storybook](https://YOUR_STORYBOOK_URL)** &nbsp;|&nbsp; **[â†’ Portfolio](https://YOUR_PORTFOLIO_URL)** &nbsp;|&nbsp; **[â†’ GitHub](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)**

> Replace the three links above with your real URLs after deploying to Vercel.

---

## Why this library?

Most UI libraries give you unstyled primitives or opinionated theme lock-in. NEXUS sits in the middle: fully styled, token-driven, and easy to fork and adapt. Every component is:

- **Accessible by default** â€” ARIA roles, live regions, focus traps, keyboard navigation, WCAG AA contrast
- **Animated with intent** â€” Framer Motion spring physics, not arbitrary `ease-in-out` durations
- **Typed precisely** â€” strict TypeScript, all props and return types exported
- **Tested thoroughly** â€” 53 unit tests across all 10 components using Vitest + React Testing Library
- **Documented in Storybook** â€” autodocs, interactive controls, dark mode, a11y panel

---

## Component Library

| Component | Category | Highlights |
|-----------|----------|------------|
| **Button** | Core | 4 variants Â· 3 sizes Â· loading state Â· icon slots Â· `forwardRef` |
| **Input** | Form | Floating label Â· prefix/suffix addons Â· validation states |
| **Textarea** | Form | Auto-resize Â· character count Â· error state |
| **Badge** | Display | 6 variants Â· dot indicator Â· removable pill |
| **Avatar** | Display | Image Â· initials fallback Â· status ring Â· `AvatarGroup` |
| **Card** | Layout | Compound API (`Card.Header`, `.Body`, `.Footer`, `.Image`) Â· 3 variants |
| **Modal** | Overlay | Focus trap Â· body scroll lock Â· `createPortal` Â· 5 sizes |
| **Toast** | Feedback | Context API (`useToast`) Â· progress bar Â· pause-on-hover Â· stacking |
| **Tooltip** | Overlay | 4 placements Â· open delay Â· keyboard accessible |
| **Toggle** | Form | Spring physics Â· 3 sizes Â· `role="switch"` Â· label slots |

---

## Design Tokens

All visual properties â€” color, spacing, typography, radius, elevation, motion â€” are defined as CSS custom properties in [`src/styles/tokens.css`](./src/styles/tokens.css). Both light and dark themes are fully specified.

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
â”œâ”€â”€ components/         # One folder per component
â”‚   â””â”€â”€ Button/
â”‚       â”œâ”€â”€ index.tsx       # Component implementation
â”‚       â”œâ”€â”€ styles.module.css   # Scoped styles using tokens
â”‚       â”œâ”€â”€ stories.tsx     # Storybook stories (autodocs)
â”‚       â”œâ”€â”€ stories.module.css  # Story-specific layout styles
â”‚       â””â”€â”€ test.tsx        # Vitest + RTL unit tests
â”œâ”€â”€ stories/
â”‚   â””â”€â”€ Introduction.stories.mdx  # Storybook docs entry (tokens, inventory)
â”œâ”€â”€ styles/
â”‚   â”œâ”€â”€ tokens.css      # Full design token system (light + dark)
â”‚   â””â”€â”€ global.css      # Reset and base styles
â”œâ”€â”€ utils/
â”‚   â”œâ”€â”€ cn.ts           # clsx-style class merging utility
â”‚   â”œâ”€â”€ useId.ts        # Stable ID generation for ARIA
â”‚   â”œâ”€â”€ useFocusTrap.ts # Focus trap for Modal and overlays
â”‚   â””â”€â”€ useTooltip.ts   # Tooltip positioning logic
â”œâ”€â”€ index.ts            # Public API â€” all components and types re-exported
â”œâ”€â”€ App.tsx             # Portfolio landing page
â””â”€â”€ App.css             # Landing page styles
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

# Option B: Dashboard â†’ New Project â†’ drag storybook-static/
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

MIT â€” see [LICENSE](./LICENSE)

