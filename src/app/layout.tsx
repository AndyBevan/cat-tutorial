import type { Metadata } from 'next';
import { MotionConfig } from 'framer-motion';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Cat Tutorial - Professional Cat Training',
  description: 'Master the impossible art of counting three identical black cats with our whimsical, interactive tutorials.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
      </body>
    </html>
  );
}
