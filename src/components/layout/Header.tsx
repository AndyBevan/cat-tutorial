'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        w-full py-4 px-4 sm:px-6 lg:px-8
        bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400
        shadow-lg
        ${className}
      `}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.span
            className="text-4xl"
            whileHover={{ rotate: 20 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            🐱
          </motion.span>
          <h1 className="text-xl sm:text-2xl font-black text-white drop-shadow-md">
            Cat Tutorials
          </h1>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white font-semibold hover:text-yellow-200 transition-colors min-w-[44px] min-h-[44px] flex items-center"
          >
            Home
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}
