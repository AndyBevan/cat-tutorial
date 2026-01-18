'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  variant?: 'primary' | 'secondary' | 'celebration';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const variantStyles = {
  primary:
    'bg-yellow-400 hover:bg-yellow-500 text-gray-900 border-4 border-yellow-600 shadow-lg hover:shadow-xl',
  secondary:
    'bg-purple-500 hover:bg-purple-600 text-white border-4 border-purple-700 shadow-lg hover:shadow-xl',
  celebration:
    'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white border-4 border-pink-600 shadow-lg hover:shadow-xl',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = '', variant = 'primary', size = 'md', children, ...props },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        className={`
          font-bold transition-colors duration-200
          focus:outline-none focus:ring-4 focus:ring-yellow-300
          disabled:opacity-50 disabled:cursor-not-allowed
          min-w-[44px] min-h-[44px]
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
