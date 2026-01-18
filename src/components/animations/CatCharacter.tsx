'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';

export interface CatCharacterProps {
  variant?: 'idle' | 'walk' | 'celebrate' | 'peek';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 48,
  md: 80,
  lg: 120,
};

const catVariants: Variants = {
  idle: {
    y: [0, -5, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  walk: {
    x: [0, 20, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  celebrate: {
    rotate: [0, -10, 10, -10, 0],
    y: [0, -15, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
    },
  },
  peek: {
    x: [-20, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const reducedMotionVariants: Variants = {
  idle: { opacity: 1 },
  walk: { opacity: 1 },
  celebrate: { opacity: 1 },
  peek: { opacity: 1 },
};

const tailVariants: Variants = {
  idle: {
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
  celebrate: {
    rotate: [0, 30, -30, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
    },
  },
};

const eyeVariants: Variants = {
  idle: {
    scaleY: [1, 0.1, 1],
    transition: {
      duration: 0.2,
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

export function CatCharacter({
  variant = 'idle',
  size = 'md',
  className = '',
}: CatCharacterProps) {
  const shouldReduceMotion = useReducedMotion();
  const dimensions = sizeMap[size];

  const activeVariants = shouldReduceMotion ? reducedMotionVariants : catVariants;

  return (
    <motion.svg
      width={dimensions}
      height={dimensions}
      viewBox="0 0 100 100"
      className={className}
      variants={activeVariants}
      animate={variant}
      aria-label="Animated cat character"
      role="img"
    >
      {/* Cat body - rounded blob shape */}
      <motion.ellipse
        cx="50"
        cy="60"
        rx="30"
        ry="25"
        fill="#1a1a1a"
      />

      {/* Cat head */}
      <motion.circle
        cx="50"
        cy="35"
        r="22"
        fill="#1a1a1a"
      />

      {/* Left ear */}
      <motion.path
        d="M 30 20 L 35 35 L 42 25 Z"
        fill="#1a1a1a"
      />
      {/* Left ear inner */}
      <motion.path
        d="M 33 24 L 36 32 L 40 27 Z"
        fill="#ff9999"
      />

      {/* Right ear */}
      <motion.path
        d="M 70 20 L 65 35 L 58 25 Z"
        fill="#1a1a1a"
      />
      {/* Right ear inner */}
      <motion.path
        d="M 67 24 L 64 32 L 60 27 Z"
        fill="#ff9999"
      />

      {/* Left eye */}
      <motion.ellipse
        cx="42"
        cy="32"
        rx="5"
        ry="6"
        fill="#ffeb3b"
        variants={shouldReduceMotion ? undefined : eyeVariants}
        animate="idle"
      />
      {/* Left pupil */}
      <motion.ellipse
        cx="42"
        cy="32"
        rx="2"
        ry="4"
        fill="#1a1a1a"
      />

      {/* Right eye */}
      <motion.ellipse
        cx="58"
        cy="32"
        rx="5"
        ry="6"
        fill="#ffeb3b"
        variants={shouldReduceMotion ? undefined : eyeVariants}
        animate="idle"
      />
      {/* Right pupil */}
      <motion.ellipse
        cx="58"
        cy="32"
        rx="2"
        ry="4"
        fill="#1a1a1a"
      />

      {/* Nose */}
      <motion.path
        d="M 50 40 L 47 44 L 53 44 Z"
        fill="#ff9999"
      />

      {/* Mouth */}
      <motion.path
        d="M 50 44 Q 45 48 42 46"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
      />
      <motion.path
        d="M 50 44 Q 55 48 58 46"
        stroke="#333"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Whiskers left */}
      <motion.line x1="30" y1="38" x2="42" y2="40" stroke="#333" strokeWidth="1" />
      <motion.line x1="28" y1="42" x2="42" y2="42" stroke="#333" strokeWidth="1" />
      <motion.line x1="30" y1="46" x2="42" y2="44" stroke="#333" strokeWidth="1" />

      {/* Whiskers right */}
      <motion.line x1="58" y1="40" x2="70" y2="38" stroke="#333" strokeWidth="1" />
      <motion.line x1="58" y1="42" x2="72" y2="42" stroke="#333" strokeWidth="1" />
      <motion.line x1="58" y1="44" x2="70" y2="46" stroke="#333" strokeWidth="1" />

      {/* Tail */}
      <motion.path
        d="M 75 70 Q 90 60 85 45"
        stroke="#1a1a1a"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
        variants={shouldReduceMotion ? undefined : tailVariants}
        animate={variant === 'celebrate' ? 'celebrate' : 'idle'}
        style={{ originX: '75px', originY: '70px' }}
      />

      {/* Front paws */}
      <motion.ellipse cx="35" cy="80" rx="6" ry="4" fill="#1a1a1a" />
      <motion.ellipse cx="65" cy="80" rx="6" ry="4" fill="#1a1a1a" />
    </motion.svg>
  );
}
