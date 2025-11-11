'use client';

import { Button } from '@/src/components/ui';
import { useState } from 'react';
import { FileText, Camera, Mic, Video, Smartphone, Mail, LucideIcon } from 'lucide-react';

export function MediaKitSection() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    // Simulate download - in production, this would trigger actual file download
    setTimeout(() => {
      setDownloading(false);
      // In production: window.open('/downloads/betirement-media-kit.pdf', '_blank');
    }, 1000);
  };

  const mediaKitItems = [
    {
      title: 'Professional Bio',
      description: 'Short and long-form bios for various formats',
      icon: FileText,
    },
    {
      title: 'High-Res Photos',
      description: 'Professional headshots and lifestyle images',
      icon: Camera,
    },
    {
      title: 'Speaking Topics',
      description: 'Detailed descriptions of available presentations',
      icon: Mic,
    },
    {
      title: 'Past Appearances',
      description: 'Links to previous talks, podcasts, and interviews',
      icon: Video,
    },
    {
      title: 'Social Media',
      description: 'Handles, follower counts, and engagement stats',
      icon: Smartphone,
    },
    {
      title: 'Contact Info',
      description: 'Direct booking contact and response times',
      icon: Mail,
    },
  ];

  return (
    <section id="media-kit" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Media Kit
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              Everything you need to feature Michael in your publication, podcast, or event. Download the complete media kit with all assets and information.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? 'Preparing Download...' : 'Download Complete Media Kit (PDF)'}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {mediaKitItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-neutral-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-10 h-10 mb-4 text-bitcoin-500" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-neutral-600">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 bg-gradient-to-br from-bitcoin-500 to-bitcoin-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
              By the Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
                <div className="text-bitcoin-100">YouTube Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">2M+</div>
                <div className="text-bitcoin-100">Video Views</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">15K+</div>
                <div className="text-bitcoin-100">Email Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">7+</div>
                <div className="text-bitcoin-100">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
