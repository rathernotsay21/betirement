'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/src/components/ui';
import { useEffect, useState } from 'react';
import { Cake, Bitcoin } from 'lucide-react';

// Floating Bitcoin particles component
function BitcoinParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Bitcoin
            className="text-bitcoin-500"
            style={{ width: particle.size, height: particle.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Animated counter component
function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "" }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export function AnimatedHeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #2A2A2A 100%)',
        }}
      />

      {/* Bitcoin particles */}
      <BitcoinParticles />

      {/* Subtle glowing orb effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bitcoin-500 rounded-full blur-[200px] opacity-10"
      />

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-bitcoin-500/30"
            >
              <span className="text-bitcoin-500 font-bold text-2xl">
                .<AnimatedCounter end={21} />
              </span>
              <span className="text-white/80">bitcoin</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-success/30"
            >
              <Cake className="text-success w-7 h-7" />
              <span className="text-white/80">Retire Early</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-bitcoin-500/30"
            >
              <Bitcoin className="text-bitcoin-500 w-7 h-7" />
              <span className="text-white/80">Bitcoin Income?</span>
            </motion.div>
          </motion.div>

          {/* Main headline with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-display-xl font-black mb-6 leading-tight">
              <motion.span
                className="inline-block text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Engineer Your
              </motion.span>
              <br />
              <motion.span
                className="inline-block text-bitcoin-500 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                ₿etirement
              </motion.span>
            </h1>
          </motion.div>

          {/* Animated subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-12 max-w-3xl mx-auto"
          >
            Practical bitcoin strategies from 28 years in engineering.<br />
            No hype. Just data and experience.
          </motion.p>

          {/* Stats with animated counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-bitcoin-500">
                <AnimatedCounter end={10000} prefix="" suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-white/60">YouTube Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-success">
                <AnimatedCounter end={500} prefix="" suffix="+" />
              </div>
              <div className="text-sm sm:text-base text-white/60">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-trust-400">
                <AnimatedCounter end={95} prefix="" suffix="%" />
              </div>
              <div className="text-sm sm:text-base text-white/60">Satisfaction Rate</div>
            </div>
          </motion.div>

          {/* Animated CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(247, 147, 26, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="primary"
                size="xl"
                href="/start-here"
                className="relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-bitcoin-600 to-bitcoin-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="xl"
                href="/content/videos"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Watch Free Videos
              </Button>
            </motion.div>
          </motion.div>

          {/* Subtle scroll indicator */}
          <motion.div
            className="mt-20"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              className="w-8 h-8 mx-auto text-bitcoin-500 opacity-50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle wave effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full h-32"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,64 C360,120 720,0 1440,64 L1440,120 L0,120 Z"
            fill="url(#wave-gradient)"
            animate={{
              d: [
                "M0,64 C360,120 720,0 1440,64 L1440,120 L0,120 Z",
                "M0,48 C360,80 720,40 1440,48 L1440,120 L0,120 Z",
                "M0,64 C360,120 720,0 1440,64 L1440,120 L0,120 Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F7931A" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#F7931A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F7931A" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}