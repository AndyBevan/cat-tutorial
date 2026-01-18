import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TutorialCard } from '@/components/tutorial/TutorialCard';
import { PageTransition } from '@/components/animations/PageTransition';
import { tutorials } from '@/data/tutorials';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow">
        <PageTransition>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-purple-100 to-yellow-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-4">
                Cat Tutorials
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Learn the ancient and mystical arts of living with cats.
                Warning: Results may vary based on cat mood.
              </p>
            </div>
          </section>

          {/* Tutorials Grid */}
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Available Tutorials
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <TutorialCard
                    key={tutorial.id}
                    tutorial={tutorial}
                    href={`/tutorials/${tutorial.id}`}
                  />
                ))}
              </div>
            </div>
          </section>
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}
