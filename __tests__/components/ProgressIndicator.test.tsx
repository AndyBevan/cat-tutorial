import { render, screen } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';

const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">{component}</MotionConfig>
  );
};

describe('ProgressIndicator', () => {
  it('displays current step and total steps', () => {
    renderWithMotion(<ProgressIndicator currentStep={2} totalSteps={5} />);
    expect(screen.getByText(/2.*5|step 2 of 5/i)).toBeInTheDocument();
  });

  it('renders correct number of step indicators', () => {
    renderWithMotion(<ProgressIndicator currentStep={1} totalSteps={4} />);
    const indicators = screen.getAllByRole('listitem');
    expect(indicators).toHaveLength(4);
  });

  it('marks completed steps', () => {
    renderWithMotion(<ProgressIndicator currentStep={3} totalSteps={5} />);
    const indicators = screen.getAllByRole('listitem');
    // Steps 1 and 2 should be completed, step 3 is current
    expect(indicators[0]).toHaveAttribute('data-completed', 'true');
    expect(indicators[1]).toHaveAttribute('data-completed', 'true');
    expect(indicators[2]).toHaveAttribute('data-current', 'true');
    expect(indicators[3]).toHaveAttribute('data-completed', 'false');
  });

  it('marks current step distinctly', () => {
    renderWithMotion(<ProgressIndicator currentStep={2} totalSteps={3} />);
    const indicators = screen.getAllByRole('listitem');
    expect(indicators[1]).toHaveAttribute('data-current', 'true');
  });

  it('shows progress percentage when showPercentage is true', () => {
    renderWithMotion(
      <ProgressIndicator currentStep={2} totalSteps={4} showPercentage />
    );
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  it('handles single step tutorial', () => {
    renderWithMotion(<ProgressIndicator currentStep={1} totalSteps={1} />);
    const indicators = screen.getAllByRole('listitem');
    expect(indicators).toHaveLength(1);
    expect(indicators[0]).toHaveAttribute('data-current', 'true');
  });

  it('handles completion state (last step)', () => {
    renderWithMotion(<ProgressIndicator currentStep={5} totalSteps={5} />);
    const indicators = screen.getAllByRole('listitem');
    expect(indicators[4]).toHaveAttribute('data-current', 'true');
  });

  it('renders with accessible role', () => {
    renderWithMotion(<ProgressIndicator currentStep={2} totalSteps={5} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('list')).toHaveAccessibleName(/progress/i);
  });
});
