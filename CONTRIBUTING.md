# Contributing to MyUI

Thank you for your interest in improving MyUI. This document describes how to add components, write stories, write tests, and keep the codebase consistent.

---

## Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
npm install
npm run storybook   # Component development at localhost:6006
npm run dev         # Portfolio page at localhost:5173
```

---

## Project Structure

```
src/
├── components/ComponentName/
│   ├── index.tsx           # Component source
│   ├── styles.module.css   # Scoped CSS using tokens
│   ├── stories.tsx         # Storybook stories
│   ├── stories.module.css  # Story layout helpers
│   └── test.tsx            # Vitest + RTL tests
├── styles/
│   ├── tokens.css          # Design token definitions (light + dark)
│   └── global.css          # Base reset
├── utils/                  # Shared hooks and helpers
└── index.ts                # Public API barrel export
```

---

## Adding a New Component

### 1. Create the folder

```
src/components/MyComponent/
├── index.tsx
├── styles.module.css
├── stories.tsx
├── stories.module.css   (optional, for story layouts)
└── test.tsx
```

### 2. Implementation checklist

- [ ] Export a named component (`export const MyComponent = ...`)
- [ ] Use `forwardRef` if the component renders a focusable or measurable DOM element
- [ ] Type props with an `interface` that `extends` the relevant HTML attributes where appropriate
- [ ] Export your props type: `export type { MyComponentProps }`
- [ ] Set `displayName` on `forwardRef` components
- [ ] Use tokens from `tokens.css` for all colors, spacing, radius, shadow, and transitions — no hardcoded values
- [ ] Add all required ARIA attributes (`role`, `aria-label`, `aria-expanded`, `aria-controls`, etc.)
- [ ] Handle keyboard interactions (`Enter`, `Space`, `Escape`, `Arrow` keys) where applicable
- [ ] Use `useId` from `@utils/useId` to generate stable ARIA IDs (for `aria-labelledby`, `aria-describedby`)
- [ ] Add `:focus-visible` outline styles — never remove `outline` without a replacement

### 3. Styles

All styles must use CSS Modules (`styles.module.css`). Token usage:

```css
/* ✅ Correct */
.button {
  background: var(--color-brand-default);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  transition: background var(--transition-fast);
}

/* ❌ Incorrect */
.button {
  background: #546ea9;
  padding: 12px 24px;
}
```

### 4. Stories

Every story file must:

- Set `tags: ['autodocs']` in the `meta` object
- Define `argTypes` with `control` types for all props
- Wire `onClick` and similar handlers to `action: 'actionName'`
- Include at minimum: a default story, a variants showcase, and an edge case story (disabled, loading, empty state)

```ts
const meta = {
  title: "Components/MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  args: { /* default args */ },
  argTypes: {
    variant: { control: "select", options: ["a", "b"] },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof MyComponent>;
```

### 5. Tests

All tests go in `test.tsx` and use Vitest + React Testing Library. Required coverage:

- [ ] Each prop variant renders correctly (use `it.each`)
- [ ] Event handlers fire on user interaction
- [ ] Event handlers do NOT fire when disabled/loading
- [ ] `forwardRef` passes `ref` to the DOM element
- [ ] Keyboard interactions work correctly
- [ ] ARIA attributes are present and correct

```bash
npm run test             # run all tests
npm run test:coverage    # run with coverage report
```

### 6. Export from the public API

Add your component and type exports to `src/index.ts`:

```ts
export { MyComponent } from "@components/MyComponent";
export type { MyComponentProps } from "@components/MyComponent";
```

---

## Design Token Rules

1. **Never hardcode** colors, spacing, or radius values. Always reference a token.
2. **Add tokens to `tokens.css`** if you need a new value — not inline styles.
3. **Both themes** must be updated when adding a new semantic token (`:root` and `[data-theme="dark"]`).
4. **Token naming convention**: `--category-variant-scale` (e.g., `--color-brand-600`, `--space-4`, `--radius-md`).

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(Badge): add removable pill variant
fix(Modal): restore focus to trigger on close
docs(Toggle): add keyboard interaction story
test(Input): cover validation error state
chore: upgrade Storybook to 7.6.24
```

---

## Pull Request Checklist

Before opening a PR:

- [ ] `npm run type-check` passes with zero errors
- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run test` passes — all tests green
- [ ] `npm run build` succeeds
- [ ] `npm run build-storybook` succeeds
- [ ] New component is exported from `src/index.ts`
- [ ] `CHANGELOG.md` updated under `[Unreleased]`

---

## Code Style

- Prefer `const` over `let`; avoid `var`
- Use named exports, not default exports for components
- Keep component files focused — no more than one exported component per `index.tsx`
- Avoid `any` — use `unknown` and narrow the type
- Comments should explain *why*, not *what*. If the code is clear, no comment is needed.
