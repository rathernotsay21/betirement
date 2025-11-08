"use client";

import { VideoCategory } from "@/src/types/video";

interface CategoryFilterProps {
  selectedCategory: VideoCategory | "all";
  onCategoryChange: (category: VideoCategory | "all") => void;
}

const categories: Array<{ value: VideoCategory | "all"; label: string }> = [
  { value: "all", label: "All Videos" },
  { value: "bitcoin-fundamentals", label: "Bitcoin Fundamentals" },
  { value: "retirement-planning", label: "Retirement Planning" },
  { value: "investment-strategies", label: "Investment Strategies" },
  { value: "market-analysis", label: "Market Analysis" },
  { value: "success-stories", label: "Success Stories" },
  { value: "book-club", label: "Book Club" },
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => onCategoryChange(category.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedCategory === category.value
                ? "bg-bitcoin-500 text-white shadow-md"
                : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
}
