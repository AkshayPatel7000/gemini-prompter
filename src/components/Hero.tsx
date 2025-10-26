'use client';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface HeroProps {
  onNavigate: (action: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600">
      {/* Particle Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="animate-float absolute top-10 left-10 h-2 w-2 rounded-full bg-white" />
        <div
          className="animate-float absolute top-20 right-20 h-3 w-3 rounded-full bg-white"
          style={{ animationDelay: '0.5s' }}
        />
        <div
          className="animate-float absolute bottom-20 left-1/4 h-2 w-2 rounded-full bg-white"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="animate-float absolute top-1/2 right-1/4 h-4 w-4 rounded-full bg-white"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="animate-float absolute right-10 bottom-10 h-2 w-2 rounded-full bg-white"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32 lg:px-8">
        <div className="animate-fadeIn space-y-8 text-center">
          {/* Main Heading */}
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Sparkles className="animate-bounce-slow h-12 w-12 text-white drop-shadow-lg md:h-16 md:w-16" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-12 w-12 text-white/30 md:h-16 md:w-16" />
                </div>
              </div>
            </div>
            <h1 className="hero-title font-extrabold tracking-tight text-white">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-yellow-200 via-white to-blue-200 bg-clip-text text-transparent">
                Gemini Image Prompts
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <div className="mx-auto max-w-4xl px-4">
            <p className="text-lg leading-relaxed font-medium text-white/95 md:text-xl lg:text-2xl">
              Browse thousands of curated AI prompts or create your own with
              just an image.
              <br className="hidden sm:block" />
              <span className="text-white/80">
                Perfect for Google Gemini image generation.
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 px-4 pt-8 sm:flex-row sm:gap-6">
            <Button
              onClick={() => onNavigate('generate')}
              className="animate-float group hover:shadow-3xl relative min-w-[220px] overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-purple-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50 active:scale-95"
            >
              <span className="relative z-10 flex items-center justify-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Generate from Image
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Button>
            <Button
              onClick={() => {
                document.getElementById('prompts-section')?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              variant="outline"
              className="animate-float group min-w-[220px] rounded-full border-2 border-white/80 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/20 hover:shadow-xl active:scale-95"
              style={{ animationDelay: '0.3s' }}
            >
              <span className="flex items-center justify-center">
                Browse Prompts
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
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 px-4 pt-16 md:gap-16">
            <div className="group text-center">
              <div className="text-3xl font-bold text-white transition-transform group-hover:scale-110 md:text-4xl">
                10k+
              </div>
              <div className="font-medium text-white/80">Curated Prompts</div>
            </div>
            <div className="group text-center">
              <div className="text-3xl font-bold text-white transition-transform group-hover:scale-110 md:text-4xl">
                50k+
              </div>
              <div className="font-medium text-white/80">Happy Users</div>
            </div>
            <div className="group text-center">
              <div className="text-3xl font-bold text-white transition-transform group-hover:scale-110 md:text-4xl">
                1M+
              </div>
              <div className="font-medium text-white/80">Images Generated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-white dark:text-gray-900"
          />
        </svg>
      </div>
    </div>
  );
}
