'use client';

import { signIn } from 'next-auth/react';
import { X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    signIn('google', { redirectTo: '/dashboard' });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay animate-fadeIn" onClick={handleBackdropClick}>
      {/* Modal */}
      <div className="modal-content animate-scaleIn p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6 flex items-center justify-center">
            <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="gradient-text text-2xl font-bold">
              Gemini Prompts
            </span>
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Generate Custom Prompts
          </h2>
          <p className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
            Sign in to upload images and generate personalized AI prompts
            tailored to your style
          </p>

          {/* Benefits */}
          <div className="mb-6 rounded-xl border border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50 p-5 text-left dark:border-purple-800 dark:from-purple-900/20 dark:to-blue-900/20">
            <h3 className="mb-4 text-center font-semibold text-purple-700 dark:text-purple-300">
              🎁 What you get for free:
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  10 free credits to start generating
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Upload images for custom prompts
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Save and manage prompt history
                </span>
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  Access to premium features
                </span>
              </li>
            </ul>
          </div>

          {/* Sign In Button */}
          <Button
            onClick={handleGoogleSignIn}
            className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-medium text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700 hover:shadow-xl active:scale-[0.98]"
            size="lg"
          >
            <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Footer */}
          <p className="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{' '}
            <a href="/terms" className="text-purple-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-purple-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
