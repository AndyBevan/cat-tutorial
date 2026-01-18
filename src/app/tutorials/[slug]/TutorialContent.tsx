'use client';

import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/animations/PageTransition';
import { TutorialStep } from '@/components/tutorial/TutorialStep';
import { CompletionCertificate } from '@/components/tutorial/CompletionCertificate';
import { useTutorialProgress } from '@/hooks/useTutorialProgress';
import type { Tutorial } from '@/data/tutorials';

interface TutorialContentProps {
  tutorial: Tutorial;
}

export function TutorialContent({ tutorial }: TutorialContentProps) {
  const {
    progress,
    currentStepData,
    goToNext,
    goToPrevious,
    complete,
    canGoPrevious,
  } = useTutorialProgress({
    tutorial,
  });

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
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      Step {progress.currentStep} of {progress.totalSteps}
                    </span>
                    <span>
                      {Math.round((progress.currentStep / progress.totalSteps) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{
                        width: `${(progress.currentStep / progress.totalSteps) * 100}%`,
                      }}
                    />
                  </div>
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
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={goToPrevious}
                    disabled={!canGoPrevious}
                    className={`
                      px-6 py-3 rounded-xl font-semibold
                      ${
                        canGoPrevious
                          ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 rounded-xl font-semibold bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    Next →
                  </button>
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
