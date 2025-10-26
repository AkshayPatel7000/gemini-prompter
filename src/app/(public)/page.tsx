import type { Metadata } from 'next';
import { LandingPage } from '@/components/features/landing/landing-page';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Discover, generate, and share AI image prompts for Gemini. Create stunning visuals with our curated prompt library and advanced generation tools.',
  openGraph: {
    title: 'Gemini Prompt Discovery - AI Image Prompt Generator',
    description: 'Discover, generate, and share AI image prompts for Gemini.',
    type: 'website',
  },
};

export default function HomePage() {
  return <LandingPage />;
}
