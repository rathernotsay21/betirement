'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

interface PriceData {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: Date;
}

export function BitcoinPriceTicker() {
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);

  // Check if cached data is fresh (less than 25 seconds old)
  const isCacheFresh = () => {
    const cachedData = localStorage.getItem('bitcoinPriceData');
    if (!cachedData) return false;

    try {
      const parsed = JSON.parse(cachedData);
      const cacheAge = Date.now() - new Date(parsed.lastUpdated).getTime();
      return cacheAge < 25000; // 25 seconds (slightly less than update interval)
    } catch {
      return false;
    }
  };

  // Fetch Bitcoin price with real market data from CoinGecko
  const fetchPrice = useCallback(async (forceRefresh = false) => {
    // Use cached data if it's fresh and not forcing refresh
    if (!forceRefresh && isCacheFresh()) {
      const cachedData = localStorage.getItem('bitcoinPriceData');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setPriceData({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated),
        });
        setLoading(false);
        return;
      }
    }

    try {
      // Use our API route to avoid CORS issues
      const response = await fetch('/api/bitcoin/price');

      if (!response.ok) {
        throw new Error('Failed to fetch price');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch price');
      }

      const { data } = result;

      setPreviousPrice(priceData?.price || null);
      setPriceData({
        price: data.price,
        change24h: data.change24h,
        changePercent24h: data.changePercent24h,
        high24h: data.high24h,
        low24h: data.low24h,
        marketCap: data.marketCap,
        volume24h: data.volume24h,
        lastUpdated: new Date(data.lastUpdated),
      });
      setError(null);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching Bitcoin price:', err);
      setRetryCount(prev => prev + 1); // Increment retry count on error

      // Try to use cached data if available
      const cachedData = localStorage.getItem('bitcoinPriceData');
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        setPriceData({
          ...parsed,
          lastUpdated: new Date(parsed.lastUpdated),
        });
        setError('Using cached data');
      } else {
        setError('Failed to load price');
        // Only use fallback if no cached data exists
        setPriceData({
          price: 98542.50,
          change24h: 2156.30,
          changePercent24h: 2.24,
          high24h: 99850.00,
          low24h: 96200.00,
          marketCap: 1932000000000,
          volume24h: 28500000000,
          lastUpdated: new Date(),
        });
      }
    } finally {
      setLoading(false);
    }
  }, [priceData]);

  // Cache successful data
  useEffect(() => {
    if (priceData && !error) {
      localStorage.setItem('bitcoinPriceData', JSON.stringify({
        ...priceData,
        lastUpdated: priceData.lastUpdated.toISOString(),
      }));
    }
  }, [priceData, error]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setRetryCount(0);
      fetchPrice(true); // Force refresh when coming back online
    };

    const handleOffline = () => {
      setIsOnline(false);
      setError('No internet connection');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial online status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [fetchPrice]);

  // Fetch price on mount and set up interval with retry logic
  useEffect(() => {
    fetchPrice(true); // Force refresh on mount

    // Dynamic interval based on retry count (exponential backoff)
    const baseInterval = 30000; // 30 seconds
    const maxInterval = 120000; // 2 minutes max
    const interval = Math.min(baseInterval * Math.pow(1.5, retryCount), maxInterval);

    const timer = setInterval(() => {
      if (isOnline) {
        fetchPrice(); // Use cache if fresh
      }
    }, interval);

    return () => clearInterval(timer);
  }, [retryCount, isOnline, fetchPrice]);

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
            className="text-white font-mono font-semibold text-lg tabular-nums"
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
          <span className="text-sm font-mono font-medium tabular-nums">{formatPercent(priceData.changePercent24h)}</span>
        </motion.div>
      </div>

      {/* Additional Info (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-3 ml-3 pl-3 border-l border-white/20">
        <div className="text-xs">
          <div className="text-white/60">24h High</div>
          <div className="text-white font-mono font-medium tabular-nums">{formatPrice(priceData.high24h)}</div>
        </div>
        <div className="text-xs">
          <div className="text-white/60">24h Low</div>
          <div className="text-white font-mono font-medium tabular-nums">{formatPrice(priceData.low24h)}</div>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        // Use our API route to avoid CORS issues
        const response = await fetch('/api/bitcoin/price');

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setPrice(result.data.price);
            setChange(result.data.changePercent24h || 0);

            // Cache the data
            localStorage.setItem('bitcoinCompactData', JSON.stringify({
              price: result.data.price,
              change: result.data.changePercent24h || 0,
              timestamp: Date.now()
            }));
          } else {
            throw new Error('Failed to fetch');
          }
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (error) {
        console.error('Error fetching Bitcoin price:', error);

        // Try to use cached data
        const cached = localStorage.getItem('bitcoinCompactData');
        if (cached) {
          const data = JSON.parse(cached);
          setPrice(data.price);
          setChange(data.change);
        } else {
          // Fallback price only if no cache
          setPrice(98542.50);
          setChange(2.24);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // Update every 30 seconds
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
      <Bitcoin className="text-bitcoin-500 w-5 h-5" />
      <span className="text-white font-medium">
        ${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </span>
      <span className={`flex items-center gap-1 text-xs ${isPositive ? 'text-success' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        {Math.abs(change).toFixed(1)}%
      </span>
    </motion.div>
  );
}