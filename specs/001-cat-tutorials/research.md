# Research: Cat Tutorial Website

**Feature Branch**: `001-cat-tutorials`
**Date**: 2026-01-18

---

## 1. Next.js 14+ Static Export for GitHub Pages

### Decision
Use `output: 'export'` in `next.config.js` with `basePath`, `assetPrefix`, and `images.unoptimized: true` configured for GitHub Pages deployment.

### Rationale
- Next.js 14+ removed the `next export` command; `output: 'export'` is the only standard static generation method
- `basePath` + `assetPrefix` are required for GitHub Pages subpath deployment (e.g., `user.github.io/cat-tutorial/`)
- `images.unoptimized: true` is mandatory because image optimization requires a Node.js server
- `.nojekyll` file in `/public` prevents GitHub Pages from processing as Jekyll site

### Configuration Pattern
```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/cat-tutorial',
  assetPrefix: '/cat-tutorial/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
```

### Dynamic Routes
Use `generateStaticParams()` function for dynamic routes (tutorial pages):
```typescript
export async function generateStaticParams() {
  return tutorials.map((t) => ({ slug: t.id }))
}
```

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| Vercel deployment | Overkill for static site; spec requires GitHub Pages |
| Pages Router | App Router is current standard; better for future maintenance |
| No basePath | Would cause CSS/JS 404 errors on GitHub Pages |

---

## 2. Framer Motion Animation Patterns

### Decision
Use Framer Motion with FrozenRouter pattern for page transitions, SVG-based cat character animations with variants, and react-confetti-explosion for celebrations.

### Rationale
- **Page Transitions**: Next.js App Router unmounts components during navigation, breaking exit animations. FrozenRouter + AnimatePresence preserves animation lifecycle.
- **Cat Characters**: SVG with `motion.path` and transform animations integrate well with React; GPU-accelerated transforms (x, y, rotate, scale) ensure 60fps.
- **Celebrations**: react-confetti-explosion is lightweight and works well with AnimatePresence for state-driven triggers.

### Implementation Patterns

**Page Transitions:**
```typescript
<AnimatePresence mode="wait" initial={false}>
  <motion.div key={segment}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <FrozenRouter>{children}</FrozenRouter>
  </motion.div>
</AnimatePresence>
```

**Cat Character Variants:**
```typescript
const catVariants = {
  idle: { rotateZ: 0, y: 0 },
  walk: { x: 300, transition: { duration: 2, ease: "easeInOut" } },
  celebrate: { rotateZ: 360, y: -20, transition: { repeat: Infinity } }
}
```

**Performance Rules:**
- Animate only `transform` and `opacity` (GPU-accelerated)
- Avoid `width`, `height`, `top`, `left` (trigger layout recalc)
- Use `useMotionValue` for values that change during animations

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| GSAP | Larger bundle, different API; Framer Motion sufficient |
| CSS animations | Limited choreography; hard to coordinate with state |
| Lottie | Requires external files; less interactive |

---

## 3. Tailwind CSS Cartoon Aesthetic

### Decision
Use Tailwind CSS v4 with OKLCH colors, aggressive rounding (rounded-3xl+), layered shadows, and custom 320px breakpoint for responsive design.

### Rationale
- **OKLCH Colors**: Tailwind v4's OKLCH color space produces more vibrant colors suited to cartoon aesthetics
- **Aggressive Rounding**: `rounded-3xl` and `rounded-full` create soft, approachable cartoon feel
- **Shadow Depth**: `shadow-lg` to `shadow-2xl` with rounded corners creates polished dimensional appearance
- **320px Breakpoint**: Custom breakpoint ensures cartoon designs work on smallest devices

### Style Patterns
```
Headlines:     text-5xl md:text-6xl font-black
Cards:         rounded-3xl shadow-lg border-4 border-yellow-400
Buttons:       rounded-2xl shadow-md hover:shadow-xl px-6 py-3
```

### Color Palette Strategy
- 2-5 primary colors (primary, secondary, accents)
- High saturation for cartoon vibrancy
- WCAG contrast ratios maintained for accessibility
- Tools: uicolors.app, tailwindcolor.com

### Responsive Configuration
```javascript
// tailwind.config.js
theme: {
  screens: {
    'xs': '320px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
  }
}
```

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| CSS-in-JS | More bundle size; Tailwind sufficient for static site |
| Styled Components | Additional runtime; not needed for this scope |
| Plain CSS | Harder to maintain responsive styles |

---

## 4. Testing Strategy

### Decision
Use Jest + React Testing Library with next/jest configuration, MotionConfig for animation testing, and TypeScript fixtures for static data mocking.

### Rationale
- **next/jest**: Built-in Next.js support eliminates manual configuration
- **MotionConfig reducedMotion="always"**: Disables animations in tests for speed
- **TypeScript fixtures**: No network requests in static site; fixtures mirror production data structure
- **60/30/10 ratio**: 60% integration, 30% unit, 10% E2E for optimal coverage

### Configuration Pattern
```typescript
// jest.config.js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
```

### Animation Testing Strategy
```typescript
// Wrap tests with instant animations
const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">
      {component}
    </MotionConfig>
  )
}
```

### Test Boundary Rules
- **Unit**: Single component, mocked dependencies
- **Integration**: 2-3 components together with real interactions
- **Page**: Full tutorial page with all children

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| Vitest | Less mature Next.js ecosystem support |
| MSW | Overkill for static site with no API calls |
| Cypress | E2E scope; Jest sufficient for component tests |

---

## 5. Accessibility

### Decision
Implement `useReducedMotion` hook and `MotionConfig reducedMotion="user"` for respecting OS accessibility settings.

### Rationale
- Users with vestibular disorders are sensitive to motion; transform animations can trigger discomfort
- `prefers-reduced-motion` media query respects OS accessibility settings
- Opacity transitions are safe for reduced motion users; transforms should be disabled

### Implementation
```typescript
// At app root
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>

// In components for fine-grained control
const shouldReduceMotion = useReducedMotion()
const animation = shouldReduceMotion
  ? { opacity: [0, 1] }      // Fade only
  : { x: 300, opacity: 1 }   // Full motion
```

### Accessibility Checklist
- Page transition duration under 1 second
- Focus management during modal animations
- Color + size variation in celebrations (not just color)
- Keyboard navigation works during animations
- All interactive elements have 44x44px minimum touch target

---

## Dependencies Summary

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14+ | Framework with static export |
| react | 18+ | UI library |
| framer-motion | 11+ | Animations |
| tailwindcss | 4+ | Styling with OKLCH colors |
| react-confetti-explosion | 2+ | Celebration effects |
| jest | 29+ | Testing framework |
| @testing-library/react | 16+ | Component testing |

---

## Sources

- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports)
- [Framer Motion Accessibility](https://motion.dev/docs/react-accessibility)
- [Tailwind CSS v4 OKLCH Colors](https://tailwindcolor.com/)
- [Next.js Testing Documentation](https://nextjs.org/docs/pages/guides/testing/jest)
- [React Testing Library Best Practices](https://testing-library.com/docs/react-testing-library/example-intro/)
