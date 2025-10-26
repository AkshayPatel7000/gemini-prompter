import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Gemini Prompt Discovery - our mission to democratize AI image generation through curated prompts and tools.',
  openGraph: {
    title: 'About Us - Gemini Prompt Discovery',
    description: 'Learn about our mission to democratize AI image generation.',
  },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-4xl font-bold">
          About Gemini Prompt Discovery
        </h1>

        <div className="prose prose-lg mx-auto">
          <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">
            We&apos;re on a mission to democratize AI image generation by
            providing the best prompts and tools for creators worldwide.
          </p>

          <div className="mb-16 grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                To empower creators, artists, and innovators with high-quality
                AI prompts that unlock the full potential of Gemini&apos;s image
                generation capabilities.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
              <p className="text-gray-600 dark:text-gray-300">
                A world where anyone can create stunning visual content using
                AI, regardless of their technical background or artistic
                experience.
              </p>
            </div>
          </div>

          <div className="mb-12 rounded-lg bg-gray-50 p-8 dark:bg-gray-800">
            <h2 className="mb-6 text-center text-2xl font-semibold">
              What We Offer
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <h3 className="mb-2 font-semibold">Curated Prompts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hand-picked, tested prompts that deliver exceptional results
                </p>
              </div>
              <div className="text-center">
                <h3 className="mb-2 font-semibold">Generation Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Advanced tools to create and customize your own prompts
                </p>
              </div>
              <div className="text-center">
                <h3 className="mb-2 font-semibold">Community</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Connect with fellow creators and share your creations
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold">Join Our Journey</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Whether you&apos;re a seasoned artist or just starting with AI
              image generation, we&apos;re here to help you create amazing
              visuals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
