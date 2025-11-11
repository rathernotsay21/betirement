'use client';

import { Button } from '@/src/components/ui';
import Link from 'next/link';
import { CheckCircle2, Bitcoin } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-black via-black-light to-neutral-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(247, 147, 26) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <span className="text-bitcoin-500 font-bold text-2xl">51</span>
              <span className="text-neutral-300">Years Old</span>
            </div>
            <div className="h-8 w-px bg-neutral-700" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-success w-7 h-7" />
              <span className="text-neutral-300">Retired</span>
            </div>
            <div className="h-8 w-px bg-neutral-700" />
            <div className="flex items-center gap-2">
              <Bitcoin className="text-bitcoin-500 w-7 h-7" />
              <span className="text-neutral-300">Bitcoin Powered</span>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-display-lg font-black mb-6 leading-tight">
            Your Bridge to{' '}
            <span className="text-bitcoin-500">Bitcoin-Powered</span>{' '}
            Freedom
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-12 max-w-3xl mx-auto">
            Real experience. Proven strategies. Your path to early retirement with Bitcoin.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="/start-here"
            >
              Start Your Journey
            </Button>
            <Button
              variant="outline"
              size="lg"
              href="/content/videos"
            >
              Watch Free Videos
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-bitcoin-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
