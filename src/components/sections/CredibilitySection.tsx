'use client';

interface CredentialItem {
  icon: string;
  title: string;
  description: string;
}

const credentials: CredentialItem[] = [
  {
    icon: '🏢',
    title: 'Professional Background',
    description: '28 years of corporate experience in finance and technology, with proven track record of strategic planning and execution.',
  },
  {
    icon: '₿',
    title: 'Bitcoin Expertise',
    description: '7+ years of deep Bitcoin research and investment experience, from 2017 discovery to successful retirement strategy implementation.',
  },
  {
    icon: '📊',
    title: 'Investment Philosophy',
    description: 'Balanced approach combining traditional retirement planning with Bitcoin strategies, emphasizing risk management and long-term thinking.',
  },
  {
    icon: '🎓',
    title: 'Continuous Learning',
    description: 'Committed to ongoing education in cryptocurrency, blockchain technology, economics, and retirement planning strategies.',
  },
  {
    icon: '📺',
    title: 'Media Appearances',
    description: 'Featured in podcasts and publications discussing Bitcoin retirement strategies and financial independence.',
  },
  {
    icon: '🤝',
    title: 'Community Builder',
    description: 'Helping thousands of people understand Bitcoin and build their path to financial freedom through education and mentorship.',
  },
];

const mediaLogos = [
  { name: 'Podcast 1', placeholder: true },
  { name: 'Publication 1', placeholder: true },
  { name: 'Podcast 2', placeholder: true },
  { name: 'Publication 2', placeholder: true },
];

export function CredibilitySection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-black via-black-light to-neutral-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Trust <span className="text-bitcoin-500">Betirement</span>?
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Real experience, proven strategies, and a commitment to helping you achieve financial freedom.
            </p>
          </div>

          {/* Credentials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {credentials.map((credential, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-bitcoin-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{credential.icon}</div>
                <h3 className="text-xl font-bold mb-3">{credential.title}</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  {credential.description}
                </p>
              </div>
            ))}
          </div>

          {/* Investment Philosophy highlight */}
          <div className="bg-bitcoin-500/10 border border-bitcoin-500/30 rounded-lg p-8 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                My Investment Philosophy
              </h3>
              <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                "Bitcoin isn't about getting rich quick—it's about building lasting wealth through sound principles, 
                disciplined strategy, and long-term thinking. I combine traditional retirement planning wisdom with 
                Bitcoin's unique properties to create a balanced approach that works in the real world."
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-neutral-400">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Risk Management
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Long-term Focus
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Proven Results
                </span>
              </div>
            </div>
          </div>

          {/* Media appearances */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-8">Featured In</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
              {mediaLogos.map((logo, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg px-8 py-6 w-full flex items-center justify-center"
                >
                  <span className="text-neutral-400 text-sm">{logo.name}</span>
                </div>
              ))}
            </div>
            <p className="text-neutral-400 text-sm mt-8">
              Media appearances and podcast features coming soon
            </p>
          </div>

          {/* Certifications note */}
          <div className="mt-12 pt-12 border-t border-white/10 text-center">
            <p className="text-neutral-400 text-sm max-w-2xl mx-auto">
              <strong className="text-white">Important Disclaimer:</strong> I am not a financial advisor. 
              The content on this site is for educational purposes only and should not be considered financial advice. 
              Always do your own research and consult with qualified professionals before making investment decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
