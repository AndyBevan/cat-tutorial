import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CatCharacter } from '@/components/animations/CatCharacter';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-grow bg-gradient-to-b from-purple-100 to-yellow-50">
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Cat illustration */}
            <div className="mb-8 flex justify-center">
              <CatCharacter variant="peek" size="lg" />
            </div>

            {/* Error message */}
            <h1 className="text-6xl sm:text-7xl font-black text-gray-900 mb-4">
              404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-purple-600 mb-6">
              The Cat Knocked This Page Off The Table
            </h2>

            <p className="text-lg text-gray-700 mb-4">
              We looked everywhere — under the couch, behind the curtains,
              even in that suspicious cardboard box — but this page has vanished.
            </p>

            <p className="text-gray-600 mb-8">
              Perhaps the cats know where it went, but they&apos;re not telling.
            </p>

            {/* Humorous suggestions */}
            <div className="bg-white/70 rounded-3xl border-4 border-yellow-400 p-6 mb-8 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-3">
                What could have happened:
              </h3>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  The page was mistaken for a laser pointer dot
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  A cat sat on the keyboard and deleted it
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  It fell into the same void where all the hair ties go
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  The page simply decided it was time for a nap
                </li>
              </ul>
            </div>

            {/* Action button */}
            <Link
              href="/"
              className="inline-block px-8 py-4 rounded-2xl font-bold bg-purple-500 hover:bg-purple-600 text-white shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Return to Safety
            </Link>

            <p className="mt-6 text-sm text-gray-500">
              (The cats promise they won&apos;t knock this link off the table)
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
