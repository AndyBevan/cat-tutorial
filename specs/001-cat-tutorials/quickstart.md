# Quickstart: Cat Tutorial Website

**Feature Branch**: `001-cat-tutorials`
**Date**: 2026-01-18

---

## Overview

This document provides integration scenarios and quick-reference guides for the Cat Tutorial website development.

---

## User Journeys

### Journey 1: First-Time Visitor Discovery

**Scenario**: A visitor arrives at the Cat Tutorial website for the first time.

```
1. User navigates to homepage
   → Sees whimsical header with cat-themed branding
   → Sees "Count the Cats" tutorial card with humorous description

2. User clicks tutorial card
   → Navigates to /tutorials/cat-counting
   → Sees tutorial introduction with animated cat characters

3. User begins tutorial
   → Progresses through steps with Next/Previous buttons
   → Interacts with quiz elements and clickable areas

4. User completes tutorial
   → Sees celebration animation (confetti)
   → Views humorous completion certificate
   → Can return to homepage or restart
```

### Journey 2: Deep Link to Tutorial Step

**Scenario**: User receives a link to a specific tutorial step.

```
1. User opens /tutorials/cat-counting?step=3
   → Tutorial loads directly at Step 3
   → Progress indicator shows "Step 3 of 5"

2. User can navigate backward
   → Previous button available
   → Can reach Step 1 from any step

3. User can navigate forward
   → Next button advances through remaining steps
   → Completion available from any starting point
```

### Journey 3: Mobile Experience

**Scenario**: User visits on a 320px wide mobile device.

```
1. Homepage loads responsively
   → Tutorial cards stack vertically
   → Touch-friendly tap targets (44px+)

2. Tutorial navigation adapts
   → Step content fills screen width
   → Navigation buttons prominent and reachable

3. Animations perform smoothly
   → 60fps on mobile devices
   → Reduced motion respected if OS setting enabled
```

---

## Component Integration Map

```
                    ┌─────────────────┐
                    │   RootLayout    │
                    │  (MotionConfig) │
                    └────────┬────────┘
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
    ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
    │  HomePage   │   │ TutorialPage│   │  NotFound   │
    │             │   │  [slug]     │   │    404      │
    └──────┬──────┘   └──────┬──────┘   └─────────────┘
           │                 │
    ┌──────▼──────┐   ┌──────▼──────┐
    │ TutorialCard│   │ TutorialStep│
    │   (list)    │   │             │
    └─────────────┘   └──────┬──────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
       ┌──────▼──────┐ ┌─────▼─────┐ ┌──────▼──────┐
       │StepNavigation│ │Interactive│ │ Completion  │
       │             │ │ Element   │ │ Certificate │
       └─────────────┘ └───────────┘ └─────────────┘
```

---

## Key Integration Points

### 1. Data Loading (Static Generation)

```typescript
// src/app/tutorials/[slug]/page.tsx
import { getTutorialBySlug, getAllTutorialSlugs } from '@/data/tutorials'

// Pre-generate all tutorial pages at build time
export async function generateStaticParams() {
  return getAllTutorialSlugs().map((slug) => ({ slug }))
}

// Page component receives slug from params
export default function TutorialPage({ params }: { params: { slug: string } }) {
  const tutorial = getTutorialBySlug(params.slug)
  if (!tutorial) notFound()
  return <TutorialContent tutorial={tutorial} />
}
```

### 2. Animation Context

```typescript
// src/app/layout.tsx
import { MotionConfig } from 'framer-motion'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  )
}
```

### 3. Tutorial Progress Hook

```typescript
// src/hooks/useTutorialProgress.ts
export function useTutorialProgress(tutorial: Tutorial) {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => setCurrentStep(prev =>
    Math.min(prev + 1, tutorial.steps.length - 1)
  )

  const previousStep = () => setCurrentStep(prev =>
    Math.max(prev - 1, 0)
  )

  const isCompleted = currentStep === tutorial.steps.length - 1

  return { currentStep, nextStep, previousStep, isCompleted }
}
```

### 4. Page Transitions

```typescript
// src/components/animations/PageTransition.tsx
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → Opens http://localhost:3000

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Build for production (static export)
npm run build
# → Outputs to /out directory

# Preview production build locally
npx serve out

# Type check
npm run type-check

# Lint
npm run lint
```

---

## Environment Configuration

```env
# .env.local (development)
NEXT_PUBLIC_BASE_PATH=

# .env.production (GitHub Pages)
NEXT_PUBLIC_BASE_PATH=/cat-tutorial
```

---

## GitHub Pages Deployment

### Manual Deployment

```bash
# Build static export
npm run build

# Deploy to gh-pages branch
npx gh-pages -d out
```

### Automated Deployment (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
      - uses: actions/deploy-pages@v4
```

---

## Testing Scenarios

### Component Test: TutorialCard

```typescript
describe('TutorialCard', () => {
  it('displays tutorial metadata', () => {
    render(<TutorialCard tutorial={mockTutorial} onSelect={jest.fn()} />)

    expect(screen.getByText('Count the Cats')).toBeInTheDocument()
    expect(screen.getByText(/impossible/i)).toBeInTheDocument()
  })

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn()
    render(<TutorialCard tutorial={mockTutorial} onSelect={onSelect} />)

    fireEvent.click(screen.getByRole('button'))

    expect(onSelect).toHaveBeenCalledWith('cat-counting')
  })
})
```

### Integration Test: Tutorial Navigation

```typescript
describe('Tutorial Navigation', () => {
  it('progresses through all steps', () => {
    render(<TutorialPage params={{ slug: 'cat-counting' }} />)

    // Start at step 1
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument()

    // Navigate forward
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/Step 2 of/)).toBeInTheDocument()

    // Navigate backward
    fireEvent.click(screen.getByRole('button', { name: /previous/i }))
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument()
  })
})
```

---

## Adding a New Tutorial

1. Create tutorial data file:
   ```typescript
   // src/data/tutorials/new-tutorial.ts
   import type { Tutorial } from './types'

   export const newTutorial: Tutorial = {
     id: 'new-tutorial',
     title: 'New Tutorial Title',
     description: 'Humorous description',
     difficulty: 'medium',
     steps: [/* ... */]
   }
   ```

2. Register in index:
   ```typescript
   // src/data/tutorials/index.ts
   import { newTutorial } from './new-tutorial'

   export const tutorials: Tutorial[] = [
     catCountingTutorial,
     newTutorial,  // Add here
   ]
   ```

3. Tutorial automatically appears on homepage and generates static page.

---

## Common Issues

| Issue | Solution |
|-------|----------|
| CSS not loading on GitHub Pages | Ensure `assetPrefix` has trailing slash |
| 404 on direct navigation | Check `trailingSlash: true` in config |
| Animations janky on mobile | Verify only using transform/opacity |
| Tests failing with animation | Wrap in `MotionConfig reducedMotion="always"` |
| Images not found | Check paths use `basePath` prefix |
