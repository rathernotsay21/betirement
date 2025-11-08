"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface LearningPath {
  title: string;
  description: string;
  resources: string[];
  nextSteps: string[];
}

interface LearningPathRecommendationProps {
  path: LearningPath;
  onRestart?: () => void;
}

export function LearningPathRecommendation({
  path,
  onRestart,
}: LearningPathRecommendationProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Success Message */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-success-light rounded-full mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-black mb-2">
          Your Personalized Path
        </h2>
        <p className="text-lg text-neutral-600">
          Based on your answers, here's the best way to get started
        </p>
      </div>

      {/* Recommended Path */}
      <Card className="mb-8 p-8 border-2 border-bitcoin-500">
        <div className="flex items-start mb-6">
          <div className="flex-shrink-0 w-12 h-12 bg-bitcoin-500 rounded-lg flex items-center justify-center mr-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">{path.title}</h3>
            <p className="text-neutral-600">{path.description}</p>
          </div>
        </div>

        {/* Recommended Resources */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-black mb-3">
            Recommended Resources
          </h4>
          <ul className="space-y-2">
            {path.resources.map((resource, index) => (
              <li key={index} className="flex items-start">
                <svg
                  className="w-5 h-5 text-bitcoin-500 mr-2 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-neutral-700">{resource}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Steps */}
        <div>
          <h4 className="text-lg font-semibold text-black mb-3">
            Your Next Steps
          </h4>
          <ol className="space-y-2">
            {path.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-bitcoin-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </span>
                <span className="text-neutral-700 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" href="/content/resources">
          Explore Resources
        </Button>
        <Button size="lg" variant="outline" href="/content/videos">
          Watch Videos
        </Button>
        {onRestart && (
          <Button size="lg" variant="ghost" onClick={onRestart}>
            Retake Quiz
          </Button>
        )}
      </div>

      {/* Email Course CTA */}
      <div className="mt-12 text-center">
        <p className="text-neutral-600 mb-4">
          Want personalized guidance delivered to your inbox?
        </p>
        <Button size="lg" variant="secondary" href="#email-course">
          Join Our Free Email Course
        </Button>
      </div>
    </div>
  );
}
