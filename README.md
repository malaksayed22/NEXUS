# Strata UI Component Library

Portfolio-focused React component library designed to demonstrate senior-level frontend engineering quality for product teams. Built with React + TypeScript + Storybook, with a strong emphasis on accessibility, motion, token-driven design, and test coverage.

![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-7-FF4785?logo=storybook&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Latest-000000?logo=framer&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)

## Screenshot Placeholder

Add screenshots here when preparing your portfolio case study:

- Storybook introduction page
- Component showcase grid (light + dark)
- Accessibility examples (modal, tooltip, toast)

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Run the app in development mode:

```bash
npm run dev
```

3. Run Storybook:

```bash
npm run storybook
```

4. Run tests:

```bash
npm run test
```

## Deployment (Storybook to Vercel)

1. Build static Storybook output:

```bash
npm run build-storybook
```

2. After build completes, locate the generated folder:

```text
storybook-static/
```

3. Go to Vercel and use drag-and-drop deployment:

- Open the Vercel dashboard
- Choose "Add New Project" or "Deploy"
- Drag and drop the `storybook-static` folder
- Vercel will host it instantly as a static site

## Scripts

- `npm run dev` - Vite dev server
- `npm run build` - production build
- `npm run storybook` - Storybook on port 6006
- `npm run build-storybook` - static Storybook export
- `npm run test` - Vitest test run
- `npm run test:coverage` - Vitest with coverage
- `npm run type-check` - TypeScript no-emit checks
