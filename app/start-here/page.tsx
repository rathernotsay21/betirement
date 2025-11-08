"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { QuizResults } from "@/types/form";
import {
  QuickWinsChecklist,
} from "@/components/quiz";
import { EmailCaptureForm } from "@/components/forms/EmailCaptureForm";
import quizData from "@/data/quiz/start-here-quiz.json";

// Dynamic imports for heavy interactive components
const InteractiveQuiz = dynamic(
  () => import("@/components/quiz").then((mod) => mod.InteractiveQuiz),
  {
    loading: () => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bitcoin-500"></div>
        <p className="mt-4 text-neutral-600">Loading quiz...</p>
      </div>
    ),
    ssr: false,
  }
);

const LearningPathRecommendation = dynamic(
  () => import("@/components/quiz").then((mod) => mod.LearningPathRecommendation),
  {
    loading: () => (
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bitcoin-500"></div>
        <p className="mt-4 text-neutral-600">Loading results...</p>
      </div>
    ),
    ssr: false,
  }
);

type QuizState = "intro" | "quiz" | "results";

interface LearningPath {
  title: string;
  description: string;
  resources: string[];
  nextSteps: string[];
}

export default function StartHerePage() {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [results, setResults] = useState<QuizResults | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);

  const handleStartQuiz = () => {
    setQuizState("quiz");
    // Track quiz start in analytics
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Quiz Started", {
        props: { page: "start-here" },
      });
    }
  };

  const handleQuizComplete = (quizResults: QuizResults) => {
    setResults(quizResults);
    const path =
      quizData.learningPaths[
        quizResults.recommendedPath as keyof typeof quizData.learningPaths
      ];
    setLearningPath(path);
    setQuizState("results");

    // Track quiz completion in analytics
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible("Quiz Completed", {
        props: {
          page: "start-here",
          path: quizResults.recommendedPath,
        },
      });
    }
  };

  const handleRestartQuiz = () => {
    setQuizState("intro");
    setResults(null);
    setLearningPath(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bitcoin-500 to-bitcoin-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Start Your Bitcoin Retirement Journey
            </h1>
            <p className="text-xl md:text-2xl text-bitcoin-50 mb-8">
              Not sure where to begin? Take our 2-minute quiz to get a
              personalized learning path tailored to your goals and experience
              level.
            </p>
            {quizState === "intro" && (
              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center px-8 py-4 bg-white text-bitcoin-600 font-semibold rounded-lg hover:bg-bitcoin-50 transition-colors duration-200 text-lg shadow-lg"
              >
                Take the Quiz
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {quizState === "intro" && (
            <div className="max-w-4xl mx-auto">
              {/* Why Take the Quiz */}
              <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">
                  Why Take This Quiz?
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-bitcoin-600"
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
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Personalized Path
                    </h3>
                    <p className="text-neutral-600">
                      Get recommendations based on your experience and goals
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-bitcoin-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Save Time
                    </h3>
                    <p className="text-neutral-600">
                      Skip the overwhelm and focus on what matters most
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-bitcoin-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Actionable Steps
                    </h3>
                    <p className="text-neutral-600">
                      Get clear next steps you can implement today
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Wins Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6 text-center">
                  Quick Wins to Get Started
                </h2>
                <p className="text-center text-neutral-600 mb-8 max-w-2xl mx-auto">
                  While you're here, check off these quick actions to jumpstart
                  your Bitcoin retirement journey
                </p>
                <QuickWinsChecklist items={quizData.quickWins} />
              </div>
            </div>
          )}

          {quizState === "quiz" && (
            <InteractiveQuiz
              questions={quizData.questions as any}
              onComplete={handleQuizComplete}
            />
          )}

          {quizState === "results" && learningPath && (
            <LearningPathRecommendation
              path={learningPath}
              onRestart={handleRestartQuiz}
            />
          )}
        </div>
      </section>

      {/* Email Course Section */}
      <section id="email-course" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                Join Our Free 5-Day Email Course
              </h2>
              <p className="text-xl text-neutral-600">
                Get daily lessons on Bitcoin retirement strategies delivered
                straight to your inbox
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-8 mb-8">
              <h3 className="text-xl font-semibold text-black mb-4">
                What You'll Learn:
              </h3>
              <ul className="space-y-3">
                {[
                  "Day 1: Bitcoin Basics for Retirement Planning",
                  "Day 2: Calculating Your Bitcoin Retirement Number",
                  "Day 3: Dollar-Cost Averaging Strategies",
                  "Day 4: Secure Storage and Risk Management",
                  "Day 5: Tax-Efficient Bitcoin Strategies",
                ].map((lesson, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-success mr-3 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-neutral-700">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            <EmailCaptureForm
              variant="inline"
              leadMagnet="5-Day Bitcoin Retirement Email Course"
              tags={["email-course", "start-here"]}
            />

            <p className="text-sm text-neutral-500 text-center mt-4">
              Join 10,000+ people learning about Bitcoin retirement. Unsubscribe
              anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-black mb-6">
              Explore More Resources
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Ready to dive deeper? Check out our full library of content
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/content/videos"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-bitcoin-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-bitcoin-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Video Library
                </h3>
                <p className="text-neutral-600 text-sm">
                  Watch in-depth tutorials and strategies
                </p>
              </a>
              <a
                href="/content/blog"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-bitcoin-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-bitcoin-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Blog Articles
                </h3>
                <p className="text-neutral-600 text-sm">
                  Read detailed guides and insights
                </p>
              </a>
              <a
                href="/content/resources"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-bitcoin-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-bitcoin-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">
                  Free Resources
                </h3>
                <p className="text-neutral-600 text-sm">
                  Download guides and use calculators
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
