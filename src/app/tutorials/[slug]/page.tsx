import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTutorialBySlug, getAllTutorialSlugs } from '@/data/tutorials';
import { TutorialContent } from './TutorialContent';

interface TutorialPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all tutorials
export function generateStaticParams() {
  return getAllTutorialSlugs().map((slug) => ({ slug }));
}

// Loading fallback for Suspense boundary
function TutorialLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-yellow-50">
      <div className="text-center">
        <div className="text-4xl mb-4">Loading...</div>
        <p className="text-gray-600">The cats are preparing...</p>
      </div>
    </div>
  );
}

export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = getTutorialBySlug(params.slug);

  if (!tutorial) {
    notFound();
  }

  return (
    <Suspense fallback={<TutorialLoading />}>
      <TutorialContent tutorial={tutorial} />
    </Suspense>
  );
}
