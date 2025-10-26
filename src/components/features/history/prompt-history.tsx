'use client';

import { useState } from 'react';
import {
  Copy,
  Download,
  Trash2,
  Eye,
  Loader2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserPrompts } from '@/hooks/useUserPrompts';
import { toast } from 'sonner';

export function PromptHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { prompts, pagination, loading, error, refetch } = useUserPrompts(
    currentPage,
    10
  );

  const handleCopy = async (prompt: string, id: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      toast.success('Prompt copied to clipboard!');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy prompt');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">
          Loading your prompts...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-6xl">⚠️</div>
        <h3 className="mb-2 text-xl font-semibold text-red-600">
          Error Loading Prompts
        </h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{error}</p>
        <Button onClick={refetch} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-6xl">📝</div>
        <h3 className="mb-2 text-xl font-semibold">No prompts generated yet</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Start generating custom prompts to see them here
        </p>
        <Button asChild>
          <a href="/dashboard/generate">Generate Your First Prompt</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      {pagination && (
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-300">
            Showing {prompts.length} of {pagination.totalCount} prompts
          </p>
          <Button
            onClick={refetch}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      )}

      {/* Prompts List */}
      {prompts.map((item) => (
        <div
          key={item.id}
          className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="p-6">
            <div className="flex items-start gap-4">
              {/* Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.originalImageUrl}
                  alt="Generated prompt"
                  className="h-20 w-20 rounded-lg object-cover"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    {item.metadata.category || 'Custom'}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(item.createdAt)}
                  </span>
                </div>

                <p className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100">
                  {item.prompt}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(item.prompt, item.id)}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    {copiedId === item.id ? 'Copied!' : 'Copy'}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() =>
                      window.open('https://gemini.google.com/', '_blank')
                    }
                  >
                    <Eye className="h-4 w-4" />
                    Use in Gemini
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([item.prompt], {
                        type: 'text/plain',
                      });
                      element.href = URL.createObjectURL(file);
                      element.download = `prompt-${item.id}.txt`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Credits Used */}
              <div className="flex-shrink-0 text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Credits used
                </div>
                <div className="text-lg font-semibold text-purple-600">
                  {item.creditsUsed}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNext}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
