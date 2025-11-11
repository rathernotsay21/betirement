'use client';

import { Rocket, Bitcoin, BarChart3, Brain, Coins, LightbulbIcon, Clock, Users, CheckCircle, LucideIcon } from 'lucide-react';

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
    icon: Rocket,
  },
  {
    id: 2,
    title: 'Bitcoin 101: Understanding Digital Gold',
    duration: '30-45 minutes',
    format: 'Workshop',
    description: 'A straightforward introduction to Bitcoin for beginners. Clear explanations of what it is, why it matters, and how to get started safely.',
    keyTakeaways: [
      'What Bitcoin is and why it matters',
      'How blockchain technology works (simplified)',
      'Secure storage and wallet options',
      'Common mistakes to avoid',
    ],
    audienceLevel: 'Beginner',
    icon: Bitcoin,
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
    icon: BarChart3,
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
    icon: Brain,
  },
  {
    id: 5,
    title: 'Financial Independence with Bitcoin',
    duration: '60-90 minutes',
    format: 'Workshop',
    description: 'A hands-on workshop on building financial independence with bitcoin. Based on real experience, not theory. Includes practical exercises and planning tools.',
    keyTakeaways: [
      'Calculate your FI number with bitcoin',
      'Dollar-cost averaging strategies',
      'Security best practices',
      'Creating your personalized roadmap',
    ],
    audienceLevel: 'Intermediate',
    icon: Coins,
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
    icon: LightbulbIcon,
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
            {speakingTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.id}
                  className="bg-neutral-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-bitcoin-500 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
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
                        <Clock className="w-4 h-4" />
                        <span>{topic.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
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
                            <CheckCircle className="w-5 h-5 text-bitcoin-500 flex-shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
