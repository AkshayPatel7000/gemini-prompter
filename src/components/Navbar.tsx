'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu, X, Sparkles, Zap } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';

interface NavbarProps {
  credits?: number;
}

export function Navbar({ credits = 10 }: NavbarProps) {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links - Generate only available when logged in
  const getNavLinks = () => {
    const baseLinks = [
      { name: 'Home', href: '/' },
      { name: 'Gallery', href: '/gallery' },
    ];

    if (session) {
      baseLinks.push({ name: 'Generate', href: '/generate' });
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <>
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="gradient-text text-xl font-extrabold">
                GeminiPrompts
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 transition-colors duration-300 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              {/* Credits & User (Desktop) */}
              <div className="hidden items-center gap-4 md:flex">
                {session ? (
                  <>
                    {/* Credits Badge */}
                    <Link href="/dashboard">
                      <div
                        className={`flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white shadow-lg transition-all hover:scale-105 ${
                          credits < 3 ? 'animate-pulse' : ''
                        }`}
                      >
                        <Zap className="h-4 w-4" />
                        <span>{credits}</span>
                      </div>
                    </Link>

                    {/* User Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:outline-none">
                        <Avatar className="cursor-pointer ring-2 ring-purple-500 transition-all hover:ring-4">
                          <AvatarImage
                            src={
                              session.user?.image ||
                              'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
                            }
                            alt={session.user?.name || 'User'}
                          />
                          <AvatarFallback>
                            {session.user?.name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="glass dark:glass-dark w-56 shadow-2xl">
                        <DropdownMenuLabel>
                          {session.user?.name || 'My Account'}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem asChild>
                          <Link href="/dashboard/generate">Generate</Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()}>
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <Button
                    onClick={() => signIn('google')}
                    className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 text-white shadow-lg hover:from-purple-700 hover:to-blue-700"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Loading...' : 'Login with Google'}
                  </Button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="animate-fadeIn fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-8">
            <div className="flex w-full max-w-sm flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl text-white transition-transform hover:scale-110"
                >
                  {link.name}
                </Link>
              ))}

              {session ? (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white backdrop-blur-md transition-all hover:bg-white/30"
                  >
                    <Zap className="h-5 w-5" />
                    <span className="text-lg">{credits} Credits</span>
                  </Link>
                  <Button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="rounded-full bg-white px-8 text-purple-600 hover:bg-gray-100"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    signIn('google');
                    setMobileMenuOpen(false);
                  }}
                  className="mt-8 rounded-full bg-white px-8 text-purple-600 hover:bg-gray-100"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Loading...' : 'Login with Google'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
