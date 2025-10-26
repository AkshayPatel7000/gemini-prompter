import type { Metadata } from 'next';
import { GalleryPage } from '@/components/features/gallery/gallery-page';

export const metadata: Metadata = {
  title: 'Prompt Gallery',
  description:
    'Browse our complete collection of AI image prompts for Google Gemini. Find the perfect prompt for your next creation.',
  openGraph: {
    title: 'Prompt Gallery - Gemini Prompt Discovery',
    description: 'Browse thousands of AI image prompts for Google Gemini.',
  },
};

export default function Gallery() {
  return <GalleryPage />;
}
