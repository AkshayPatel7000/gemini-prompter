'use client';

import { Zap, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CreditsDisplayProps {
  credits?: number;
}

export function CreditsDisplay({ credits = 10 }: CreditsDisplayProps) {
  const isLow = credits < 3;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="text-center">
        <div
          className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${
            isLow
              ? 'bg-gradient-to-r from-orange-500 to-red-500'
              : 'bg-gradient-to-r from-purple-600 to-blue-600'
          }`}
        >
          <Zap className="h-8 w-8 text-white" />
        </div>

        <h3 className="mb-2 text-lg font-semibold">Credits Remaining</h3>
        <div
          className={`mb-4 text-3xl font-bold ${
            isLow ? 'text-red-600' : 'text-purple-600'
          }`}
        >
          {credits}
        </div>

        {isLow && (
          <div className="mb-4 rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-900/20">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              ⚠️ Running low on credits! Purchase more to continue generating
              prompts.
            </p>
          </div>
        )}

        <Button
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Buy More Credits
        </Button>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <p>💡 Each prompt generation costs 1 credit</p>
          <p className="mt-1">
            🎁 Get 10 free credits when you invite friends!
          </p>
        </div>
      </div>
    </div>
  );
}
