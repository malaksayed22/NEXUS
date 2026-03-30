# Changelog

All notable changes to MyUI are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Story `play` functions with `@storybook/addon-interactions`
- `Combobox` — searchable accessible Select

---

## [0.1.0] — 2026-03-30

### Added

#### Components
- **Spinner** — 5 sizes (`xs`–`xl`), `aria-label`, `role="status"`, `prefers-reduced-motion` support, `forwardRef`
- **Checkbox** — controlled, `indeterminate` state (via DOM effect), 3 sizes, error state, helper text, `forwardRef`
- **Radio / RadioGroup** — `RadioContext` compound pattern, group-level + individual `disabled`, `helperText`, `forwardRef` on `Radio`
- **Select** — styled native select, `forwardRef`, label, placeholder, 3 sizes, error state, helper text, `aria-describedby`
- **Button** — 4 variants (`primary`, `secondary`, `ghost`, `danger`), 3 sizes, `isLoading` spinner, `leftIcon`/`rightIcon` slots, `fullWidth`, `forwardRef`
- **Input** — floating label, prefix/suffix addons, `helperText`, error state, `forwardRef`
- **Textarea** — auto-resize, character count with `maxLength`, error state, `forwardRef`
- **Badge** — 6 variants, dot indicator, removable pill with `onRemove`
- **Avatar** — image, initials fallback, status ring, `AvatarGroup` with overlap and overflow count
- **Card** — compound API (`Card.Header`, `Card.Body`, `Card.Footer`, `Card.Image`), 3 variants (`elevated`, `outlined`, `filled`), `isHoverable`, `isClickable`, `forwardRef`
- **Modal** — `createPortal`, focus trap, body scroll lock, scrollbar width compensation, `Escape` key close, 5 sizes, `isCentered`
- **Toast** — `ToastProvider` + `useToast` context API, 4 variants, progress bar, pause-on-hover, stacking, `dismissAll`
- **Tooltip** — 4 placements, open/close delay, keyboard accessible, arrow indicator
- **Toggle** — `role="switch"`, spring-physics thumb, 3 sizes, left/right label slots, `forwardRef`

#### Foundation
- Full design token system in `src/styles/tokens.css` — color ramps, semantic aliases, spacing scale, typography, radius, elevation, motion tokens, light and dark themes via `[data-theme="dark"]`
- Global CSS reset in `src/styles/global.css`
- Utility functions: `cn` (class merging), `useId` (stable ARIA IDs), `useFocusTrap`, `useTooltip`
- Public API barrel export in `src/index.ts` — all components and TypeScript types

#### Storybook
- Storybook 7 with autodocs, `argTypes` controls, and multiple stories per component
- `Introduction.stories.mdx` — color palette swatches, spacing scale, typography samples, component inventory
- Custom global theme toolbar toggle (light/dark) wired to `data-theme` attribute and preview background
- `@storybook/addon-a11y` — accessibility panel with WCAG rule checks on every story
- `@storybook/addon-essentials` — controls, actions, viewport, backgrounds, toolbars, docs

#### Tests
- 53 unit tests across all 10 components using Vitest + React Testing Library + `@testing-library/jest-dom`
- Coverage: v8 provider, HTML + JSON + Clover reports

#### Portfolio Landing Page
- Animated single-page portfolio (`src/App.tsx`) showcasing the library
- Scroll-aware nav, mobile hamburger menu, component category filter, section entrance reveal
- Framer Motion floating UI preview cards in hero section
- All links wired: Storybook, GitHub, per-component Storybook paths
- WCAG-compliant: `aria-label`, `aria-expanded`, `aria-controls`, `role`, `tabIndex`, keyboard navigation
- `prefers-reduced-motion` support, `@media (hover: none)` touch device support

---

[Unreleased]: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/releases/tag/v0.1.0
