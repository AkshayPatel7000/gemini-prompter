import { useState } from 'react';
import {
  Heart,
  Eye,
  Copy,
  Check,
  Download,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import { Prompt, mockPrompts } from '../lib/mockData';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface PromptDetailPageProps {
  promptId: string;
  onBack: () => void;
  onCardClick: (id: string) => void;
}

export function PromptDetailPage({
  promptId,
  onBack,
  onCardClick,
}: PromptDetailPageProps) {
  const prompt = mockPrompts.find((p) => p.id === promptId);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-6 lg:px-8">
          <p className="text-gray-500 dark:text-gray-400">Prompt not found</p>
          <Button onClick={onBack} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for environments where clipboard API is blocked
      const textArea = document.createElement('textarea');
      textArea.value = prompt.prompt;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        toast.success('Prompt copied to clipboard!');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
        toast.error('Unable to copy. Please select and copy manually.');
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: prompt.prompt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  const relatedPrompts = mockPrompts
    .filter((p) => p.id !== promptId && p.category === prompt.category)
    .slice(0, 3);

  const tagColors = [
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Gallery
        </Button>

        {/* Main Content */}
        <div className="animate-fadeIn grid gap-8 lg:grid-cols-[60%_40%]">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
              <ImageWithFallback
                src={prompt.imageUrl}
                alt={prompt.title}
                className="max-h-screen w-full object-contain"
              />
            </div>

            {/* Image Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="glass dark:glass-dark flex-1 transition-transform hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="glass dark:glass-dark flex-1 transition-transform hover:scale-105"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Heading */}
            <div>
              <h1 className="mb-2 text-3xl md:text-4xl">
                <span className="gradient-text">{prompt.title}</span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                by {prompt.author} • {prompt.createdAt}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <button
                onClick={() => setLiked(!liked)}
                className="flex items-center gap-2 text-gray-600 transition-colors hover:text-red-500 dark:text-gray-400"
              >
                <Heart
                  className={`h-5 w-5 ${
                    liked ? 'animate-heartPop fill-red-500 text-red-500' : ''
                  }`}
                />
                <span>{prompt.likes + (liked ? 1 : 0)}</span>
              </button>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Eye className="h-5 w-5" />
                <span>{prompt.views}</span>
              </div>
            </div>

            {/* Prompt Text */}
            <div className="relative rounded-xl border-l-4 border-purple-500 bg-white p-6 shadow-lg dark:bg-gray-800">
              <button
                onClick={handleCopy}
                className="glass dark:glass-dark absolute top-4 right-4 rounded-lg p-2 transition-transform hover:scale-110"
              >
                {copied ? (
                  <Check className="animate-scaleIn h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-purple-600" />
                )}
              </button>
              <h3 className="mb-3 text-purple-600 dark:text-purple-400">
                Full Prompt
              </h3>
              <p className="pr-12 leading-relaxed text-gray-700 dark:text-gray-300">
                {prompt.prompt}
              </p>
            </div>

            {/* Copy Button */}
            <Button
              onClick={handleCopy}
              className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-6 text-lg text-white shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-5 w-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5" />
                  Copy Prompt
                </>
              )}
            </Button>

            {/* Metadata */}
            <div className="space-y-4">
              {/* Category */}
              <div>
                <h4 className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Category
                </h4>
                <Badge className="border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  {prompt.category}
                </Badge>
              </div>

              {/* Tags */}
              <div>
                <h4 className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {prompt.tags.map((tag, index) => (
                    <span
                      key={tag}
                      className={`cursor-pointer rounded-full px-3 py-1 text-sm transition-transform hover:scale-105 ${
                        tagColors[index % tagColors.length]
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <div>
                <h3 className="mb-4">Related Prompts</h3>
                <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                  {relatedPrompts.map((related) => (
                    <div
                      key={related.id}
                      onClick={() => onCardClick(related.id)}
                      className="group w-48 flex-shrink-0 cursor-pointer snap-start"
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                        <ImageWithFallback
                          src={related.imageUrl}
                          alt={related.title}
                          className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="bg-white p-3 dark:bg-gray-800">
                          <h4 className="line-clamp-1 text-sm">
                            {related.title}
                          </h4>
                          <p className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                            {related.prompt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
