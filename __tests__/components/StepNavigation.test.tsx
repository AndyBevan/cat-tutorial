import { render, screen, fireEvent } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { StepNavigation } from '@/components/tutorial/StepNavigation';

const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">{component}</MotionConfig>
  );
};

describe('StepNavigation', () => {
  const defaultProps = {
    currentStep: 2,
    totalSteps: 5,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders previous and next buttons', () => {
    renderWithMotion(<StepNavigation {...defaultProps} />);
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('calls onPrevious when previous button is clicked', () => {
    renderWithMotion(<StepNavigation {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /previous/i }));
    expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button is clicked', () => {
    renderWithMotion(<StepNavigation {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });

  it('disables previous button on first step', () => {
    renderWithMotion(
      <StepNavigation {...defaultProps} currentStep={1} />
    );
    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled();
  });

  it('disables next button on last step', () => {
    renderWithMotion(
      <StepNavigation {...defaultProps} currentStep={5} />
    );
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  it('shows "Complete" text on next button when on last step and canComplete is true', () => {
    renderWithMotion(
      <StepNavigation {...defaultProps} currentStep={5} canComplete />
    );
    expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument();
  });

  it('calls onComplete when complete button is clicked', () => {
    const onComplete = jest.fn();
    renderWithMotion(
      <StepNavigation
        {...defaultProps}
        currentStep={5}
        canComplete
        onComplete={onComplete}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /complete/i }));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('displays step counter', () => {
    renderWithMotion(<StepNavigation {...defaultProps} />);
    expect(screen.getByText(/2.*5|step 2 of 5/i)).toBeInTheDocument();
  });

  it('has accessible navigation region', () => {
    renderWithMotion(<StepNavigation {...defaultProps} />);
    expect(screen.getByRole('navigation')).toHaveAccessibleName(/tutorial navigation/i);
  });

  it('supports keyboard navigation', () => {
    renderWithMotion(<StepNavigation {...defaultProps} />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Buttons should be focusable
    prevButton.focus();
    expect(prevButton).toHaveFocus();

    nextButton.focus();
    expect(nextButton).toHaveFocus();
  });
});
