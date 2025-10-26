'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Prompt Generation
          </div>

          <h1 className="mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent lg:text-7xl">
            Create Stunning AI Images with Perfect Prompts
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Discover thousands of curated prompts or generate custom ones for
            Gemini. Transform your ideas into breathtaking visuals with our
            AI-powered platform.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link href="/auth/signin">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="animate-float absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter"></div>
        <div
          className="animate-float absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-blue-300 opacity-20 mix-blend-multiply blur-xl filter"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
    </section>
  );
}
