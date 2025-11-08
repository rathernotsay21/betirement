'use client';

export function SocialProofBar() {
  // Placeholder values - will be replaced with API integration later
  const stats = [
    { label: 'YouTube Subscribers', value: '50K+', icon: '📺' },
    { label: 'Total Video Views', value: '2M+', icon: '👁️' },
    { label: 'Community Members', value: '5K+', icon: '👥' },
  ];

  return (
    <section className="bg-neutral-900 border-y border-neutral-800 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-bitcoin-500 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
