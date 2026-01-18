import { render, screen, fireEvent } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { TutorialStep } from '@/components/tutorial/TutorialStep';
import type { TutorialStep as TutorialStepType } from '@/data/tutorials/types';

const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">{component}</MotionConfig>
  );
};

const mockStep: TutorialStepType = {
  number: 1,
  title: 'Step 1: Locate All Visible Cats',
  content: 'Before you can count the cats, you must first find them.',
  tips: [
    'Check sunny spots first',
    'Listen for suspicious purring',
  ],
  interactiveElement: {
    type: 'button',
    label: 'I found some cats!',
    action: 'next',
  },
};

describe('TutorialStep', () => {
  const mockOnNext = jest.fn();
  const mockOnPrevious = jest.fn();
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays step title', () => {
    renderWithMotion(
      <TutorialStep
        step={mockStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );
    expect(screen.getByText('Step 1: Locate All Visible Cats')).toBeInTheDocument();
  });

  it('displays step content', () => {
    renderWithMotion(
      <TutorialStep
        step={mockStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );
    expect(screen.getByText(/Before you can count the cats/)).toBeInTheDocument();
  });

  it('displays tips when provided', () => {
    renderWithMotion(
      <TutorialStep
        step={mockStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );
    expect(screen.getByText('Check sunny spots first')).toBeInTheDocument();
    expect(screen.getByText('Listen for suspicious purring')).toBeInTheDocument();
  });

  it('renders button interactive element and calls onNext', () => {
    renderWithMotion(
      <TutorialStep
        step={mockStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    const button = screen.getByRole('button', { name: 'I found some cats!' });
    fireEvent.click(button);
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('renders quiz interactive element', () => {
    const quizStep: TutorialStepType = {
      number: 2,
      title: 'Step 2: Quiz Time',
      content: 'Answer this question.',
      interactiveElement: {
        type: 'quiz',
        question: 'How many cats are upstairs?',
        options: ['0', '1', '2', '3'],
        response: 'Great guess!',
      },
    };

    renderWithMotion(
      <TutorialStep
        step={quizStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('How many cats are upstairs?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
  });

  it('shows quiz response after selecting an option', () => {
    const quizStep: TutorialStepType = {
      number: 2,
      title: 'Step 2: Quiz Time',
      content: 'Answer this question.',
      interactiveElement: {
        type: 'quiz',
        question: 'How many cats are upstairs?',
        options: ['0', '1', '2', '3'],
        response: 'Great guess!',
      },
    };

    renderWithMotion(
      <TutorialStep
        step={quizStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: '1' }));
    expect(screen.getByText('Great guess!')).toBeInTheDocument();
  });

  it('renders clickable-area interactive element', () => {
    const clickableStep: TutorialStepType = {
      number: 3,
      title: 'Step 3: Click the Cats',
      content: 'Click to count the cats.',
      interactiveElement: {
        type: 'clickable-area',
        instruction: 'Click to pet each cat',
        targetClicks: 3,
        completionMessage: 'All cats petted!',
      },
    };

    renderWithMotion(
      <TutorialStep
        step={clickableStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.getByText('Click to pet each cat')).toBeInTheDocument();
  });

  it('tracks clicks and shows completion message', () => {
    const clickableStep: TutorialStepType = {
      number: 3,
      title: 'Step 3: Click the Cats',
      content: 'Click to count the cats.',
      interactiveElement: {
        type: 'clickable-area',
        instruction: 'Click to pet each cat',
        targetClicks: 3,
        completionMessage: 'All cats petted!',
      },
    };

    renderWithMotion(
      <TutorialStep
        step={clickableStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    const clickArea = screen.getByRole('button', { name: /click to pet/i });
    fireEvent.click(clickArea);
    fireEvent.click(clickArea);
    fireEvent.click(clickArea);

    expect(screen.getByText('All cats petted!')).toBeInTheDocument();
  });

  it('calls onComplete when button with complete action is clicked', () => {
    const completeStep: TutorialStepType = {
      number: 5,
      title: 'Congratulations!',
      content: 'You completed the tutorial!',
      isCompletionStep: true,
      interactiveElement: {
        type: 'button',
        label: 'Claim My Certificate',
        action: 'complete',
        variant: 'celebration',
      },
    };

    renderWithMotion(
      <TutorialStep
        step={completeStep}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Claim My Certificate' }));
    expect(mockOnComplete).toHaveBeenCalledTimes(1);
  });

  it('does not display tips when not provided', () => {
    const stepWithoutTips: TutorialStepType = {
      number: 1,
      title: 'Step Without Tips',
      content: 'No tips here.',
    };

    renderWithMotion(
      <TutorialStep
        step={stepWithoutTips}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
        onComplete={mockOnComplete}
      />
    );

    expect(screen.queryByText(/Pro Tip/i)).not.toBeInTheDocument();
  });
});
