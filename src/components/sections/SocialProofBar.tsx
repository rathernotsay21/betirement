'use client';

import { Youtube, Eye, Users } from 'lucide-react';

export function SocialProofBar() {
  // Placeholder values - will be replaced with API integration later
  const stats = [
    { label: 'YouTube Subscribers', value: '50K+', icon: Youtube },
    { label: 'Total Video Views', value: '2M+', icon: Eye },
    { label: 'Community Members', value: '5K+', icon: Users },
  ];

  return (
    <section className="bg-neutral-900 border-y border-neutral-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                <Icon className="w-8 h-8 mb-2 text-bitcoin-500" />
                <div className="text-3xl sm:text-4xl font-bold text-bitcoin-500 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
