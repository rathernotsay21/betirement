'use client';

import { useEffect, useRef } from 'react';

interface TwitterTimelineProps {
  username: string;
  height?: number;
  theme?: 'light' | 'dark';
  className?: string;
}

export function TwitterTimeline({ 
  username, 
  height = 600, 
  theme = 'light',
  className = '' 
}: TwitterTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Twitter widgets script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    
    // Check if script is already loaded
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      document.body.appendChild(script);
    }

    // Reload widgets if script is already present
    if (window.twttr?.widgets) {
      window.twttr.widgets.load();
    }

    return () => {
      // Cleanup is handled by Twitter's widget script
    };
  }, []);

  return (
    <div className={className} ref={timelineRef}>
      <a
        className="twitter-timeline"
        data-height={height}
        data-theme={theme}
        data-chrome="noheader nofooter noborders"
        href={`https://twitter.com/${username.replace('@', '')}`}
      >
        Loading tweets by @{username.replace('@', '')}...
      </a>
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}
