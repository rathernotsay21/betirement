"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface QuickWin {
  id: string;
  title: string;
  description: string;
  action: string;
  link: string;
}

interface QuickWinsChecklistProps {
  items: QuickWin[];
}

export function QuickWinsChecklist({ items }: QuickWinsChecklistProps) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const completionPercentage = (completed.size / items.length) * 100;

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-black">
            Quick Wins Checklist
          </h3>
          <span className="text-sm font-medium text-neutral-600">
            {completed.size} of {items.length} completed
          </span>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-300 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const isCompleted = completed.has(item.id);
          return (
            <Card
              key={item.id}
              className={cn(
                "p-6 transition-all duration-200",
                isCompleted && "bg-neutral-50 opacity-75"
              )}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200",
                    isCompleted
                      ? "bg-success border-success"
                      : "border-neutral-300 hover:border-success"
                  )}
                  aria-label={
                    isCompleted
                      ? `Mark "${item.title}" as incomplete`
                      : `Mark "${item.title}" as complete`
                  }
                >
                  {isCompleted && (
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4
                    className={cn(
                      "text-lg font-semibold mb-2",
                      isCompleted
                        ? "text-neutral-500 line-through"
                        : "text-black"
                    )}
                  >
                    {item.title}
                  </h4>
                  <p className="text-neutral-600 text-sm mb-4">
                    {item.description}
                  </p>
                  <Button
                    size="sm"
                    variant={isCompleted ? "outline" : "primary"}
                    href={item.link}
                  >
                    {item.action}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {completed.size === items.length && (
        <div className="mt-6 p-6 bg-success-light/10 border-2 border-success-light rounded-lg text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-success-light rounded-full mb-3">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-black mb-2">
            Congratulations! 🎉
          </h4>
          <p className="text-neutral-700">
            You've completed all the quick wins. Ready to dive deeper?
          </p>
        </div>
      )}
    </div>
  );
}
