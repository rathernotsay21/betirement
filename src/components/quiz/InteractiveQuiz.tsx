"use client";

import { useState } from "react";
import { QuizQuestion, QuizResults } from "@/types/form";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResults) => void;
}

export function InteractiveQuiz({
  questions,
  onComplete,
}: InteractiveQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleOptionSelect = (option: string) => {
    if (question.type === "single") {
      setSelectedOptions([option]);
    } else {
      // Multiple selection
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option]
      );
    }
  };

  const handleNext = () => {
    // Save answer
    const answer =
      question.type === "single" ? selectedOptions[0] : selectedOptions;
    setAnswers((prev) => ({ ...prev, [question.id]: answer }));

    if (isLastQuestion) {
      // Calculate results and complete quiz
      const finalAnswers = { ...answers, [question.id]: answer };
      const results = calculateResults(finalAnswers);
      onComplete(results);
    } else {
      // Move to next question
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOptions([]);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      // Restore previous answer
      const prevAnswer = answers[questions[currentQuestion - 1].id];
      setSelectedOptions(
        Array.isArray(prevAnswer) ? prevAnswer : [prevAnswer as string]
      );
    }
  };

  const calculateResults = (
    finalAnswers: Record<string, string | string[]>
  ): QuizResults => {
    // Determine recommended path based on answers
    const experienceAnswer = finalAnswers.experience as string;
    const goalAnswer = finalAnswers.goal as string;

    let recommendedPath = "intermediate";

    if (
      experienceAnswer?.includes("Complete beginner") ||
      experienceAnswer?.includes("Curious learner")
    ) {
      recommendedPath = "beginner";
    } else if (
      experienceAnswer?.includes("Experienced holder") &&
      goalAnswer?.includes("Achieve early retirement")
    ) {
      recommendedPath = "ready";
    } else if (
      experienceAnswer?.includes("Active investor") &&
      (goalAnswer?.includes("Optimize") || goalAnswer?.includes("Build"))
    ) {
      recommendedPath = "advanced";
    }

    return {
      score: Object.keys(finalAnswers).length,
      answers: finalAnswers,
      recommendedPath,
    };
  };

  const canProceed =
    selectedOptions.length > 0 ||
    (question.type === "multiple" && selectedOptions.length > 0);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-neutral-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-neutral-600">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-bitcoin-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-black mb-6">
          {question.question}
        </h2>

        {question.type === "multiple" && (
          <p className="text-sm text-neutral-600 mb-4">
            Select all that apply
          </p>
        )}

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option: string, index: number) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all duration-200",
                  "hover:border-bitcoin-500 hover:bg-bitcoin-50",
                  isSelected
                    ? "border-bitcoin-500 bg-bitcoin-50 shadow-md"
                    : "border-neutral-200 bg-white"
                )}
              >
                <div className="flex items-center">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0",
                      isSelected
                        ? "border-bitcoin-500 bg-bitcoin-500"
                        : "border-neutral-300"
                    )}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
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
                  </div>
                  <span className="text-base text-neutral-900">{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentQuestion === 0}
        >
          Back
        </Button>

        <Button onClick={handleNext} disabled={!canProceed}>
          {isLastQuestion ? "See My Results" : "Next Question"}
        </Button>
      </div>
    </div>
  );
}
