import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { validateImageFile, fileToBase64 } from '@/lib/image-utils';

interface GeneratePromptResponse {
  success: boolean;
  prompt?: string;
  metadata?: {
    wordCount: number;
    characterCount: number;
    generatedAt: string;
  };
  error?: string;
}

interface UseGeneratePromptReturn {
  generatePrompt: (file: File) => Promise<string | null>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useGeneratePrompt(): UseGeneratePromptReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const generatePrompt = useCallback(
    async (file: File): Promise<string | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate the image file
        const validation = validateImageFile(file);
        if (!validation.isValid) {
          throw new Error(validation.error || 'Invalid image file');
        }

        // Convert file to base64
        const base64Data = await fileToBase64(file);

        // Make API request
        const response = await fetch('/api/generate-prompt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageData: base64Data,
            imageType: file.type,
          }),
        });

        const data: GeneratePromptResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `HTTP error! status: ${response.status}`
          );
        }

        if (!data.success || !data.prompt) {
          throw new Error(data.error || 'Failed to generate prompt');
        }

        // Show success message
        toast.success('Prompt generated successfully!', {
          description: `Generated ${data.metadata?.wordCount || 0} words`,
        });

        return data.prompt;
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to generate prompt';
        setError(errorMessage);

        // Show error toast
        toast.error('Failed to generate prompt', {
          description: errorMessage,
        });

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    generatePrompt,
    isLoading,
    error,
    clearError,
  };
}
