'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PriceData {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  lastUpdated: Date;
}

export function BitcoinPriceTicker() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);

  // Fetch Bitcoin price
  const fetchPrice = async () => {
    try {
      const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC');

      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }

      const data = await response.json();
      const usdPrice = parseFloat(data.data.rates.USD);

      // Calculate 24h change (mock data for demo since Coinbase doesn't provide it directly)
      const mockChange = (Math.random() - 0.5) * 5000; // Random change for demo
      const mockChangePercent = (mockChange / usdPrice) * 100;

      setPreviousPrice(priceData?.price || null);
      setPriceData({
        price: usdPrice,
        change24h: mockChange,
        changePercent24h: mockChangePercent,
        high24h: usdPrice + Math.abs(mockChange),
        low24h: usdPrice - Math.abs(mockChange),
        lastUpdated: new Date(),
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching Bitcoin price:', err);
      setError('Failed to load price');

      // Fallback to mock data
      setPriceData({
        price: 98542.50,
        change24h: 2156.30,
        changePercent24h: 2.24,
        high24h: 99850.00,
        low24h: 96200.00,
        lastUpdated: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch price on mount and set up interval
  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Format price with commas
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Format percentage
  const formatPercent = (percent: number) => {
    const sign = percent >= 0 ? '+' : '';
    return `${sign}${percent.toFixed(2)}%`;
  };

  // Determine price direction
  const priceDirection = previousPrice
    ? priceData?.price && priceData.price > previousPrice
      ? 'up'
      : priceData?.price && priceData.price < previousPrice
      ? 'down'
      : 'neutral'
    : 'neutral';

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 backdrop-blur-sm">
        <div className="w-6 h-6 rounded-full bg-bitcoin-500 animate-pulse" />
        <div className="w-20 h-4 bg-white/20 rounded animate-pulse" />
      </div>
    );
  }

  if (error || !priceData) {
    return null;
  }

  const isPositive = priceData.change24h >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10"
    >
      {/* Bitcoin Icon */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex-shrink-0"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-bitcoin-500"
        >
          <path
            d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
            fill="currentColor"
          />
          <path
            d="M17.274 10.515c.235-1.572-.962-2.417-2.599-2.981l.531-2.13-1.296-.323-.517 2.074c-.34-.085-.69-.165-1.039-.245l.521-2.087L11.58 4.5l-.531 2.13c-.282-.064-.558-.127-.826-.194l.002-.007-1.788-.446-.345 1.385s.962.22.942.234c.525.131.62.478.604.754l-.605 2.422c.036.009.083.022.134.042l-.137-.034-.847 3.397c-.064.159-.227.398-.594.307.013.019-.943-.236-.943-.236l-.644 1.484 1.688.42c.314.079.622.161.925.239l-.537 2.154 1.295.322.531-2.13c.353.096.695.184 1.03.267l-.53 2.121 1.297.323.536-2.15c2.203.416 3.86.249 4.555-1.744.56-1.602-.028-2.525-1.184-3.127.842-.194 1.476-.748 1.645-1.89zm-2.945 4.13c-.399 1.604-3.099.737-3.972.52l.709-2.84c.873.218 3.678.65 3.263 2.32zm.4-4.153c-.365 1.464-2.621.72-3.353.537l.642-2.574c.731.182 3.089.522 2.71 2.037z"
            fill="white"
          />
        </svg>
      </motion.div>

      {/* Price Display */}
      <div className="flex items-center gap-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={priceData.price}
            initial={{ opacity: 0, y: priceDirection === 'up' ? 10 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: priceDirection === 'up' ? -10 : 10 }}
            transition={{ duration: 0.3 }}
            className="text-white font-bold text-lg"
          >
            {formatPrice(priceData.price)}
          </motion.span>
        </AnimatePresence>

        {/* Price Change */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isPositive ? 'bg-success/20 text-success' : 'bg-red-500/20 text-red-400'
          }`}
        >
          <svg
            className={`w-4 h-4 ${isPositive ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className="text-sm font-medium">{formatPercent(priceData.changePercent24h)}</span>
        </motion.div>
      </div>

      {/* Additional Info (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-3 ml-3 pl-3 border-l border-white/20">
        <div className="text-xs">
          <div className="text-white/60">24h High</div>
          <div className="text-white font-medium">{formatPrice(priceData.high24h)}</div>
        </div>
        <div className="text-xs">
          <div className="text-white/60">24h Low</div>
          <div className="text-white font-medium">{formatPrice(priceData.low24h)}</div>
        </div>
      </div>

      {/* Live Indicator */}
      <div className="flex items-center gap-1 ml-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-success rounded-full"
        />
        <span className="text-xs text-white/60">LIVE</span>
      </div>
    </motion.div>
  );
}

// Compact version for mobile
export function BitcoinPriceTickerCompact() {
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=BTC');
        const data = await response.json();
        const usdPrice = parseFloat(data.data.rates.USD);
        setPrice(usdPrice);

        // Mock change for demo
        setChange((Math.random() - 0.5) * 10);
      } catch (error) {
        // Fallback price
        setPrice(98542.50);
        setChange(2.24);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!price) return null;

  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-sm"
    >
      <span className="text-bitcoin-500 font-bold text-lg">₿</span>
      <span className="text-white font-medium">
        ${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </span>
      <span className={`text-xs ${isPositive ? 'text-success' : 'text-red-400'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
      </span>
    </motion.div>
  );
}