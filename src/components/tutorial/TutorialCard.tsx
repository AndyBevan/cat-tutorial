'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Tutorial } from '@/data/tutorials/types';

export interface TutorialCardProps {
  tutorial: Tutorial;
  href?: string;
  onClick?: () => void;
}

const difficultyColors = {
  easy: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  hard: 'bg-orange-100 text-orange-800 border-orange-300',
  impossible: 'bg-purple-100 text-purple-800 border-purple-300',
};

export function TutorialCard({ tutorial, href, onClick }: TutorialCardProps) {
  const content = (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring' as const, stiffness: 300 }}
      className="
        bg-white rounded-3xl shadow-lg p-6
        border-4 border-yellow-400
        cursor-pointer
        h-full flex flex-col
      "
      onClick={onClick}
    >
      {/* Icon */}
      {tutorial.icon && (
        <div className="text-5xl mb-4">{tutorial.icon}</div>
      )}

      {/* Title */}
      <h2 className="text-2xl font-black text-gray-900 mb-2">
        {tutorial.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 mb-4 flex-grow">{tutorial.description}</p>

      {/* Footer with metadata */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        {/* Difficulty badge */}
        <span
          className={`
            px-3 py-1 rounded-full text-sm font-semibold
            border-2 capitalize
            ${difficultyColors[tutorial.difficulty]}
          `}
        >
          {tutorial.difficulty}
        </span>

        {/* Estimated time */}
        {tutorial.estimatedMinutes && (
          <span className="text-gray-500 text-sm">
            ~{tutorial.estimatedMinutes} min
          </span>
        )}
      </div>
    </motion.article>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
