'use client';

import { useState } from 'react';
import { Button } from '@/src/components/ui';

export function VideoIntroduction() {
  const [showTranscript, setShowTranscript] = useState(false);

  // Placeholder YouTube video ID - replace with actual video
  const videoId = 'dQw4w9WgXcQ';

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Meet Michael
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Watch this 3-minute introduction to learn about my journey from corporate employee to Bitcoin-powered early retiree.
            </p>
          </div>

          {/* Video embed */}
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl mb-8">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Michael's Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-bitcoin-500 rounded-lg hover:bg-bitcoin-600 transition-colors shadow-lg hover:shadow-xl"
              onClick={() => {
                // Trigger download
                const link = document.createElement('a');
                link.href = '/downloads/my-story.pdf';
                link.download = 'betirement-my-story.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download My Story (PDF)
            </button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowTranscript(!showTranscript)}
            >
              {showTranscript ? 'Hide' : 'Show'} Transcript
            </Button>
          </div>

          {/* Transcript */}
          {showTranscript && (
            <div className="bg-neutral-50 rounded-lg p-6 md:p-8 border border-neutral-200">
              <h3 className="text-xl font-bold mb-4">Video Transcript</h3>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Hi, I'm Michael. At 51 years old, I made the decision to retire from my 28-year corporate career, 
                  and Bitcoin played a crucial role in making that possible.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  My journey started like many of yours - working hard, saving diligently, and following the traditional 
                  retirement playbook. But in 2017, I discovered Bitcoin, and it changed everything.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  I spent years researching, learning, and carefully implementing Bitcoin strategies alongside my 
                  traditional investments. The result? Financial freedom years earlier than I ever thought possible.
                </p>
                <p className="text-neutral-700 leading-relaxed mb-4">
                  Now, I'm dedicated to helping others understand how Bitcoin can accelerate their path to retirement. 
                  This isn't about get-rich-quick schemes or risky speculation. It's about sound strategies, proven 
                  principles, and real results.
                </p>
                <p className="text-neutral-700 leading-relaxed">
                  Whether you're just starting to learn about Bitcoin or you're already investing, I'm here to share 
                  what I've learned and help you build your own path to financial freedom.
                </p>
              </div>
            </div>
          )}

          {/* Related content suggestions */}
          <div className="mt-12 pt-12 border-t border-neutral-200">
            <h3 className="text-2xl font-bold text-center mb-8">Continue Learning</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/start-here"
                className="bg-neutral-50 rounded-lg p-6 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <div className="text-bitcoin-500 mb-3">
                  <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Start Here</h4>
                <p className="text-neutral-600 text-sm">New to Betirement? Begin your journey with our guided path.</p>
              </a>
              <a
                href="/content/videos"
                className="bg-neutral-50 rounded-lg p-6 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <div className="text-bitcoin-500 mb-3">
                  <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Watch Videos</h4>
                <p className="text-neutral-600 text-sm">Explore our library of Bitcoin and retirement content.</p>
              </a>
              <a
                href="/content/resources"
                className="bg-neutral-50 rounded-lg p-6 hover:shadow-lg transition-shadow border border-neutral-200"
              >
                <div className="text-bitcoin-500 mb-3">
                  <svg className="w-8 h-8" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Free Resources</h4>
                <p className="text-neutral-600 text-sm">Download guides, calculators, and tools to help you succeed.</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
