import { Zap } from 'lucide-react';

interface CreditsDisplayProps {
  credits: number;
}

export function CreditsDisplay({ credits }: CreditsDisplayProps) {
  const isLow = credits < 3;

  return (
    <div
      className={`glass dark:glass-dark fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-full px-6 py-3 shadow-2xl ${
        isLow
          ? 'animate-pulse bg-gradient-to-r from-orange-500 to-red-500 text-white'
          : ''
      }`}
    >
      <Zap
        className={`h-5 w-5 ${isLow ? 'animate-bounce' : 'text-purple-600'}`}
      />
      <span className={isLow ? '' : 'text-gray-700 dark:text-gray-300'}>
        {credits} {credits === 1 ? 'credit' : 'credits'} remaining
      </span>
    </div>
  );
}
