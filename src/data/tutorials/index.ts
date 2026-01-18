/**
 * Tutorial Data Index
 *
 * This file serves as the central registry for all tutorials in the application.
 * The architecture is designed to make adding new tutorials straightforward.
 *
 * ## Adding a New Tutorial
 *
 * To add a new tutorial to the site, follow these steps:
 *
 * 1. Create a new tutorial data file in `src/data/tutorials/`:
 *    ```
 *    src/data/tutorials/your-tutorial-name.ts
 *    ```
 *
 * 2. Define your tutorial using the Tutorial interface:
 *    ```typescript
 *    import type { Tutorial } from './types';
 *
 *    export const yourTutorial: Tutorial = {
 *      id: 'your-tutorial-name',  // URL-safe slug (lowercase, hyphens only)
 *      title: 'Your Tutorial Title',
 *      description: 'A short, humorous description',
 *      difficulty: 'easy' | 'medium' | 'hard' | 'impossible',
 *      estimatedMinutes: 5,  // optional
 *      steps: [
 *        {
 *          number: 1,
 *          title: 'Step 1: Getting Started',
 *          content: 'Your step content here...',
 *          tips: ['Optional helpful tips'],
 *          interactiveElement: { ... },  // optional
 *        },
 *        // ... more steps (minimum 2 required)
 *      ],
 *    };
 *    ```
 *
 * 3. Import and register it in this file:
 *    ```typescript
 *    import { yourTutorial } from './your-tutorial-name';
 *
 *    export const tutorials: Tutorial[] = [
 *      catCountingTutorial,
 *      yourTutorial,  // Add here
 *    ];
 *    ```
 *
 * 4. Rebuild the site - the tutorial will automatically:
 *    - Appear on the homepage
 *    - Have its own page at /tutorials/your-tutorial-name
 *    - Be included in static generation
 *
 * ## Validation Rules
 *
 * - `id`: Must be URL-safe (lowercase letters, numbers, hyphens only)
 * - `title`: Maximum 60 characters
 * - `description`: Maximum 200 characters
 * - `steps`: Minimum 2 steps required
 * - `steps[].number`: Must be sequential starting at 1
 *
 * ## Interactive Elements
 *
 * Each step can include ONE interactive element (see types.ts):
 * - ButtonElement: Simple button to advance/complete
 * - QuizElement: Multiple choice question
 * - ClickableAreaElement: Click-to-complete interaction
 *
 * @see ./types.ts for complete type definitions
 * @see ./cat-counting.ts for a working example
 */

import { catCountingTutorial } from './cat-counting';
import type { Tutorial } from './types';

/**
 * Registry of all tutorials available in the application.
 * Add new tutorials to this array after importing them.
 */
export const tutorials: Tutorial[] = [
  catCountingTutorial,
  // To add a new tutorial:
  // 1. Create a file like ./new-tutorial.ts
  // 2. Import it above: import { newTutorial } from './new-tutorial';
  // 3. Add it here: newTutorial,
];

/**
 * Get a tutorial by its URL slug
 * @param slug - The URL slug (tutorial id)
 * @returns The tutorial or undefined if not found
 */
export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.id === slug);
}

/**
 * Get all tutorial slugs for static generation
 * @returns Array of all tutorial slugs
 */
export function getAllTutorialSlugs(): string[] {
  return tutorials.map((t) => t.id);
}

// Re-export types for convenience
export type { Tutorial, TutorialStep, InteractiveElement } from './types';
