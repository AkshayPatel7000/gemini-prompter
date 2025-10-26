'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">
          Ready to Create Amazing AI Images?
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-purple-100">
          Join our community of creators and start generating stunning visuals
          today. Get 10 free credits when you sign up!
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/auth/signin">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
