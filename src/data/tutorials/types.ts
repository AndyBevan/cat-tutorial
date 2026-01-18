/**
 * Type definitions for Cat Tutorial Website
 * Based on data-model.md specification
 */

/** A complete training session consisting of metadata and ordered steps */
export interface Tutorial {
  /** Unique identifier used in URL slug (URL-safe: lowercase, hyphens only) */
  id: string;

  /** Display title shown on homepage and tutorial page (max 60 chars) */
  title: string;

  /** Short humorous description for homepage card (max 200 chars) */
  description: string;

  /** Tongue-in-cheek difficulty indicator */
  difficulty: 'easy' | 'medium' | 'hard' | 'impossible';

  /** Ordered list of tutorial steps (min 2 items, sequential numbers starting at 1) */
  steps: TutorialStep[];

  /** Optional icon/image identifier for homepage display */
  icon?: string;

  /** Estimated completion time in minutes (displayed, not enforced) */
  estimatedMinutes?: number;
}

/** A single page of content within a tutorial */
export interface TutorialStep {
  /** Step number (1-indexed, sequential, positive integer) */
  number: number;

  /** Step title displayed at top of step (max 80 chars) */
  title: string;

  /** Main content - supports markdown-like formatting (min 10 chars) */
  content: string;

  /** Humorous tips displayed in sidebar or callout (max 5 items, each max 150 chars) */
  tips?: string[];

  /** Optional interactive element for engagement */
  interactiveElement?: InteractiveElement;

  /** Optional image to display with step */
  image?: StepImage;

  /** Marks this as the completion step (shows certificate) */
  isCompletionStep?: boolean;
}

/** Optional interactive component within a tutorial step */
export type InteractiveElement =
  | ButtonElement
  | QuizElement
  | ClickableAreaElement;

export interface ButtonElement {
  type: 'button';
  /** Button label text */
  label: string;
  /** Action when clicked */
  action: 'next' | 'previous' | 'complete';
  /** Optional variant for styling */
  variant?: 'primary' | 'secondary' | 'celebration';
}

export interface QuizElement {
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

export interface ClickableAreaElement {
  type: 'clickable-area';
  /** Instruction text */
  instruction: string;
  /** Number of clicks required */
  targetClicks: number;
  /** Message shown after completing clicks */
  completionMessage: string;
}

/** Image display configuration for tutorial steps */
export interface StepImage {
  /** Path to image in public directory */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption below image */
  caption?: string;
  /** Display position relative to content */
  position?: 'above' | 'below' | 'inline';
}

/** Client-side state for tracking tutorial navigation (not persisted) */
export interface TutorialProgress {
  /** Current tutorial ID */
  tutorialId: string;

  /** Current step number (1-indexed) */
  currentStep: number;

  /** Total steps in tutorial */
  totalSteps: number;

  /** Whether tutorial is completed */
  isCompleted: boolean;
}
