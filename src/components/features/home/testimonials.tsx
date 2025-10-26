export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Digital Artist',
      content:
        "The prompts here are incredible! They've helped me create some of my best work.",
      avatar: '👩‍🎨',
    },
    {
      name: 'Mike Rodriguez',
      role: 'Content Creator',
      content:
        'I save hours every week using these curated prompts. The quality is outstanding.',
      avatar: '👨‍💻',
    },
    {
      name: 'Emma Thompson',
      role: 'Marketing Manager',
      content:
        'Perfect for creating engaging visuals for our campaigns. Highly recommend!',
      avatar: '👩‍💼',
    },
  ];

  return (
    <section className="bg-white py-16 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join thousands of creators who trust our platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800"
            >
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <span className="mr-3 text-2xl">{testimonial.avatar}</span>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
