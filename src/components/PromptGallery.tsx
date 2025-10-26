import { PromptCard } from './PromptCard';
import { Prompt } from '../lib/mockData';

interface PromptGalleryProps {
  prompts: Prompt[];
  onCardClick: (id: string) => void;
}

export function PromptGallery({ prompts, onCardClick }: PromptGalleryProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
      {prompts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No prompts found. Try a different filter!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {prompts.map((prompt, index) => (
            <div
              key={prompt.id}
              className="animate-slideUp"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PromptCard prompt={prompt} onCardClick={onCardClick} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
