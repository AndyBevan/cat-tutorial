import type { Tutorial } from './types';

export const catCountingTutorial: Tutorial = {
  id: 'cat-counting',
  title: 'Count the Cats',
  description:
    'Master the impossible art of counting three identical black cats.',
  difficulty: 'impossible',
  estimatedMinutes: 5,
  icon: '🐱',
  steps: [
    {
      number: 1,
      title: 'Step 1: Locate All Visible Cats',
      content:
        "Before you can count the cats, you must first find them. This is harder than it sounds when dealing with three identical black cats who may or may not be in the same dimension.",
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
    },
    {
      number: 2,
      title: 'Step 2: The Quantum Cat Problem',
      content:
        "You've spotted what appears to be cats. But are they THREE cats, or ONE cat moving very fast? This is the fundamental question of cat physics.",
      tips: [
        "If you blink, they've already moved",
        'Cats exist in a superposition until you try to pet them',
        'The answer is always "treats"',
      ],
      interactiveElement: {
        type: 'quiz',
        question: 'How many cats are upstairs right now?',
        options: ['0', '1', '2', '3', 'Impossible to know'],
        correctIndex: 4,
        response: 'Excellent guess! The true answer is unknowable.',
      },
    },
    {
      number: 3,
      title: 'Step 3: The Basement Variable',
      content:
        'Ah, the basement. Where cats go to contemplate their mysteries. Is there a cat down there? Probably. Maybe two. The basement exists outside normal spacetime.',
      tips: [
        'Never trust a cat who claims to be "the only one downstairs"',
        'Basement cats have different counting rules',
        'The basement cat might actually be all three cats',
      ],
      interactiveElement: {
        type: 'clickable-area',
        instruction: 'Click to check the basement',
        targetClicks: 3,
        completionMessage: "You've checked thoroughly! Still uncertain about the count.",
      },
    },
    {
      number: 4,
      title: 'Step 4: The Final Count',
      content:
        'After careful observation, deep contemplation, and probably some treats, you are ready to attempt the final count. Remember: confidence is key, even when wrong.',
      tips: [
        'The correct answer is always "enough cats"',
        'If unsure, add one more cat to be safe',
        'Cats appreciate the effort regardless of accuracy',
      ],
      interactiveElement: {
        type: 'button',
        label: 'I am ready to count!',
        action: 'next',
        variant: 'primary',
      },
    },
    {
      number: 5,
      title: 'Congratulations, Cat Counter!',
      content:
        'You have completed the sacred art of cat counting! Whether you arrived at 3, 7, or "a reasonable amount," you have demonstrated true dedication to feline mathematics.',
      isCompletionStep: true,
      interactiveElement: {
        type: 'button',
        label: 'Claim My Certificate',
        action: 'complete',
        variant: 'celebration',
      },
    },
  ],
};
