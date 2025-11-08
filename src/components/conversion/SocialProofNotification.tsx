'use client';

import { useState, useEffect } from 'react';

interface SocialProofEvent {
  id: string;
  type: 'signup' | 'purchase' | 'download';
  message: string;
  timestamp: number;
  location?: string;
}

interface SocialProofNotificationProps {
  events?: SocialProofEvent[];
  displayDuration?: number; // How long to show each notification (ms)
  delayBetween?: number; // Delay between notifications (ms)
  initialDelay?: number; // Initial delay before first notification (ms)
}

// Mock events for demonstration - in production, these would come from an API
const defaultEvents: SocialProofEvent[] = [
  {
    id: '1',
    type: 'signup',
    message: 'Sarah from Texas just joined the newsletter',
    timestamp: Date.now() - 120000,
    location: 'Texas',
  },
  {
    id: '2',
    type: 'download',
    message: 'Michael from California downloaded the Bitcoin guide',
    timestamp: Date.now() - 180000,
    location: 'California',
  },
  {
    id: '3',
    type: 'signup',
    message: 'James from New York just joined the newsletter',
    timestamp: Date.now() - 240000,
    location: 'New York',
  },
  {
    id: '4',
    type: 'download',
    message: 'Lisa from Florida downloaded the retirement calculator',
    timestamp: Date.now() - 300000,
    location: 'Florida',
  },
];

export function SocialProofNotification({
  events = defaultEvents,
  displayDuration = 5000,
  delayBetween = 15000,
  initialDelay = 10000,
}: SocialProofNotificationProps) {
  const [currentEvent, setCurrentEvent] = useState<SocialProofEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [eventIndex, setEventIndex] = useState(0);

  useEffect(() => {
    // Check if user has dismissed notifications
    const isDismissed = sessionStorage.getItem('social_proof_dismissed');
    if (isDismissed || events.length === 0) {
      return;
    }

    // Initial delay before showing first notification
    const initialTimer = setTimeout(() => {
      showNextEvent();
    }, initialDelay);

    return () => clearTimeout(initialTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNextEvent = () => {
    const isDismissed = sessionStorage.getItem('social_proof_dismissed');
    if (isDismissed) return;

    // Get next event
    const nextIndex = eventIndex % events.length;
    setCurrentEvent(events[nextIndex]);
    setIsVisible(true);
    setEventIndex(nextIndex + 1);

    // Hide after display duration
    setTimeout(() => {
      setIsVisible(false);
    }, displayDuration);

    // Schedule next event
    setTimeout(() => {
      showNextEvent();
    }, displayDuration + delayBetween);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('social_proof_dismissed', 'true');
  };

  if (!currentEvent || !isVisible) {
    return null;
  }

  const getIcon = () => {
    switch (currentEvent.type) {
      case 'signup':
        return (
          <svg
            className="w-5 h-5 text-success"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case 'download':
        return (
          <svg
            className="w-5 h-5 text-trust"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        );
      case 'purchase':
        return (
          <svg
            className="w-5 h-5 text-bitcoin-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className={`fixed bottom-4 left-4 md:left-8 z-40 max-w-sm transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-4 flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-neutral-900 font-medium">
            {currentEvent.message}
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            {getTimeAgo(currentEvent.timestamp)}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
          aria-label="Dismiss notification"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
