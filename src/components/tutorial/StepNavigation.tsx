'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  canComplete?: boolean;
  onComplete?: () => void;
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  canComplete = false,
  onComplete,
}: StepNavigationProps) {
  const shouldReduceMotion = useReducedMotion();
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  const handleNextOrComplete = () => {
    if (isLastStep && canComplete && onComplete) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <motion.nav
      role="navigation"
      aria-label="Tutorial navigation"
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="flex items-center justify-between w-full max-w-md gap-4">
        <Button
          variant="secondary"
          size="md"
          onClick={onPrevious}
          disabled={isFirstStep}
          aria-label="Previous step"
          className="flex items-center gap-2"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Previous
        </Button>

        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
          Step {currentStep} of {totalSteps}
        </span>

        {isLastStep && canComplete ? (
          <Button
            variant="celebration"
            size="md"
            onClick={handleNextOrComplete}
            aria-label="Complete tutorial"
            className="flex items-center gap-2"
          >
            Complete
            <CheckIcon className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={handleNextOrComplete}
            disabled={isLastStep && !canComplete}
            aria-label="Next step"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRightIcon className="w-5 h-5" />
          </Button>
        )}
      </div>
    </motion.nav>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
