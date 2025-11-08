'use client';

import { useState, useEffect } from 'react';

interface UrgencyIndicatorProps {
  type: 'countdown' | 'limited-spots' | 'limited-stock';
  endDate?: Date; // For countdown type
  totalSpots?: number; // For limited-spots type
  remainingSpots?: number; // For limited-spots type
  totalStock?: number; // For limited-stock type
  remainingStock?: number; // For limited-stock type
  message?: string;
  className?: string;
}

export function UrgencyIndicator({
  type,
  endDate,
  totalSpots,
  remainingSpots,
  totalStock,
  remainingStock,
  message,
  className = '',
}: UrgencyIndicatorProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (type === 'countdown' && endDate) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = endDate.getTime() - now;

        if (distance < 0) {
          setTimeLeft(null);
          return;
        }

        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [type, endDate]);

  const renderCountdown = () => {
    if (!timeLeft) return null;

    return (
      <div className={`bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 text-white rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">
              {message || 'Limited Time Offer Ends In:'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-3">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
      </div>
    );
  };

  const renderLimitedSpots = () => {
    if (totalSpots === undefined || remainingSpots === undefined) return null;

    const percentage = (remainingSpots / totalSpots) * 100;
    const isLow = percentage <= 30;

    return (
      <div className={`bg-white border-2 ${isLow ? 'border-red-500' : 'border-bitcoin-500'} rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <svg
              className={`w-5 h-5 ${isLow ? 'text-red-500' : 'text-bitcoin-500'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="font-medium text-neutral-900">
              {message || 'Limited Spots Available'}
            </span>
          </div>
          <span className={`text-lg font-bold ${isLow ? 'text-red-500' : 'text-bitcoin-500'}`}>
            {remainingSpots} / {totalSpots}
          </span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isLow ? 'bg-red-500' : 'bg-bitcoin-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {isLow && (
          <p className="text-sm text-red-600 mt-2 font-medium">
            ⚠️ Hurry! Only {remainingSpots} spots remaining
          </p>
        )}
      </div>
    );
  };

  const renderLimitedStock = () => {
    if (totalStock === undefined || remainingStock === undefined) return null;

    const percentage = (remainingStock / totalStock) * 100;
    const isLow = percentage <= 20;

    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full ${
        isLow ? 'bg-red-100 text-red-700' : 'bg-bitcoin-100 text-bitcoin-700'
      } ${className}`}>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <span className="text-sm font-medium">
          {isLow ? (
            <>Only {remainingStock} left in stock!</>
          ) : (
            <>{remainingStock} available</>
          )}
        </span>
      </div>
    );
  };

  switch (type) {
    case 'countdown':
      return renderCountdown();
    case 'limited-spots':
      return renderLimitedSpots();
    case 'limited-stock':
      return renderLimitedStock();
    default:
      return null;
  }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
        <span className="text-2xl font-bold">{value.toString().padStart(2, '0')}</span>
      </div>
      <span className="text-xs mt-1 opacity-90">{label}</span>
    </div>
  );
}
