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

export default function TutorialPage({ params }: TutorialPageProps) {
  const tutorial = getTutorialBySlug(params.slug);

  if (!tutorial) {
    notFound();
  }

  return <TutorialContent tutorial={tutorial} />;
}
