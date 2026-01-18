import { render, screen } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { CompletionCertificate } from '@/components/tutorial/CompletionCertificate';

// Mock react-confetti-explosion to avoid dynamic import issues in tests
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

describe('CompletionCertificate', () => {
  it('displays congratulations message', () => {
    renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
  });

  it('displays tutorial title', () => {
    renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    expect(screen.getByText(/Count the Cats/)).toBeInTheDocument();
  });

  it('displays certification badge', () => {
    renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    // Should have the CERTIFIED badge
    expect(screen.getByText(/certified/i)).toBeInTheDocument();
  });

  it('displays completion date', () => {
    renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    // Should display "Completed on" label
    expect(screen.getByText(/completed on/i)).toBeInTheDocument();
  });

  it('renders with custom completionMessage when provided', () => {
    renderWithMotion(
      <CompletionCertificate
        tutorialTitle="Count the Cats"
        completionMessage="You are now a certified cat counter!"
      />
    );
    expect(screen.getByText(/certified cat counter/i)).toBeInTheDocument();
  });

  it('displays user name when provided', () => {
    renderWithMotion(
      <CompletionCertificate
        tutorialTitle="Count the Cats"
        userName="Cat Expert"
      />
    );
    expect(screen.getByText(/Cat Expert/)).toBeInTheDocument();
  });

  it('has accessible structure', () => {
    renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    // Certificate should have article role
    expect(screen.getByRole('article')).toBeInTheDocument();
  });

  it('applies certificate styling class', () => {
    const { container } = renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    // Should have certificate class
    const certificate = container.querySelector('.certificate');
    expect(certificate).toBeInTheDocument();
  });

  it('displays default user name when not provided', () => {
    renderWithMotion(
      <CompletionCertificate tutorialTitle="Count the Cats" />
    );
    expect(screen.getByText(/Distinguished Graduate/)).toBeInTheDocument();
  });
});
