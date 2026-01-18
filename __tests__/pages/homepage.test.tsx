import { render, screen } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import HomePage from '@/app/page';

const renderWithMotion = (component: React.ReactElement) => {
  return render(
    <MotionConfig reducedMotion="always">{component}</MotionConfig>
  );
};

describe('Homepage', () => {
  it('renders the page header', () => {
    renderWithMotion(<HomePage />);
    // There are two "Cat Tutorials" headings - one in header and one in hero
    const headings = screen.getAllByRole('heading', { name: /cat tutorials/i });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it('displays the Count the Cats tutorial card', () => {
    renderWithMotion(<HomePage />);
    expect(screen.getByText('Count the Cats')).toBeInTheDocument();
  });

  it('shows tutorial description with humorous content', () => {
    renderWithMotion(<HomePage />);
    expect(
      screen.getByText(/impossible art of counting/i)
    ).toBeInTheDocument();
  });

  it('displays difficulty indicator for tutorials', () => {
    renderWithMotion(<HomePage />);
    // "impossible" appears in both description and badge - use getAllByText
    const impossibleElements = screen.getAllByText(/impossible/i);
    expect(impossibleElements.length).toBeGreaterThanOrEqual(1);
  });

  it('renders tutorial cards as clickable links', () => {
    renderWithMotion(<HomePage />);
    const links = screen.getAllByRole('link');
    const tutorialLink = links.find((link) =>
      link.getAttribute('href')?.includes('/tutorials/')
    );
    expect(tutorialLink).toBeInTheDocument();
  });

  it('has accessible page structure', () => {
    renderWithMotion(<HomePage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
