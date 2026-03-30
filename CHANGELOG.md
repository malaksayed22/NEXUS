# Changelog

All notable changes to NEXUS are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Story `play` functions with `@storybook/addon-interactions`
- `Combobox` â€” searchable accessible Select

---

## [0.1.0] â€” 2026-03-30

### Added

#### Components
- **Spinner** â€” 5 sizes (`xs`â€“`xl`), `aria-label`, `role="status"`, `prefers-reduced-motion` support, `forwardRef`
- **Checkbox** â€” controlled, `indeterminate` state (via DOM effect), 3 sizes, error state, helper text, `forwardRef`
- **Radio / RadioGroup** â€” `RadioContext` compound pattern, group-level + individual `disabled`, `helperText`, `forwardRef` on `Radio`
- **Select** â€” styled native select, `forwardRef`, label, placeholder, 3 sizes, error state, helper text, `aria-describedby`
- **Button** â€” 4 variants (`primary`, `secondary`, `ghost`, `danger`), 3 sizes, `isLoading` spinner, `leftIcon`/`rightIcon` slots, `fullWidth`, `forwardRef`
- **Input** â€” floating label, prefix/suffix addons, `helperText`, error state, `forwardRef`
- **Textarea** â€” auto-resize, character count with `maxLength`, error state, `forwardRef`
- **Badge** â€” 6 variants, dot indicator, removable pill with `onRemove`
- **Avatar** â€” image, initials fallback, status ring, `AvatarGroup` with overlap and overflow count
- **Card** â€” compound API (`Card.Header`, `Card.Body`, `Card.Footer`, `Card.Image`), 3 variants (`elevated`, `outlined`, `filled`), `isHoverable`, `isClickable`, `forwardRef`
- **Modal** â€” `createPortal`, focus trap, body scroll lock, scrollbar width compensation, `Escape` key close, 5 sizes, `isCentered`
- **Toast** â€” `ToastProvider` + `useToast` context API, 4 variants, progress bar, pause-on-hover, stacking, `dismissAll`
- **Tooltip** â€” 4 placements, open/close delay, keyboard accessible, arrow indicator
- **Toggle** â€” `role="switch"`, spring-physics thumb, 3 sizes, left/right label slots, `forwardRef`

#### Foundation
- Full design token system in `src/styles/tokens.css` â€” color ramps, semantic aliases, spacing scale, typography, radius, elevation, motion tokens, light and dark themes via `[data-theme="dark"]`
- Global CSS reset in `src/styles/global.css`
- Utility functions: `cn` (class merging), `useId` (stable ARIA IDs), `useFocusTrap`, `useTooltip`
- Public API barrel export in `src/index.ts` â€” all components and TypeScript types

#### Storybook
- Storybook 7 with autodocs, `argTypes` controls, and multiple stories per component
- `Introduction.stories.mdx` â€” color palette swatches, spacing scale, typography samples, component inventory
- Custom global theme toolbar toggle (light/dark) wired to `data-theme` attribute and preview background
- `@storybook/addon-a11y` â€” accessibility panel with WCAG rule checks on every story
- `@storybook/addon-essentials` â€” controls, actions, viewport, backgrounds, toolbars, docs

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

