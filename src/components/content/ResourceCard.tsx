"use client";

import Image from "next/image";
import { Download, Calculator, FileText, CheckSquare } from "lucide-react";
import type { Resource } from "@/src/types/resource";
import { Button } from "@/src/components/ui/Button";

interface ResourceCardProps {
  resource: Resource;
  onDownload: (resource: Resource) => void;
}

const typeIcons = {
  pdf: FileText,
  calculator: Calculator,
  template: FileText,
  checklist: CheckSquare,
};

const typeLabels = {
  pdf: "PDF Guide",
  calculator: "Calculator",
  template: "Template",
  checklist: "Checklist",
};

const difficultyColors = {
  beginner: "bg-success/10 text-success border-success/20",
  intermediate: "bg-bitcoin-50 text-bitcoin-600 border-bitcoin-200",
  advanced: "bg-trust/10 text-trust border-trust/20",
};

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function ResourceCard({ resource, onDownload }: ResourceCardProps) {
  const Icon = typeIcons[resource.type];

  const handleClick = () => {
    onDownload(resource);
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 w-full bg-gradient-to-br from-bitcoin-50 to-neutral-100">
        {resource.thumbnail ? (
          <Image
            src={resource.thumbnail}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Icon className="w-16 h-16 text-bitcoin-500" />
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${difficultyColors[resource.difficulty]}`}
          >
            {difficultyLabels[resource.difficulty]}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
            <Icon className="w-4 h-4" />
            <span className="font-medium">{typeLabels[resource.type]}</span>
            {resource.category && (
              <>
                <span>•</span>
                <span>{resource.category}</span>
              </>
            )}
          </div>
        </div>

        <h3 className="text-xl font-bold text-black mb-3 font-heading line-clamp-2">
          {resource.title}
        </h3>

        <p className="text-neutral-600 mb-4 line-clamp-3 flex-grow">
          {resource.description}
        </p>

        <div className="space-y-3">
          {(resource.fileSize || resource.pageCount) && (
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              {resource.fileSize && <span>{resource.fileSize}</span>}
              {resource.pageCount && <span>{resource.pageCount} pages</span>}
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            onClick={handleClick}
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            {resource.type === "calculator" ? "Open Calculator" : "Download"}
            {resource.requiresEmail && " (Email Required)"}
          </Button>

          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 border-t border-neutral-200">
              {resource.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
