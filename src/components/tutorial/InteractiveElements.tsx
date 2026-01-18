'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type {
  ButtonElement as ButtonElementType,
  QuizElement as QuizElementType,
  ClickableAreaElement as ClickableAreaElementType,
} from '@/data/tutorials/types';

interface ButtonElementProps {
  element: ButtonElementType;
  onAction: (action: 'next' | 'previous' | 'complete') => void;
}

export function ButtonElement({ element, onAction }: ButtonElementProps) {
  return (
    <Button
      variant={element.variant || 'primary'}
      size="lg"
      onClick={() => onAction(element.action)}
    >
      {element.label}
    </Button>
  );
}

interface QuizElementProps {
  element: QuizElementType;
  onComplete: () => void;
}

export function QuizElement({ element, onComplete }: QuizElementProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
    setShowResponse(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800">{element.question}</h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {element.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={showResponse}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className={`
              px-4 py-3 rounded-xl font-semibold text-lg
              border-3 transition-colors duration-200
              min-w-[44px] min-h-[44px]
              ${
                selectedOption === index
                  ? 'bg-purple-500 text-white border-purple-700'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-purple-400'
              }
              ${showResponse && selectedOption !== index ? 'opacity-50' : ''}
              disabled:cursor-default
            `}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {showResponse && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300"
        >
          <p className="text-lg text-purple-800 font-medium">{element.response}</p>
          <Button
            variant="primary"
            size="md"
            className="mt-4"
            onClick={onComplete}
          >
            Continue
          </Button>
        </motion.div>
      )}
    </div>
  );
}

interface ClickableAreaElementProps {
  element: ClickableAreaElementType;
  onComplete: () => void;
}

export function ClickableAreaElement({ element, onComplete }: ClickableAreaElementProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleClick = () => {
    if (isCompleted) return;

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= element.targetClicks) {
      setIsCompleted(true);
    }
  };

  const progress = Math.min((clickCount / element.targetClicks) * 100, 100);

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium text-gray-700">{element.instruction}</p>

      <motion.button
        onClick={handleClick}
        disabled={isCompleted}
        whileHover={shouldReduceMotion || isCompleted ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion || isCompleted ? {} : { scale: 0.98 }}
        className={`
          w-full p-8 rounded-3xl border-4 text-center
          transition-colors duration-200
          ${
            isCompleted
              ? 'bg-green-100 border-green-400 cursor-default'
              : 'bg-gradient-to-br from-purple-100 to-indigo-100 border-purple-400 hover:border-purple-600 cursor-pointer'
          }
        `}
        aria-label={element.instruction}
      >
        <div className="text-4xl mb-2">
          {isCompleted ? '✅' : '🐱'}
        </div>
        <div className="text-lg font-semibold text-gray-700">
          {isCompleted ? element.completionMessage : `${clickCount} / ${element.targetClicks}`}
        </div>

        {/* Progress bar */}
        {!isCompleted && (
          <div className="mt-4 h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </motion.button>

      {isCompleted && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            variant="primary"
            size="md"
            onClick={onComplete}
          >
            Continue
          </Button>
        </motion.div>
      )}
    </div>
  );
}
