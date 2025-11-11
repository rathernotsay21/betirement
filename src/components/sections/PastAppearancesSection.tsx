'use client';

import { Mic, Radio, FileText, ChevronRight } from 'lucide-react';

const appearances = [
  {
    id: 1,
    title: 'The Bitcoin Retirement Podcast',
    type: 'Podcast',
    date: 'March 2024',
    description: 'Deep dive into Bitcoin allocation strategies for retirement portfolios',
    link: 'https://example.com/podcast-1',
    image: '/images/media/podcast-1.jpg',
  },
  {
    id: 2,
    title: 'Financial Independence Summit 2024',
    type: 'Conference',
    date: 'February 2024',
    description: 'Keynote: "From Corporate to ₿etired: An Engineer\'s Journey"',
    link: 'https://example.com/conference-1',
    image: '/images/media/conference-1.jpg',
  },
  {
    id: 3,
    title: 'Bitcoin Strategy Weekly',
    type: 'Podcast',
    date: 'January 2024',
    description: 'Discussing risk management and portfolio diversification with Bitcoin',
    link: 'https://example.com/podcast-2',
    image: '/images/media/podcast-2.jpg',
  },
  {
    id: 4,
    title: 'Forbes - Retirement Planning',
    type: 'Article',
    date: 'December 2023',
    description: 'Featured expert on Bitcoin retirement strategies',
    link: 'https://example.com/forbes-article',
    image: '/images/media/forbes.jpg',
  },
  {
    id: 5,
    title: 'Early Retirement Now',
    type: 'Podcast',
    date: 'November 2023',
    description: 'How Bitcoin fits into a comprehensive retirement strategy',
    link: 'https://example.com/podcast-3',
    image: '/images/media/podcast-3.jpg',
  },
  {
    id: 6,
    title: 'Bitcoin Magazine',
    type: 'Article',
    date: 'October 2023',
    description: 'Interview: Retiring Early with Bitcoin',
    link: 'https://example.com/bitcoin-mag',
    image: '/images/media/bitcoin-mag.jpg',
  },
];

export function PastAppearancesSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Past Appearances
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Michael has been featured on leading podcasts, conferences, and publications in the Bitcoin and financial independence space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appearances.map((appearance) => (
              <a
                key={appearance.id}
                href={appearance.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-bitcoin-500 to-bitcoin-600 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {appearance.type === 'Podcast' && <Radio className="text-white w-16 h-16 opacity-50" />}
                    {appearance.type === 'Conference' && <Mic className="text-white w-16 h-16 opacity-50" />}
                    {appearance.type === 'Article' && <FileText className="text-white w-16 h-16 opacity-50" />}
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-bitcoin-600">
                      {appearance.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-neutral-500 mb-2">
                    {appearance.date}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-bitcoin-500 transition-colors">
                    {appearance.title}
                  </h3>
                  <p className="text-neutral-600 text-sm mb-4">
                    {appearance.description}
                  </p>
                  <div className="flex items-center text-bitcoin-500 font-semibold text-sm group-hover:gap-2 transition-all">
                    <span>View Appearance</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Media Logos */}
          <div className="mt-16 text-center">
            <p className="text-sm text-neutral-500 uppercase tracking-wide mb-8">
              As Featured In
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              <div className="text-2xl font-bold text-neutral-700">Forbes</div>
              <div className="text-2xl font-bold text-neutral-700">Bitcoin Magazine</div>
              <div className="text-2xl font-bold text-neutral-700">CoinDesk</div>
              <div className="text-2xl font-bold text-neutral-700">Decrypt</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
