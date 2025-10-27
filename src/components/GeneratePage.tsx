'use client';
import { useState, useRef } from 'react';
import {
  Upload,
  Loader2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PromptGenerationSkeleton } from './ui/loading-skeleton';
import { ErrorBoundary } from './ui/error-boundary';
import { toast } from 'sonner';
import { useGeneratePrompt } from '@/hooks/useGeneratePrompt';
import { validateImageFile, getImageDimensions } from '@/lib/image-utils';

interface GeneratePageProps {
  onCreditsChange?: (credits: number) => void;
  credits?: number;
}

export function GeneratePage({
  onCreditsChange = () => {},
  credits = 10,
}: GeneratePageProps) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imageMetadata, setImageMetadata] = useState<{
    size: number;
    dimensions?: { width: number; height: number };
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    generatePrompt,
    isLoading: isGenerating,
    error,
    clearError,
  } = useGeneratePrompt();

  const handleFileSelect = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Clear previous error
    clearError();

    // Validate the file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.error || 'Invalid image file');
      return;
    }

    try {
      // Get image dimensions
      const dimensions = await getImageDimensions(file);

      // Read file as data URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setUploadedFile(file);
        setGeneratedPrompt(null);
        setImageMetadata({
          size: file.size,
          dimensions,
        });
      };
      reader.onerror = () => {
        toast.error('Failed to read image file');
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error('Failed to process image file');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleGenerate = async () => {
    if (credits < 1) {
      toast.error(
        'Not enough credits! Please purchase more credits to continue.'
      );
      return;
    }

    if (!uploadedFile) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      const result = await generatePrompt(uploadedFile);
      if (result) {
        setGeneratedPrompt(result.prompt);
        onCreditsChange(credits - 1);
        // Store promptId for future use (like sharing, editing, etc.)
        if (result.promptId) {
          console.log('Prompt saved with ID:', result.promptId);
        }
      }
    } catch (error) {
      // Error is already handled by the hook
      console.error('Failed to generate prompt:', error);
    }
  };

  const handleCopy = async () => {
    if (generatedPrompt) {
      try {
        await navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback for environments where clipboard API is blocked
        const textArea = document.createElement('textarea');
        textArea.value = generatedPrompt;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success('Prompt copied to clipboard!');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          toast.error('Unable to copy. Please select and copy manually.');
        }
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="animate-fadeIn mb-12 text-center">
            <h1 className="mb-4 text-4xl md:text-5xl">
              <span className="gradient-text">Generate Custom Prompts</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Upload an image and let AI create the perfect Gemini prompt for
              you
            </p>
          </div>

          {/* Upload Area */}
          {!uploadedImage ? (
            <div
              className={`animate-slideUp cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
            >
              <Upload className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h3 className="mb-2 text-xl text-gray-700 dark:text-gray-300">
                Drag & drop image or click to browse
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                PNG, JPG up to 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="animate-slideUp space-y-6">
              {/* Image Preview */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-h-[500px] w-full bg-gray-900 object-contain"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    onClick={() => {
                      setUploadedImage(null);
                      setUploadedFile(null);
                      setGeneratedPrompt(null);
                      setImageMetadata(null);
                      clearError();
                    }}
                    variant="outline"
                    className="bg-white/90 hover:bg-white"
                  >
                    Change Image
                  </Button>
                </div>
              </div>

              {/* Image Metadata */}
              {imageMetadata && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span>
                    Size: {(imageMetadata.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                  {imageMetadata.dimensions && (
                    <span>
                      Dimensions: {imageMetadata.dimensions.width} ×{' '}
                      {imageMetadata.dimensions.height}
                    </span>
                  )}
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div className="animate-slideUp rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                    <div className="flex-1">
                      <h3 className="mb-1 font-medium text-red-800 dark:text-red-200">
                        Generation Failed
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {error}
                      </p>
                    </div>
                    <Button
                      onClick={clearError}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              )}

              {/* Generate Button */}
              {!generatedPrompt && (
                <div className="space-y-4">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || credits < 1 || !uploadedFile}
                    className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg text-white shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing image...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Generate Prompt (1 credit)
                      </>
                    )}
                  </Button>

                  {credits < 1 && (
                    <p className="text-center text-sm text-red-600 dark:text-red-400">
                      Not enough credits. Please purchase more to continue.
                    </p>
                  )}
                </div>
              )}

              {/* Loading State */}
              {isGenerating && !generatedPrompt && <PromptGenerationSkeleton />}

              {/* Result Display */}
              {generatedPrompt && !isGenerating && (
                <div className="animate-slideUp space-y-6">
                  {/* Prompt Box */}
                  <div className="relative rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-lg dark:bg-gray-800">
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={handleCopy}
                        className="glass dark:glass-dark rounded-lg p-2 transition-transform hover:scale-110"
                        title="Copy prompt"
                      >
                        {copied ? (
                          <Check className="animate-scaleIn h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-purple-600" />
                        )}
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating || credits < 1}
                        className="glass dark:glass-dark rounded-lg p-2 transition-transform hover:scale-110 disabled:opacity-50"
                        title="Generate new prompt"
                      >
                        <RefreshCw
                          className={`h-5 w-5 text-purple-600 ${isGenerating ? 'animate-spin' : ''}`}
                        />
                      </button>
                    </div>
                    <h3 className="mb-4 text-purple-600 dark:text-purple-400">
                      Generated Prompt
                    </h3>
                    <p className="pr-20 leading-relaxed text-gray-700 dark:text-gray-300">
                      {generatedPrompt}
                    </p>
                    <div className="mt-4 flex gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{generatedPrompt.split(' ').length} words</span>
                      <span>{generatedPrompt.length} characters</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-3">
                    <Badge className="rounded-full border-0 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-white">
                      Cinematic Style
                    </Badge>
                    <Badge className="rounded-full border-0 bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-2 text-white">
                      8K Quality
                    </Badge>
                    <Badge className="rounded-full border-0 bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-white">
                      Professional
                    </Badge>
                  </div>

                  {/* Usage Instructions */}
                  <div className="space-y-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-6 dark:from-purple-900/20 dark:to-blue-900/20">
                    <h3 className="text-purple-600 dark:text-purple-400">
                      How to use this prompt
                    </h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                          1
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Copy the prompt using the button above
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                          2
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Open Google Gemini or your preferred AI image
                          generator
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-600 text-white">
                          3
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Paste and generate your amazing image!
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full border-purple-300 hover:bg-purple-50 dark:border-purple-700 dark:hover:bg-purple-900/30"
                      onClick={() =>
                        window.open('https://gemini.google.com/', '_blank')
                      }
                    >
                      Open Gemini
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
