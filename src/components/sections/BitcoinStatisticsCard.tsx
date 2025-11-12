'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Bitcoin, Calculator, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

interface BitcoinPrice {
  price: number;
  change24h: number;
  changePercent24h: number;
  lastUpdated: Date;
}

const BETIREMENT_STACK = 0.21; // The amount of BTC for betirement
const CAGR_RATE = 0.21; // 21% annual growth rate
const YEARS = 10; // 10-year projection
const GROWTH_MULTIPLIER = Math.pow(1 + CAGR_RATE, YEARS); // (1.21)^10 = 6.727499949325611

export function BitcoinStatisticsCard() {
  const [bitcoinData, setBitcoinData] = useState<BitcoinPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayCurrentValue, setDisplayCurrentValue] = useState(0);
  const [displayFutureValue, setDisplayFutureValue] = useState(0);

  useEffect(() => {
    fetchBitcoinPrice();
    const interval = setInterval(fetchBitcoinPrice, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchBitcoinPrice = async () => {
    try {
      const response = await fetch('/api/bitcoin/price');
      if (!response.ok) throw new Error('Failed to fetch price');
      const result = await response.json();
      // API returns { success: true, data: { price, change24h, ... } }
      setBitcoinData(result.data);
      setError(false);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching Bitcoin price:', err);
      setError(true);
      setLoading(false);
      // Set fallback data for demonstration purposes (using approximate BTC price)
      setBitcoinData({
        price: 98000,
        change24h: 0,
        changePercent24h: 0,
        lastUpdated: new Date(),
      });
    }
  };

  // Animated counter effect
  useEffect(() => {
    if (!bitcoinData || !bitcoinData.price || typeof bitcoinData.price !== 'number') return;

    const currentValue = bitcoinData.price * BETIREMENT_STACK;
    const futureValue = currentValue * GROWTH_MULTIPLIER;

    // Animate numbers
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setDisplayCurrentValue(currentValue * easeOutQuart);
      setDisplayFutureValue(futureValue * easeOutQuart);

      if (step >= steps) {
        clearInterval(interval);
        setDisplayCurrentValue(currentValue);
        setDisplayFutureValue(futureValue);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [bitcoinData]);

  const currentValue = (bitcoinData && bitcoinData.price) ? bitcoinData.price * BETIREMENT_STACK : 0;
  const futureValue = currentValue * GROWTH_MULTIPLIER;
  const totalGrowth = futureValue - currentValue;
  const growthPercentage = ((GROWTH_MULTIPLIER - 1) * 100); // 572.75%

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative"
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-500/20 via-bitcoin-600/10 to-transparent blur-3xl" />

        {/* Main Card */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent border-2 border-white/20 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Animated gradient border effect */}
          <motion.div
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(247, 147, 26, 0.3) 0%, rgba(234, 134, 0, 0.2) 50%, rgba(247, 147, 26, 0.3) 100%)',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Floating Bitcoin particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 opacity-10"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Bitcoin className="w-full h-full text-bitcoin-500" />
            </motion.div>
          ))}

          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <Sparkles className="w-5 h-5 text-bitcoin-500" />
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    Your Betirement Stack
                  </h3>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-bitcoin-500 text-sm sm:text-base font-mono font-semibold"
                >
                  0.21 BTC
                </motion.p>
              </div>
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-bitcoin-500 to-bitcoin-600 rounded-full flex items-center justify-center shadow-lg"
              >
                <Bitcoin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
            </div>

            {/* Current Value */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6 pb-6 border-b border-white/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-neutral-300" />
                <span className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide">Current Value</span>
              </div>
              {loading ? (
                <div className="h-12 bg-white/5 animate-pulse rounded" />
              ) : (
                <motion.div
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-mono"
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(247, 147, 26, 0.5)',
                      '0 0 30px rgba(247, 147, 26, 0.8)',
                      '0 0 20px rgba(247, 147, 26, 0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ${displayCurrentValue.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })}
                </motion.div>
              )}
              {!loading && bitcoinData && bitcoinData.price && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-xs sm:text-sm text-neutral-400 mt-1"
                >
                  @ ${bitcoinData.price.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  })} per BTC
                </motion.p>
              )}
            </motion.div>

            {/* Future Projection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-success-light" />
                <span className="text-xs sm:text-sm text-neutral-300 uppercase tracking-wide">10-Year Projection</span>
                <span className="text-xs text-neutral-400">(21% CAGR)</span>
              </div>
              {loading ? (
                <div className="h-12 bg-white/5 animate-pulse rounded" />
              ) : (
                <>
                  <motion.div
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-success-light font-mono"
                    animate={{
                      textShadow: [
                        '0 0 20px rgba(46, 204, 113, 0.5)',
                        '0 0 30px rgba(46, 204, 113, 0.8)',
                        '0 0 20px rgba(46, 204, 113, 0.5)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ${displayFutureValue.toLocaleString('en-US', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    })}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex items-center gap-2 mt-2"
                  >
                    <div className="flex items-center gap-1 bg-success/20 px-3 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3 text-success-light" />
                      <span className="text-sm font-bold text-success-light">
                        +{growthPercentage.toFixed(2)}%
                      </span>
                    </div>
                    <span className="text-xs text-neutral-400">
                      (+${totalGrowth.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      })})
                    </span>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Growth Bar Visualization */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="mb-4"
              >
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-bitcoin-500 via-success to-success-light"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.5, duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-neutral-400 mt-1">
                  <span>Today</span>
                  <span>Year 10</span>
                </div>
              </motion.div>
            )}

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-xs text-neutral-400 text-center italic"
            >
              {error ? 'Using approximate BTC price • ' : ''}Historical Bitcoin CAGR: ~21% annually
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Outer glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-bitcoin-500/10 to-transparent rounded-2xl blur-2xl -z-10"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
