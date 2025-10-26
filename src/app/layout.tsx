import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { AuthProvider } from '@/providers/auth-provider';
import { PublicNavbar } from '@/components/layout/public-navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Gemini Prompt Discovery - AI Image Prompt Generator',
    template: '%s | Gemini Prompt Discovery',
  },
  description:
    'Discover, generate, and share AI image prompts for Gemini. Create stunning visuals with our curated prompt library and advanced generation tools.',
  keywords: [
    'AI prompts',
    'Gemini',
    'image generation',
    'AI art',
    'prompt engineering',
  ],
  authors: [{ name: 'Gemini Prompt Discovery Team' }],
  creator: 'Gemini Prompt Discovery',
  publisher: 'Gemini Prompt Discovery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Gemini Prompt Discovery - AI Image Prompt Generator',
    description:
      'Discover, generate, and share AI image prompts for Gemini. Create stunning visuals with our curated prompt library.',
    siteName: 'Gemini Prompt Discovery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gemini Prompt Discovery - AI Image Prompt Generator',
    description: 'Discover, generate, and share AI image prompts for Gemini.',
    creator: '@geminiprompts',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <PublicNavbar />
              <main className="flex-1">{children}</main>
            </div>

            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
