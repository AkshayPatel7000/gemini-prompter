'use client';

import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Zap } from 'lucide-react';
import { Navbar } from '../Navbar';

export function PublicNavbar() {
  const { data: session } = useSession();

  return (
    <Navbar />
    // <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
    //   <div className="container mx-auto px-4">
    //     <div className="flex h-16 items-center justify-between">
    //       <Link href="/" className="flex items-center space-x-2">
    //         <Zap className="h-8 w-8 text-purple-600" />
    //         <span className="text-xl font-bold">Gemini Prompts</span>
    //       </Link>

    //       <div className="hidden items-center space-x-8 md:flex">
    //         <Link
    //           href="/about"
    //           className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    //         >
    //           About
    //         </Link>
    //         <Link
    //           href="/contact"
    //           className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
    //         >
    //           Contact
    //         </Link>
    //       </div>

    //       <div className="flex items-center space-x-4">
    //         <ThemeToggle />
    //         {session ? (
    //           <Button asChild>
    //             <Link href="/dashboard">Dashboard</Link>
    //           </Button>
    //         ) : (
    //           <Button
    //             onClick={() => {
    //               document.getElementById('prompts-section')?.scrollIntoView({
    //                 behavior: 'smooth',
    //               });
    //             }}
    //             variant="ghost"
    //           >
    //             Browse Prompts
    //           </Button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}
