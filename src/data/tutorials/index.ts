import { catCountingTutorial } from './cat-counting';
import type { Tutorial } from './types';

export const tutorials: Tutorial[] = [
  catCountingTutorial,
  // Future tutorials can be added here
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
