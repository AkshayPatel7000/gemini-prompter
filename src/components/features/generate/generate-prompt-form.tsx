'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GeneratePromptForm() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedPrompt(null);
      };
      reader.readAsDataURL(file);
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
    setIsGenerating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const mockPrompts = [
      'A breathtaking cyberpunk cityscape at night, neon lights reflecting on wet streets, towering skyscrapers with holographic advertisements, flying vehicles in the distance, cinematic composition, ultra-detailed 8k resolution, moody atmospheric lighting',
      'Majestic fantasy landscape with ancient ruins, mystical fog rolling through valleys, dramatic sunset casting golden rays, magical particles floating in the air, epic scale, highly detailed, concept art style',
      'Abstract digital art with flowing liquid colors, iridescent gradients transitioning from deep purple to vibrant cyan, smooth organic shapes, modern minimalist design, 4k wallpaper quality',
    ];

    setGeneratedPrompt(
      mockPrompts[Math.floor(Math.random() * mockPrompts.length)]
    );
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!uploadedImage ? (
        <div
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragging
              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
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
        <div className="space-y-6">
          {/* Image Preview */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="max-h-[400px] w-full bg-gray-100 object-contain dark:bg-gray-800"
            />
            <Button
              onClick={() => {
                setUploadedImage(null);
                setGeneratedPrompt(null);
              }}
              variant="outline"
              size="sm"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white"
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </div>

          {/* Generate Button */}
          {!generatedPrompt && (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Prompt...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Prompt (1 Credit)
                </>
              )}
            </Button>
          )}

          {/* Generated Prompt */}
          {generatedPrompt && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-semibold text-purple-600 dark:text-purple-400">
                Generated Prompt
              </h3>
              <p className="mb-4 leading-relaxed text-gray-900 dark:text-gray-100">
                {generatedPrompt}
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigator.clipboard.writeText(generatedPrompt)}
                  className="flex-1"
                >
                  Copy Prompt
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open('https://gemini.google.com/', '_blank')
                  }
                >
                  Open Gemini
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
