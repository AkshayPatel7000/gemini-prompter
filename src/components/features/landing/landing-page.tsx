'use client';

import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { FilterBar } from '@/components/FilterBar';
import { PromptGallery } from '@/components/PromptGallery';
import { PromptDetailPage } from '@/components/PromptDetailPage';
import { LoginModal } from '@/components/features/auth/login-modal';
import { mockPrompts } from '@/lib/mockData';
import { Navbar } from '@/components/Navbar';

export function LandingPage() {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);

  // Filter prompts based on active filters
  const filteredPrompts = mockPrompts.filter((prompt) => {
    if (activeCategory !== 'All' && prompt.category !== activeCategory) {
      return false;
    }
    return true;
  });

  // Sort prompts based on active filter
  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    if (activeFilter === 'trending') {
      return b.likes - a.likes;
    }
    if (activeFilter === 'recent') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  // Show limited prompts on landing page, full gallery when expanded
  const displayPrompts = showFullGallery
    ? sortedPrompts
    : sortedPrompts.slice(0, 8);

  const handleCardClick = (id: string) => {
    setSelectedPromptId(id);
  };

  const handleBackToGallery = () => {
    setSelectedPromptId(null);
  };

  const handleGenerateClick = () => {
    setShowLoginModal(true);
  };

  const handleViewMore = () => {
    setShowFullGallery(true);
  };

  if (selectedPromptId) {
    return (
      <PromptDetailPage
        promptId={selectedPromptId}
        onBack={handleBackToGallery}
        onCardClick={handleCardClick}
      />
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero onNavigate={handleGenerateClick} />

      {/* Featured Prompts Section */}
      <section id="prompts-section" className="bg-white py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              Trending AI Prompts
            </h2>
            <p className="text-gray-600sm:text-xl mx-auto text-lg leading-relaxed dark:text-gray-300">
              Discover the most popular and effective prompts for Google Gemini.
              <br className="hidden sm:block" />
              Copy any prompt and use it directly in your Gemini app.
            </p>
          </div>

          {/* Filter Bar */}
          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />

          {/* Prompt Gallery */}
          <PromptGallery
            prompts={displayPrompts}
            onCardClick={handleCardClick}
          />

          {/* View More Button */}
          {!showFullGallery && sortedPrompts.length > 8 && (
            <div className="mt-16 text-center">
              <div className="mx-auto max-w-md">
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Showing 8 of {sortedPrompts.length} amazing prompts
                </p>
                <button
                  onClick={handleViewMore}
                  className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl active:scale-95"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    View All {sortedPrompts.length} Prompts
                    <svg
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              How It Works
            </h2>
            <p className="mx-auto text-lg leading-relaxed text-gray-600 sm:text-xl dark:text-gray-300">
              Get started with AI image generation in three simple steps.
              <br className="hidden sm:block" />
              No technical knowledge required – just creativity!
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3 lg:gap-12">
            <div className="group text-center transition-transform hover:scale-105">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100 shadow-lg transition-all group-hover:shadow-xl dark:from-purple-900/30 dark:to-blue-900/30">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Browse Prompts
              </h3>
              <p className="mx-auto max-w-48 text-base leading-relaxed text-gray-600 sm:max-w-56 sm:text-lg dark:text-gray-300">
                Explore our curated collection of high-quality AI image prompts
                across various categories and styles
              </p>
            </div>

            <div className="group text-center transition-transform hover:scale-105">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg transition-all group-hover:shadow-xl dark:from-green-900/30 dark:to-emerald-900/30">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Copy & Use
              </h3>
              <p className="mx-auto max-w-48 text-base leading-relaxed text-gray-600 sm:max-w-56 sm:text-lg dark:text-gray-300">
                Click any prompt to copy it instantly and paste directly into
                your Gemini app for immediate use
              </p>
            </div>

            <div className="group text-center transition-transform hover:scale-105">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg transition-all group-hover:shadow-xl dark:from-yellow-900/30 dark:to-orange-900/30">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                Generate Images
              </h3>
              <p className="mx-auto max-w-48 text-base leading-relaxed text-gray-600 sm:max-w-56 sm:text-lg dark:text-gray-300">
                Create stunning AI images with Google Gemini using our optimized
                prompts for best results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Want to Generate Custom Prompts?
            </h2>
            <p className="mx-auto mb-10 text-lg leading-relaxed text-purple-100 sm:text-xl">
              Upload your own images and let our AI create perfect prompts
              tailored to your style.
              <br className="hidden sm:block" />
              <span className="font-semibold text-yellow-200">
                Get 10 free credits when you sign up!
              </span>
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <button
                onClick={handleGenerateClick}
                className="group hover:shadow-3xl relative overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-purple-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 active:scale-95"
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-2xl">🚀</span>
                  Start Generating Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              <p className="text-sm text-purple-200">
                No credit card required • 10 free credits included
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
