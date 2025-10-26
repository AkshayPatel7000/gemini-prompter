import { Search, Wand2, Download } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Discover Prompts',
      description:
        'Browse our curated library of high-quality AI image prompts across various categories.',
    },
    {
      icon: Wand2,
      title: 'Generate Custom Prompts',
      description:
        'Use our AI-powered tools to create personalized prompts tailored to your vision.',
    },
    {
      icon: Download,
      title: 'Create & Share',
      description:
        'Generate stunning images with Gemini and share your creations with the community.',
    },
  ];

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
          <p className="mx-auto text-gray-600 dark:text-gray-300">
            Get started with AI image generation in three simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <step.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
