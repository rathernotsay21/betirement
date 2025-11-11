'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Input } from '@/src/components/ui';
import { CheckCircle2 } from 'lucide-react';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('exitIntentShown');
    if (hasSeenPopup) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder for API integration
    // TODO: Integrate with ConvertKit API in task 11
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Email submitted:', email);
    setIsSubmitting(false);
    setIsOpen(false);
    
    // Show success message (could be a toast notification)
    alert('Thanks for subscribing! Check your email for your free guide.');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Wait! Don't Leave Empty-Handed"
      size="md"
    >
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-black mb-2">
            Get Your FREE Bitcoin Retirement Guide
          </h3>
          <p className="text-neutral-600">
            Learn the 5 essential steps to start building your Bitcoin retirement strategy today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Sending...' : 'Get My Free Guide'}
          </Button>

          <p className="text-xs text-neutral-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>

        <div className="pt-4 border-t border-neutral-200">
          <div className="flex items-start gap-3 text-sm text-neutral-600">
            <CheckCircle2 className="text-success w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Instant access</strong> - Download immediately after subscribing
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-neutral-600 mt-2">
            <CheckCircle2 className="text-success w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Weekly insights</strong> - Get exclusive Bitcoin retirement tips
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm text-neutral-600 mt-2">
            <CheckCircle2 className="text-success w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong>No spam</strong> - Only valuable content, unsubscribe anytime
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
