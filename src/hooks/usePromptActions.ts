import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface PromptActionsReturn {
  likePrompt: (promptId: string) => Promise<boolean>;
  updatePromptPrivacy: (
    promptId: string,
    isPublic: boolean
  ) => Promise<boolean>;
  deletePrompt: (promptId: string) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

export function usePromptActions(): PromptActionsReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const likePrompt = useCallback(async (promptId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/prompts/${promptId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to like prompt');
      }

      toast.success(`Prompt ${data.action}!`, {
        description: `${data.likes} ${data.likes === 1 ? 'like' : 'likes'}`,
      });

      return data.hasLiked;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to like prompt';
      setError(errorMessage);
      toast.error('Failed to like prompt', {
        description: errorMessage,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePromptPrivacy = useCallback(
    async (promptId: string, isPublic: boolean): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/prompts/${promptId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isPublic }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to update prompt privacy');
        }

        toast.success(`Prompt is now ${isPublic ? 'public' : 'private'}!`);
        return true;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update prompt';
        setError(errorMessage);
        toast.error('Failed to update prompt', {
          description: errorMessage,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deletePrompt = useCallback(
    async (promptId: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/prompts/${promptId}`, {
          method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to delete prompt');
        }

        toast.success('Prompt deleted successfully!');
        return true;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to delete prompt';
        setError(errorMessage);
        toast.error('Failed to delete prompt', {
          description: errorMessage,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    likePrompt,
    updatePromptPrivacy,
    deletePrompt,
    isLoading,
    error,
  };
}
