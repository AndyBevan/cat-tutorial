'use client';

import { motion } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

export interface CardProps {
  className?: string;
  variant?: 'default' | 'highlighted' | 'subtle';
  hoverable?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const variantStyles = {
  default: 'bg-white border-4 border-yellow-400',
  highlighted: 'bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-400',
  subtle: 'bg-gray-50 border-2 border-gray-200',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = '',
      variant = 'default',
      hoverable = false,
      children,
      onClick,
    },
    ref
  ) => {
    if (hoverable) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring' as const, stiffness: 300 }}
          className={`
            rounded-3xl shadow-lg p-6
            ${variantStyles[variant]}
            cursor-pointer
            ${className}
          `}
          onClick={onClick}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={`
          rounded-3xl shadow-lg p-6
          ${variantStyles[variant]}
          ${className}
        `}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
