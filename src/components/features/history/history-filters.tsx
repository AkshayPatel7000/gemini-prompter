'use client';

import { useState } from 'react';
import { Calendar, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HistoryFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const dateOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'cyberpunk', label: 'Cyberpunk' },
    { value: 'fantasy', label: 'Fantasy' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'nature', label: 'Nature' },
    { value: 'portrait', label: 'Portrait' },
  ];

  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
          <input
            type="text"
            placeholder="Search your prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            {dateOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={() => {
            setSearchQuery('');
            setDateFilter('all');
            setCategoryFilter('all');
          }}
          className="whitespace-nowrap"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
