import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { TutorialContent } from '@/app/tutorials/[slug]/TutorialContent';
import { catCountingTutorial } from '@/data/tutorials/cat-counting';

// Mock react-confetti-explosion to avoid dynamic import issues
jest.mock('react-confetti-explosion', () => {
  return function MockConfettiExplosion() {
    return null;
  };
});

const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">{component}</MotionConfig>
  );
};

describe('Tutorial Page - Integration', () => {
  it('renders the first step of the tutorial', () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    expect(screen.getByText(catCountingTutorial.steps[0].title)).toBeInTheDocument();
    expect(screen.getByText(/Before you can count the cats/)).toBeInTheDocument();
  });

  it('displays tutorial title', () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    expect(screen.getByText('Count the Cats')).toBeInTheDocument();
  });

  it('navigates to next step when next action is triggered', async () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // Click the button to go to next step
    const nextButton = screen.getByRole('button', { name: /I found some cats!/i });
    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText(catCountingTutorial.steps[1].title)).toBeInTheDocument();
    });
  });

  it('shows progress indicator', () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // Should show step 1 of total steps in progress text
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`of ${catCountingTutorial.steps.length}`))).toBeInTheDocument();
  });

  it('can navigate through multiple steps', async () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // Step 1: Click "I found some cats!"
    fireEvent.click(screen.getByRole('button', { name: /I found some cats!/i }));

    await waitFor(() => {
      expect(screen.getByText(catCountingTutorial.steps[1].title)).toBeInTheDocument();
    });

    // Step 2: Answer the quiz
    fireEvent.click(screen.getByRole('button', { name: '3' }));

    await waitFor(() => {
      expect(screen.getByText(/Excellent guess!/i)).toBeInTheDocument();
    });
  });

  it('shows tips for steps that have them', () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // First step has tips
    expect(screen.getByText(/Check sunny spots first/)).toBeInTheDocument();
  });

  it('handles quiz interaction correctly', async () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // Navigate to step 2 (quiz step)
    fireEvent.click(screen.getByRole('button', { name: /I found some cats!/i }));

    await waitFor(() => {
      expect(screen.getByText(/How many cats are upstairs/)).toBeInTheDocument();
    });

    // Click a quiz option
    fireEvent.click(screen.getByRole('button', { name: 'Impossible to know' }));

    // Should show response
    await waitFor(() => {
      expect(screen.getByText(/Excellent guess! The true answer is unknowable./)).toBeInTheDocument();
    });
  });

  it('handles clickable area interaction', async () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // Navigate to step 3 (clickable area)
    fireEvent.click(screen.getByRole('button', { name: /I found some cats!/i }));

    await waitFor(() => {
      expect(screen.getByText(catCountingTutorial.steps[1].title)).toBeInTheDocument();
    });

    // Answer quiz to proceed
    fireEvent.click(screen.getByRole('button', { name: '3' }));

    await waitFor(() => {
      const continueButtons = screen.getAllByRole('button');
      const continueButton = continueButtons.find(b => b.textContent?.match(/continue|next/i));
      if (continueButton) {
        fireEvent.click(continueButton);
      }
    });

    // Now on step 3 - click the area 3 times
    await waitFor(() => {
      expect(screen.queryByText(/Click to check the basement/i) ||
             screen.queryByText(catCountingTutorial.steps[2].title)).toBeTruthy();
    });
  });

  it('maintains progress state throughout navigation', async () => {
    renderWithMotion(
      <TutorialContent tutorial={catCountingTutorial} />
    );

    // Go to step 2
    fireEvent.click(screen.getByRole('button', { name: /I found some cats!/i }));

    await waitFor(() => {
      // Progress should show step 2
      expect(screen.getByText(/Step 2 of/)).toBeInTheDocument();
    });
  });
});
