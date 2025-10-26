import { Flame, Clock, Grid3x3 } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { categories } from '../lib/mockData';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  const filters = [
    { id: 'trending', label: 'Trending', icon: Flame },
    { id: 'recent', label: 'Recent', icon: Clock },
  ];

  return (
    <div className="animate-slideUp sticky top-16 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Buttons */}
          {filters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            return (
              <Button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {filter.label}
              </Button>
            );
          })}

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={`rounded-full transition-all duration-300 ${
                  activeCategory !== 'All'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'border border-gray-300 bg-white text-gray-700 hover:border-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                <Grid3x3 className="mr-2 h-4 w-4" />
                {activeCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass dark:glass-dark shadow-xl">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={
                    activeCategory === category
                      ? 'bg-purple-100 dark:bg-purple-900/30'
                      : ''
                  }
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
