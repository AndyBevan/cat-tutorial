'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Tutorial, TutorialProgress } from '@/data/tutorials/types';

export interface UseTutorialProgressOptions {
  tutorial: Tutorial;
  initialStep?: number;
  onComplete?: () => void;
}

export interface UseTutorialProgressReturn {
  progress: TutorialProgress;
  currentStepData: Tutorial['steps'][number];
  goToNext: () => void;
  goToPrevious: () => void;
  goToStep: (stepNumber: number) => void;
  complete: () => void;
  reset: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function useTutorialProgress({
  tutorial,
  initialStep = 1,
  onComplete,
}: UseTutorialProgressOptions): UseTutorialProgressReturn {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [isCompleted, setIsCompleted] = useState(false);

  const totalSteps = tutorial.steps.length;

  const progress: TutorialProgress = useMemo(
    () => ({
      tutorialId: tutorial.id,
      currentStep,
      totalSteps,
      isCompleted,
    }),
    [tutorial.id, currentStep, totalSteps, isCompleted]
  );

  const currentStepData = useMemo(
    () => tutorial.steps.find((s) => s.number === currentStep) ?? tutorial.steps[0],
    [tutorial.steps, currentStep]
  );

  const canGoNext = currentStep < totalSteps && !isCompleted;
  const canGoPrevious = currentStep > 1 && !isCompleted;

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [canGoPrevious]);

  const goToStep = useCallback(
    (stepNumber: number) => {
      if (stepNumber >= 1 && stepNumber <= totalSteps && !isCompleted) {
        setCurrentStep(stepNumber);
      }
    },
    [totalSteps, isCompleted]
  );

  const complete = useCallback(() => {
    setIsCompleted(true);
    onComplete?.();
  }, [onComplete]);

  const reset = useCallback(() => {
    setCurrentStep(1);
    setIsCompleted(false);
  }, []);

  return {
    progress,
    currentStepData,
    goToNext,
    goToPrevious,
    goToStep,
    complete,
    reset,
    canGoNext,
    canGoPrevious,
  };
}
