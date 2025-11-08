'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface BlogFiltersProps {
  categories: string[];
  tags: string[];
  currentCategory?: string;
  currentTag?: string;
}

export default function BlogFilters({
  categories,
  tags,
  currentCategory,
  currentTag,
}: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentCategory === category) {
      params.delete('category');
    } else {
      params.set('category', category);
      params.delete('tag'); // Clear tag when selecting category
    }
    router.push(`/content/blog?${params.toString()}`);
  };

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
      params.delete('category'); // Clear category when selecting tag
    }
    router.push(`/content/blog?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    router.push(`/content/blog?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-bold text-lg mb-3 text-black font-heading">Search</h3>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500"
          />
          <button
            type="submit"
            className="w-full mt-2 bg-bitcoin-500 text-white px-4 py-2 rounded-lg hover:bg-bitcoin-600 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-3 text-black font-heading">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    currentCategory === category
                      ? 'bg-bitcoin-500 text-white'
                      : 'hover:bg-neutral-100 text-neutral-700'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-3 text-black font-heading">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  currentTag === tag
                    ? 'bg-bitcoin-500 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
