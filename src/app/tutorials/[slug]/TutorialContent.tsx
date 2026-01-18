'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { TutorialStep } from '@/components/tutorial/TutorialStep';
import { CompletionCertificate } from '@/components/tutorial/CompletionCertificate';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { StepNavigation } from '@/components/tutorial/StepNavigation';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import type { Tutorial } from '@/data/tutorials';

interface TutorialContentProps {
  tutorial: Tutorial;
}

/**
 * Parses the step number from URL query params.
 * Returns 1 if invalid or out of range.
 */
function parseStepFromUrl(stepParam: string | null, totalSteps: number): number {
  if (!stepParam) return 1;
  const step = parseInt(stepParam, 10);
  if (isNaN(step) || step < 1 || step > totalSteps) return 1;
  return step;
}

export function TutorialContent({ tutorial }: TutorialContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse initial step from URL query param (e.g., ?step=2)
  const initialStep = parseStepFromUrl(
    searchParams.get('step'),
    tutorial.steps.length
  );

  const {
    progress,
    currentStepData,
    goToNext,
    goToPrevious,
    goToStep,
    complete,
  } = useTutorialProgress({
    tutorial,
    initialStep,
  });

  // Update URL when step changes (shallow update, no navigation)
  const updateUrlStep = useCallback(
    (step: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (step === 1) {
        params.delete('step');
      } else {
        params.set('step', step.toString());
      }
      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Sync URL with current step
  useEffect(() => {
    if (!progress.isCompleted) {
      updateUrlStep(progress.currentStep);
    }
  }, [progress.currentStep, progress.isCompleted, updateUrlStep]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-purple-50 to-yellow-50">
        <PageTransition>
          {/* Tutorial Header */}
          <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {tutorial.title}
              </h1>

              {/* Progress indicator */}
              {!progress.isCompleted && (
                <div className="mt-4">
                  <ProgressIndicator
                    currentStep={progress.currentStep}
                    totalSteps={progress.totalSteps}
                    showPercentage
                  />
                </div>
              )}
            </div>
          </section>

          {/* Tutorial Content */}
          <section className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                {progress.isCompleted ? (
                  <CompletionCertificate
                    key="certificate"
                    tutorialTitle={tutorial.title}
                    completionMessage="You are now officially certified in the ancient art of cat counting!"
                  />
                ) : (
                  <TutorialStep
                    key={`step-${progress.currentStep}`}
                    step={currentStepData}
                    onNext={goToNext}
                    onPrevious={goToPrevious}
                    onComplete={complete}
                  />
                )}
              </AnimatePresence>

              {/* Navigation buttons (only show when not completed and not on button-controlled steps) */}
              {!progress.isCompleted && !currentStepData.interactiveElement && (
                <div className="mt-8">
                  <StepNavigation
                    currentStep={progress.currentStep}
                    totalSteps={progress.totalSteps}
                    onPrevious={goToPrevious}
                    onNext={goToNext}
                    canComplete={progress.currentStep === progress.totalSteps}
                    onComplete={complete}
                  />
                </div>
              )}

              {/* Back button when completed */}
              {progress.isCompleted && (
                <div className="mt-8 text-center">
                  <a
                    href="/"
                    className="inline-block px-8 py-4 rounded-2xl font-bold bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    ← Back to All Tutorials
                  </a>
                </div>
              )}
            </div>
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
