'use client';

import { useState } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { PromptGallery } from '@/components/PromptGallery';
import { PromptDetailPage } from '@/components/PromptDetailPage';
import { LoginModal } from '@/components/features/auth/login-modal';
import { mockPrompts } from '@/lib/mockData';
import { Search } from 'lucide-react';

export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPromptId, setSelectedPromptId] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter prompts based on active filters and search
  const filteredPrompts = mockPrompts.filter((prompt) => {
    if (activeCategory !== 'All' && prompt.category !== activeCategory) {
      return false;
    }
    if (
      searchQuery &&
      !prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !prompt.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
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

  const handleCardClick = (id: string) => {
    setSelectedPromptId(id);
  };

  const handleBackToGallery = () => {
    setSelectedPromptId(null);
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
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Prompt Gallery</h1>
          <p className="mx-auto mb-8 text-purple-100">
            Explore our complete collection of {mockPrompts.length}+ AI image
            prompts. Find the perfect prompt for your next Gemini creation.
          </p>

          {/* Search Bar */}
          <div className="relative mx-auto max-w-md">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts, tags, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border-0 bg-white/90 py-3 pr-4 pl-10 backdrop-blur-sm focus:ring-2 focus:ring-white/50 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Filter Bar */}
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Results Count */}
        <div className="container mx-auto px-4 py-4">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {sortedPrompts.length} of {mockPrompts.length} prompts
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Prompt Gallery */}
        <PromptGallery prompts={sortedPrompts} onCardClick={handleCardClick} />

        {/* Empty State */}
        {sortedPrompts.length === 0 && (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="mb-2 text-xl font-semibold">No prompts found</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
                setActiveFilter('trending');
              }}
              className="rounded-full bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gray-50 py-16 dark:bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Want to Create Your Own Prompts?
            </h2>
            <p className="mx-auto mb-6 text-gray-600 dark:text-gray-300">
              Upload your images and let our AI generate custom prompts tailored
              to your style. Get 10 free credits when you sign up!
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
            >
              Start Generating Free
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
