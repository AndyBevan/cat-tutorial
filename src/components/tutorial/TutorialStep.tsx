'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { CatCharacter } from '@/components/animations/CatCharacter';
import {
  ButtonElement,
  QuizElement,
  ClickableAreaElement,
} from './InteractiveElements';
import type { TutorialStep as TutorialStepType } from '@/data/tutorials/types';

export interface TutorialStepProps {
  step: TutorialStepType;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
}

export function TutorialStep({
  step,
  onNext,
  onPrevious,
  onComplete,
}: TutorialStepProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleAction = (action: 'next' | 'previous' | 'complete') => {
    switch (action) {
      case 'next':
        onNext();
        break;
      case 'previous':
        onPrevious();
        break;
      case 'complete':
        onComplete();
        break;
    }
  };

  const renderInteractiveElement = () => {
    if (!step.interactiveElement) return null;

    switch (step.interactiveElement.type) {
      case 'button':
        return (
          <ButtonElement
            element={step.interactiveElement}
            onAction={handleAction}
          />
        );
      case 'quiz':
        return (
          <QuizElement
            element={step.interactiveElement}
            onComplete={onNext}
          />
        );
      case 'clickable-area':
        return (
          <ClickableAreaElement
            element={step.interactiveElement}
            onComplete={onNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Step header with cat character */}
      <div className="flex items-start gap-4">
        <CatCharacter
          variant={step.isCompletionStep ? 'celebrate' : 'idle'}
          size="md"
          className="flex-shrink-0 hidden sm:block"
        />
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {step.title}
          </h2>
        </div>
      </div>

      {/* Main content */}
      <Card variant="default" className="prose prose-lg max-w-none">
        <p className="text-gray-700 text-lg leading-relaxed">{step.content}</p>

        {/* Step image if present */}
        {step.image && (
          <div className={`my-4 ${step.image.position === 'above' ? 'order-first' : ''}`}>
            <img
              src={step.image.src}
              alt={step.image.alt}
              className="rounded-2xl shadow-md max-w-full h-auto"
            />
            {step.image.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center italic">
                {step.image.caption}
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Tips section */}
      {step.tips && step.tips.length > 0 && (
        <Card variant="highlighted" className="border-yellow-400">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Pro Tips</h3>
              <ul className="space-y-2">
                {step.tips.map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-yellow-900"
                  >
                    <span className="text-yellow-600">•</span>
                    <span>{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* Interactive element */}
      {step.interactiveElement && (
        <div className="mt-6">
          {renderInteractiveElement()}
        </div>
      )}
    </motion.div>
  );
}
