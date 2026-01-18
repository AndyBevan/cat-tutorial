/**
 * Cat character data for the counting tutorial content
 * Based on data-model.md specification
 */

/** Represents cat characters for the counting tutorial content */
export interface Cat {
  /** Cat identifier */
  id: 'cat-1' | 'cat-2' | 'cat-3';

  /** Display name */
  name: string;

  /** Current location (for tutorial narrative) */
  location: 'upstairs' | 'basement' | 'unknown';

  /** Personality trait for humor */
  personality: string;
}

/** The three cats for the counting tutorial */
export const CATS: Cat[] = [
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
];

/** Get a cat by ID */
export function getCatById(id: Cat['id']): Cat | undefined {
  return CATS.find((cat) => cat.id === id);
}

/** Get all cat names */
export function getCatNames(): string[] {
  return CATS.map((cat) => cat.name);
}
