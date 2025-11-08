'use client';

const speakingTopics = [
  {
    id: 1,
    title: 'Bitcoin-Powered Early Retirement',
    duration: '45-60 minutes',
    format: 'Keynote',
    description: 'My personal journey from corporate employee to retired at 51 using Bitcoin strategies. Learn the exact steps I took, mistakes I made, and lessons learned along the way.',
    keyTakeaways: [
      'How to calculate your Bitcoin retirement number',
      'Risk management strategies for volatile assets',
      'Tax-efficient Bitcoin accumulation methods',
      'When to take profits and rebalance',
    ],
    audienceLevel: 'All levels',
    icon: '🚀',
  },
  {
    id: 2,
    title: 'Bitcoin 101: Understanding Digital Gold',
    duration: '30-45 minutes',
    format: 'Workshop',
    description: 'A comprehensive introduction to Bitcoin for those new to cryptocurrency. Demystify the technology, understand the value proposition, and learn how to get started safely.',
    keyTakeaways: [
      'What Bitcoin is and why it matters',
      'How blockchain technology works (simplified)',
      'Secure storage and wallet options',
      'Common mistakes to avoid',
    ],
    audienceLevel: 'Beginner',
    icon: '₿',
  },
  {
    id: 3,
    title: 'Portfolio Diversification in the Digital Age',
    duration: '45 minutes',
    format: 'Presentation',
    description: 'How to integrate Bitcoin into a traditional retirement portfolio. Explore allocation strategies, rebalancing techniques, and risk management for the modern investor.',
    keyTakeaways: [
      'Optimal Bitcoin allocation percentages',
      'Correlation with traditional assets',
      'Rebalancing strategies and timing',
      'Tax implications and optimization',
    ],
    audienceLevel: 'Intermediate',
    icon: '📊',
  },
  {
    id: 4,
    title: 'The Psychology of Bitcoin Investing',
    duration: '30-45 minutes',
    format: 'Presentation',
    description: 'Master the mental game of Bitcoin investing. Learn how to handle volatility, avoid emotional decisions, and maintain conviction during market cycles.',
    keyTakeaways: [
      'Understanding market cycles and psychology',
      'Strategies for managing FOMO and panic',
      'Building conviction through education',
      'Long-term thinking vs. short-term noise',
    ],
    audienceLevel: 'All levels',
    icon: '🧠',
  },
  {
    id: 5,
    title: 'Financial Independence Through Cryptocurrency',
    duration: '60-90 minutes',
    format: 'Workshop',
    description: 'A comprehensive workshop on achieving financial independence using cryptocurrency as a wealth-building tool. Includes interactive exercises and personalized planning.',
    keyTakeaways: [
      'Calculate your FI number with crypto',
      'Dollar-cost averaging strategies',
      'Security best practices',
      'Creating your personalized roadmap',
    ],
    audienceLevel: 'Intermediate',
    icon: '💰',
  },
  {
    id: 6,
    title: 'From Skeptic to Believer: My Bitcoin Journey',
    duration: '20-30 minutes',
    format: 'Fireside Chat',
    description: 'An intimate conversation about my transformation from Bitcoin skeptic to early retiree. Perfect for Q&A format with audience interaction.',
    keyTakeaways: [
      'Overcoming initial skepticism',
      'Key moments that changed my perspective',
      'Lessons from mistakes and successes',
      'Advice for those starting today',
    ],
    audienceLevel: 'All levels',
    icon: '💭',
  },
];

export function SpeakingTopicsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Speaking Topics
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Engaging, informative presentations tailored to your audience. All topics can be customized to fit your event's theme and time constraints.
            </p>
          </div>

          <div className="space-y-8">
            {speakingTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-neutral-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-bitcoin-500 rounded-xl flex items-center justify-center text-3xl">
                      {topic.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">{topic.title}</h3>
                      <span className="inline-block bg-bitcoin-100 text-bitcoin-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {topic.format}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-4">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{topic.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>{topic.audienceLevel}</span>
                      </div>
                    </div>

                    <p className="text-neutral-700 mb-4">
                      {topic.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-sm text-neutral-900 mb-2">
                        Key Takeaways:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {topic.keyTakeaways.map((takeaway, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-neutral-600">
                            <svg className="w-5 h-5 text-bitcoin-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Topics CTA */}
          <div className="mt-12 bg-gradient-to-br from-neutral-900 to-black rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">
              Need a Custom Topic?
            </h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              I can tailor presentations to your specific audience and event theme. Let's discuss your needs and create something perfect for your attendees.
            </p>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-bitcoin-500 rounded-lg hover:bg-bitcoin-600 transition-colors"
            >
              Discuss Custom Topic
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
