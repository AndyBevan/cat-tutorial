'use client';

import { motion, useReducedMotion } from 'framer-motion';

export interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  showPercentage?: boolean;
}

export function ProgressIndicator({
  currentStep,
  totalSteps,
  showPercentage = false,
}: ProgressIndicatorProps) {
  const shouldReduceMotion = useReducedMotion();
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <ul
        role="list"
        aria-label="Tutorial progress"
        className="flex items-center gap-2"
      >
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <motion.li
              key={stepNumber}
              role="listitem"
              data-completed={isCompleted.toString()}
              data-current={isCurrent.toString()}
              initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={shouldReduceMotion ? {} : { delay: index * 0.05 }}
              className={`
                w-4 h-4 rounded-full border-2 transition-all duration-300
                ${
                  isCurrent
                    ? 'bg-yellow-400 border-yellow-600 scale-125 shadow-md'
                    : isCompleted
                    ? 'bg-green-400 border-green-600'
                    : 'bg-gray-200 border-gray-300'
                }
              `}
              aria-label={`Step ${stepNumber}${isCurrent ? ' (current)' : isCompleted ? ' (completed)' : ''}`}
            />
          );
        })}
      </ul>

      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <span>Step {currentStep} of {totalSteps}</span>
        {showPercentage && (
          <span className="text-purple-600 font-bold">({percentage}%)</span>
        )}
      </div>
    </div>
  );
}
