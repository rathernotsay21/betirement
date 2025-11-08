import Link from 'next/link';

interface ValueProp {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const valueProps: ValueProp[] = [
  {
    title: 'Learn',
    description: 'Master Bitcoin fundamentals and retirement strategies through comprehensive video content and in-depth articles.',
    icon: '📚',
    href: '/content/videos',
  },
  {
    title: 'Connect',
    description: 'Join a community of like-minded individuals on the same journey to financial freedom and early retirement.',
    icon: '🤝',
    href: '/community',
  },
  {
    title: 'Implement',
    description: 'Access practical tools, calculators, and step-by-step guides to put your retirement plan into action.',
    icon: '⚡',
    href: '/content/resources',
  },
  {
    title: 'Succeed',
    description: 'Follow proven strategies from someone who achieved early retirement at 51 using Bitcoin.',
    icon: '🎯',
    href: '/about',
  },
];

export function ValuePropositionGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4">
            Your Path to Bitcoin Retirement
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            A proven framework to help you achieve financial freedom and retire early with Bitcoin
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {valueProps.map((prop, index) => (
            <Link
              key={index}
              href={prop.href}
              className="group p-8 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-bitcoin-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {prop.icon}
              </div>
              <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-bitcoin-500 transition-colors">
                {prop.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {prop.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
