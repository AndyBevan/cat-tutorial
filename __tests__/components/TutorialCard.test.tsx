import { render, screen, fireEvent } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import type { Tutorial } from '@/data/tutorials/types';

const mockTutorial: Tutorial = {
  id: 'cat-counting',
  title: 'Count the Cats',
  description: 'Master the art of counting three identical black cats.',
  difficulty: 'impossible',
  estimatedMinutes: 5,
  steps: [
    { number: 1, title: 'Step 1', content: 'Test content step 1' },
    { number: 2, title: 'Step 2', content: 'Test content step 2' },
  ],
};

const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">{component}</MotionConfig>
  );
};

describe('TutorialCard', () => {
  it('displays tutorial title', () => {
    renderWithMotion(<TutorialCard tutorial={mockTutorial} />);
    expect(screen.getByText('Count the Cats')).toBeInTheDocument();
  });

  it('displays tutorial description', () => {
    renderWithMotion(<TutorialCard tutorial={mockTutorial} />);
    expect(
      screen.getByText(/Master the art of counting/)
    ).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    renderWithMotion(<TutorialCard tutorial={mockTutorial} />);
    expect(screen.getByText(/impossible/i)).toBeInTheDocument();
  });

  it('displays estimated time when provided', () => {
    renderWithMotion(<TutorialCard tutorial={mockTutorial} />);
    expect(screen.getByText(/5 min/i)).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    renderWithMotion(
      <TutorialCard tutorial={mockTutorial} onClick={handleClick} />
    );

    fireEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when href is provided', () => {
    renderWithMotion(
      <TutorialCard tutorial={mockTutorial} href="/tutorials/cat-counting" />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/tutorials/cat-counting');
  });

  it('does not display estimated time when not provided', () => {
    const tutorialWithoutTime: Tutorial = {
      ...mockTutorial,
      estimatedMinutes: undefined,
    };
    renderWithMotion(<TutorialCard tutorial={tutorialWithoutTime} />);
    expect(screen.queryByText(/min/i)).not.toBeInTheDocument();
  });
});
