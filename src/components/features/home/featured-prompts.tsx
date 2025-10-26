export function FeaturedPrompts() {
  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Prompts</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Discover our most popular and trending AI image prompts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for featured prompts */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-gray-50 p-6 transition-shadow hover:shadow-lg dark:bg-gray-800"
            >
              <div className="mb-4 h-48 rounded-lg bg-gradient-to-br from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800"></div>
              <h3 className="mb-2 font-semibold">Sample Prompt {i}</h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                A beautiful landscape with mountains and lakes...
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-600">Photography</span>
                <span className="text-gray-500">❤️ 124</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
