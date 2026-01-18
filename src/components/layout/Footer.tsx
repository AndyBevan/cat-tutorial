'use client';

import { motion } from 'framer-motion';

export interface FooterProps {
  className?: string;
}

export function Footer({ className = '' }: FooterProps) {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`
        w-full py-6 px-4 sm:px-6 lg:px-8
        bg-gray-900 text-gray-300
        ${className}
      `}
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.p
          className="text-sm"
          whileHover={{ scale: 1.02 }}
        >
          Made with{' '}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ❤️
          </motion.span>{' '}
          by cats, for humans who serve cats
        </motion.p>
        <p className="text-xs mt-2 text-gray-500">
          No cats were harmed in the making of this tutorial. They were all napping.
        </p>
      </div>
    </motion.footer>
  );
}
