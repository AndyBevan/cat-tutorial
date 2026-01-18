import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import { MotionConfig } from 'framer-motion';
import React, { ReactElement } from 'react';

/**
 * Custom render function that wraps components with MotionConfig
 * to disable animations during tests for faster, more reliable tests.
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion="always">
      {children}
    </MotionConfig>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render method with custom wrapper
export { customRender as render };
