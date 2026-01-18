'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CatCharacter } from '@/components/animations/CatCharacter';
import { CelebrationEffect } from '@/components/animations/CelebrationEffect';

export interface CompletionCertificateProps {
  tutorialTitle: string;
  completionMessage?: string;
  userName?: string;
}

export function CompletionCertificate({
  tutorialTitle,
  completionMessage,
  userName = 'Distinguished Graduate',
}: CompletionCertificateProps) {
  const shouldReduceMotion = useReducedMotion();
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <CelebrationEffect isActive={true} duration={3000} particleCount={150} />

      <motion.article
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="certificate relative bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-3xl p-8 sm:p-12 border-4 border-yellow-400 shadow-2xl max-w-2xl mx-auto"
        role="article"
        aria-label="Completion Certificate"
      >
        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-yellow-500 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-yellow-500 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-yellow-500 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-yellow-500 rounded-br-lg" />

        {/* Certificate badge */}
        <div className="flex justify-center mb-6">
          <motion.div
            data-testid="certificate-badge"
            initial={shouldReduceMotion ? {} : { rotate: -10 }}
            animate={shouldReduceMotion ? {} : { rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            className="relative"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <CatCharacter variant="celebrate" size="lg" />
            </div>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full"
              role="img"
              aria-label="certificate"
            >
              CERTIFIED
            </div>
          </motion.div>
        </div>

        {/* Certificate content */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
          >
            🎉 Congratulations! 🎉
          </motion.h1>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <p className="text-lg text-gray-600">This certifies that</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{userName}</p>
            <p className="text-lg text-gray-600">has successfully completed</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-700">
              &quot;{tutorialTitle}&quot;
            </p>
          </motion.div>

          {completionMessage && (
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-700 italic mt-4"
            >
              {completionMessage}
            </motion.p>
          )}

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-6 border-t-2 border-dashed border-yellow-300 mt-6"
          >
            <p className="text-sm text-gray-500">Completed on</p>
            <p className="text-lg font-semibold text-gray-700">{completionDate}</p>
          </motion.div>

          {/* Fun seal */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
            className="mt-6 inline-block"
          >
            <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs font-bold px-4 py-2 rounded-full transform -rotate-6 shadow-md">
              🏆 OFFICIAL CAT EXPERT 🏆
            </div>
          </motion.div>
        </div>

        {/* Decorative cats */}
        <div className="absolute -left-4 bottom-1/4 opacity-20 hidden sm:block">
          <CatCharacter variant="peek" size="sm" />
        </div>
        <div className="absolute -right-4 bottom-1/3 opacity-20 hidden sm:block transform scale-x-[-1]">
          <CatCharacter variant="peek" size="sm" />
        </div>
      </motion.article>
    </>
  );
}
