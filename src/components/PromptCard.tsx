import { useState } from 'react';
import { Heart, Eye, Copy, Check } from 'lucide-react';
import { Prompt } from '../lib/mockData';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface PromptCardProps {
  prompt: Prompt;
  onCardClick: (id: string) => void;
}

export function PromptCard({ prompt, onCardClick }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for environments where clipboard API is blocked
      toast.success(
        'Prompt text ready to copy: ' + prompt.prompt.substring(0, 50) + '...'
      );
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const tagColors = [
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ];

  return (
    <div
      className="group animate-fadeIn cursor-pointer"
      onClick={() => onCardClick(prompt.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden">
          <ImageWithFallback
            src={prompt.imageUrl}
            alt={prompt.title}
            className={`h-full w-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />

          {/* Overlay on Hover */}
          {isHovered && (
            <div className="animate-fadeIn absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <button
                onClick={handleCopy}
                className="rounded-full bg-white p-4 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
              >
                {copied ? (
                  <Check className="animate-scaleIn h-6 w-6 text-green-600" />
                ) : (
                  <Copy className="h-6 w-6 text-purple-600" />
                )}
              </button>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
              {prompt.category}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          {/* Title */}
          <h3 className="line-clamp-1">{prompt.title}</h3>

          {/* Prompt Preview */}
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {prompt.prompt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {prompt.tags.slice(0, 3).map((tag, index) => (
              <span
                key={tag}
                className={`rounded-full px-3 py-1 text-xs ${
                  tagColors[index % tagColors.length]
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-gray-600 transition-colors hover:text-red-500 dark:text-gray-400"
            >
              <Heart
                className={`h-4 w-4 ${
                  liked ? 'animate-heartPop fill-red-500 text-red-500' : ''
                }`}
              />
              <span className="text-sm">{prompt.likes + (liked ? 1 : 0)}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Eye className="h-4 w-4" />
              <span className="text-sm">{prompt.views}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
