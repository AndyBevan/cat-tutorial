'use client';

import { useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import confetti to avoid SSR issues
const ConfettiExplosion = dynamic(() => import('react-confetti-explosion'), {
  ssr: false,
});

export interface CelebrationEffectProps {
  isActive: boolean;
  duration?: number;
  particleCount?: number;
  className?: string;
}

export function CelebrationEffect({
  isActive,
  duration = 3000,
  particleCount = 100,
  className = '',
}: CelebrationEffectProps) {
  const shouldReduceMotion = useReducedMotion();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isActive && !shouldReduceMotion) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isActive, shouldReduceMotion, duration]);

  // For reduced motion users, show a static celebration message instead
  if (shouldReduceMotion && isActive) {
    return (
      <div
        className={`flex items-center justify-center text-4xl ${className}`}
        role="img"
        aria-label="Celebration"
      >
        🎉 ⭐ 🎊
      </div>
    );
  }

  if (!showConfetti) {
    return null;
  }

  return (
    <div className={`fixed inset-0 pointer-events-none flex items-center justify-center z-50 ${className}`}>
      <ConfettiExplosion
        force={0.8}
        duration={duration}
        particleCount={particleCount}
        width={1600}
        colors={['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd']}
      />
    </div>
  );
}
