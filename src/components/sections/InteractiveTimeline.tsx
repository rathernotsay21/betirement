'use client';

import { useEffect, useRef, useState } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: '1996-2024',
    title: '28-Year Corporate Career',
    description: 'Built a successful career in corporate America, climbing the ladder and achieving financial stability through traditional means.',
    image: '/images/timeline-corporate.jpg',
  },
  {
    year: '2017',
    title: 'Bitcoin Discovery',
    description: 'Discovered Bitcoin and began deep research into cryptocurrency, blockchain technology, and the potential for financial sovereignty.',
    image: '/images/timeline-bitcoin.jpg',
  },
  {
    year: '2024',
    title: 'Retirement Decision',
    description: 'Made the bold decision to retire at 51, leveraging Bitcoin strategies and proven investment principles to achieve financial freedom.',
    image: '/images/timeline-retirement.jpg',
  },
  {
    year: 'Today',
    title: 'Living the Dream',
    description: 'Enjoying early retirement while helping others achieve the same freedom through education, community, and proven strategies.',
    image: '/images/timeline-today.jpg',
  },
];

export function InteractiveTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, windowHeight / 2 - timelineTop);

      eventRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const refTop = ref.getBoundingClientRect().top;
        if (refTop < windowHeight / 2 && refTop > 0) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            My Journey to <span className="text-bitcoin-500">Freedom</span>
          </h2>
          <p className="text-lg text-neutral-600 text-center mb-16 max-w-2xl mx-auto">
            From corporate employee to Bitcoin-powered early retiree
          </p>

          <div ref={timelineRef} className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-300 transform -translate-x-1/2" />
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-300" />

            {/* Timeline events */}
            <div className="space-y-12 md:space-y-24">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    eventRefs.current[index] = el;
                  }}
                  className={`relative transition-all duration-500 ${
                    activeIndex >= index ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-8'
                  }`}
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-8 items-center">
                    {index % 2 === 0 ? (
                      <>
                        {/* Content on left */}
                        <div className="text-right pr-8">
                          <div className="inline-block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <span className="text-bitcoin-500 font-bold text-sm uppercase tracking-wide">
                              {event.year}
                            </span>
                            <h3 className="text-2xl font-bold mt-2 mb-3">{event.title}</h3>
                            <p className="text-neutral-600">{event.description}</p>
                          </div>
                        </div>
                        {/* Image on right */}
                        <div className="pl-8">
                          <div className="bg-neutral-200 rounded-lg aspect-video overflow-hidden">
                            {event.image && (
                              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                <span className="text-sm">Image: {event.title}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Image on left */}
                        <div className="pr-8">
                          <div className="bg-neutral-200 rounded-lg aspect-video overflow-hidden">
                            {event.image && (
                              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                <span className="text-sm">Image: {event.title}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Content on right */}
                        <div className="text-left pl-8">
                          <div className="inline-block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <span className="text-bitcoin-500 font-bold text-sm uppercase tracking-wide">
                              {event.year}
                            </span>
                            <h3 className="text-2xl font-bold mt-2 mb-3">{event.title}</h3>
                            <p className="text-neutral-600">{event.description}</p>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Center dot */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`w-4 h-4 rounded-full border-4 border-white transition-all duration-300 ${
                          activeIndex >= index ? 'bg-bitcoin-500 scale-125' : 'bg-neutral-300'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex gap-4">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-4 border-white transition-all duration-300 flex-shrink-0 ${
                          activeIndex >= index ? 'bg-bitcoin-500 scale-125' : 'bg-neutral-300'
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-white rounded-lg shadow-lg p-4">
                        <span className="text-bitcoin-500 font-bold text-xs uppercase tracking-wide">
                          {event.year}
                        </span>
                        <h3 className="text-xl font-bold mt-2 mb-2">{event.title}</h3>
                        <p className="text-neutral-600 text-sm mb-4">{event.description}</p>
                        <div className="bg-neutral-200 rounded-lg aspect-video overflow-hidden">
                          {event.image && (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400">
                              <span className="text-xs">Image: {event.title}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
