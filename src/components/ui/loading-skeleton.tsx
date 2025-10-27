import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-800',
        className
      )}
      {...props}
    />
  );
}

export function PromptGenerationSkeleton() {
  return (
    <div className="animate-slideUp space-y-6">
      {/* Prompt Box Skeleton */}
      <div className="relative rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="absolute top-4 right-4 flex gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
        <Skeleton className="mb-4 h-6 w-32" />
        <div className="space-y-3 pr-20">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="mt-4 flex gap-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>

      {/* Metadata Skeleton */}
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-8 w-24 rounded-full" />
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-full" />
      </div>

      {/* Instructions Skeleton */}
      <div className="space-y-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 dark:from-purple-900/20 dark:to-blue-900/20">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-4 h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
