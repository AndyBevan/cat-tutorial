# Data Model: Cat Tutorial Website

**Feature Branch**: `001-cat-tutorials`
**Date**: 2026-01-18

---

## Overview

This document defines the TypeScript data structures for the Cat Tutorial website. Since the site is fully static with no backend, these types define the structure of tutorial content stored in TypeScript data files.

---

## Core Entities

### Tutorial

A complete training session consisting of metadata and ordered steps.

```typescript
interface Tutorial {
  /** Unique identifier used in URL slug */
  id: string;

  /** Display title shown on homepage and tutorial page */
  title: string;

  /** Short humorous description for homepage card */
  description: string;

  /** Tongue-in-cheek difficulty indicator */
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible';

  /** Ordered list of tutorial steps */
  steps: TutorialStep[];

  /** Optional icon/image identifier for homepage display */
  icon?: string;

  /** Estimated completion time (displayed, not enforced) */
  estimatedMinutes?: number;
}
```

**Validation Rules:**
- `id` must be URL-safe (lowercase, hyphens only)
- `title` maximum 60 characters
- `description` maximum 200 characters
- `steps` must have at least 2 items
- `steps` must have sequential `number` values starting at 1

**Example:**
```typescript
const catCountingTutorial: Tutorial = {
  id: 'cat-counting',
  title: 'Count the Cats',
  description: 'Master the impossible art of counting three identical black cats.',
  difficulty: 'impossible',
  estimatedMinutes: 5,
  steps: [/* ... */],
}
```

---

### TutorialStep

A single page of content within a tutorial.

```typescript
interface TutorialStep {
  /** Step number (1-indexed, sequential) */
  number: number;

  /** Step title displayed at top of step */
  title: string;

  /** Main content - supports markdown-like formatting */
  content: string;

  /** Humorous tips displayed in sidebar or callout */
  tips?: string[];

  /** Optional interactive element for engagement */
  interactiveElement?: InteractiveElement;

  /** Optional image to display with step */
  image?: StepImage;

  /** Marks this as the completion step (shows certificate) */
  isCompletionStep?: boolean;
}
```

**Validation Rules:**
- `number` must be positive integer
- `title` maximum 80 characters
- `content` required, minimum 10 characters
- `tips` maximum 5 items, each max 150 characters

**Example:**
```typescript
const step1: TutorialStep = {
  number: 1,
  title: 'Step 1: Locate All Visible Cats',
  content: 'Before you can count the cats, you must first find them. This is harder than it sounds when dealing with three identical black cats who may or may not be in the same dimension.',
  tips: [
    'Check sunny spots first - cats are solar-powered',
    'Listen for suspicious purring',
    'The basement counts as a separate universe',
  ],
  interactiveElement: {
    type: 'button',
    label: 'I found some cats!',
    action: 'next',
  },
}
```

---

### InteractiveElement

Optional interactive component within a tutorial step.

```typescript
type InteractiveElement =
  | ButtonElement
  | QuizElement
  | ClickableAreaElement;

interface ButtonElement {
  type: 'button';
  /** Button label text */
  label: string;
  /** Action when clicked */
  action: 'next' | 'previous' | 'complete';
  /** Optional variant for styling */
  variant?: 'primary' | 'secondary' | 'celebration';
}

interface QuizElement {
  type: 'quiz';
  /** Question text */
  question: string;
  /** Answer options */
  options: string[];
  /** Index of correct answer (all answers accepted for humor) */
  correctIndex?: number;
  /** Response shown after any selection */
  response: string;
}

interface ClickableAreaElement {
  type: 'clickable-area';
  /** Instruction text */
  instruction: string;
  /** Number of clicks required */
  targetClicks: number;
  /** Message shown after completing clicks */
  completionMessage: string;
}
```

**Examples:**
```typescript
// Quiz element
const quizElement: QuizElement = {
  type: 'quiz',
  question: 'How many cats are upstairs right now?',
  options: ['0', '1', '2', '3', 'Impossible to know'],
  correctIndex: 4, // They're all correct, really
  response: 'Excellent guess! The true answer is unknowable.',
}

// Clickable area element
const clickElement: ClickableAreaElement = {
  type: 'clickable-area',
  instruction: 'Click to pet each cat you see',
  targetClicks: 3,
  completionMessage: 'All cats have been adequately appreciated!',
}
```

---

### StepImage

Image display configuration for tutorial steps.

```typescript
interface StepImage {
  /** Path to image in public directory */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption below image */
  caption?: string;
  /** Display position relative to content */
  position?: 'above' | 'below' | 'inline';
}
```

---

### Cat (Content Entity)

Represents cat characters for the counting tutorial content.

```typescript
interface Cat {
  /** Cat identifier */
  id: 'cat-1' | 'cat-2' | 'cat-3';

  /** Display name */
  name: string;

  /** Current location (for tutorial narrative) */
  location: 'upstairs' | 'basement' | 'unknown';

  /** Personality trait for humor */
  personality: string;
}

// The three cats for the counting tutorial
const CATS: Cat[] = [
  {
    id: 'cat-1',
    name: 'Shadow',
    location: 'unknown',
    personality: 'The one who always hides in the darkest corner',
  },
  {
    id: 'cat-2',
    name: 'Midnight',
    location: 'unknown',
    personality: 'Teleports when you blink',
  },
  {
    id: 'cat-3',
    name: 'Void',
    location: 'unknown',
    personality: 'May or may not exist until observed',
  },
]
```

---

## State Types

### TutorialProgress

Client-side state for tracking tutorial navigation (not persisted).

```typescript
interface TutorialProgress {
  /** Current tutorial ID */
  tutorialId: string;

  /** Current step number (1-indexed) */
  currentStep: number;

  /** Total steps in tutorial */
  totalSteps: number;

  /** Whether tutorial is completed */
  isCompleted: boolean;
}
```

---

## Data File Structure

Tutorial content is stored in TypeScript files for type safety:

```
src/data/
├── tutorials/
│   ├── index.ts              # Exports all tutorials
│   ├── cat-counting.ts       # Cat counting tutorial content
│   └── types.ts              # Type definitions (above)
└── cats.ts                   # Cat character data
```

**Index file pattern:**
```typescript
// src/data/tutorials/index.ts
import { catCountingTutorial } from './cat-counting'
import type { Tutorial } from './types'

export const tutorials: Tutorial[] = [
  catCountingTutorial,
  // Future tutorials added here
]

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find(t => t.id === slug)
}

export function getAllTutorialSlugs(): string[] {
  return tutorials.map(t => t.id)
}
```

---

## Relationships

```
Tutorial (1) ──────┬────── (many) TutorialStep
                   │
TutorialStep (1) ──┼────── (0..1) InteractiveElement
                   │
TutorialStep (1) ──┴────── (0..1) StepImage
```

---

## Notes

- All data is compile-time static; no runtime database
- TypeScript enforces schema at build time
- Tutorial IDs must match URL slugs for `generateStaticParams()`
- Future tutorials follow same structure for extensibility (FR-011)
