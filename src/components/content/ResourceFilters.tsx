"use client";

import { ResourceType, ResourceDifficulty } from "@/src/types/resource";

interface ResourceFiltersProps {
  selectedType: ResourceType | "all";
  selectedDifficulty: ResourceDifficulty | "all";
  onTypeChange: (type: ResourceType | "all") => void;
  onDifficultyChange: (difficulty: ResourceDifficulty | "all") => void;
}

const typeOptions: Array<{ value: ResourceType | "all"; label: string }> = [
  { value: "all", label: "All Types" },
  { value: "pdf", label: "PDF Guides" },
  { value: "calculator", label: "Calculators" },
  { value: "template", label: "Templates" },
  { value: "checklist", label: "Checklists" },
];

const difficultyOptions: Array<{ value: ResourceDifficulty | "all"; label: string }> = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function ResourceFilters({
  selectedType,
  selectedDifficulty,
  onTypeChange,
  onDifficultyChange,
}: ResourceFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-lg font-heading font-semibold mb-4">Filter Resources</h2>
      
      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Resource Type
          </label>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onTypeChange(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === option.value
                    ? "bg-bitcoin-500 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Difficulty Level
          </label>
          <div className="flex flex-wrap gap-2">
            {difficultyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onDifficultyChange(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDifficulty === option.value
                    ? "bg-bitcoin-500 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
