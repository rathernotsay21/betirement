"use client";

import { useState } from "react";
import { Modal } from "@/src/components/ui/Modal";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Mail, Download } from "lucide-react";

interface EmailGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceTitle: string;
  onSubmit: (email: string) => Promise<void>;
}

export default function EmailGateModal({
  isOpen,
  onClose,
  resourceTitle,
  onSubmit,
}: EmailGateModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(email);
      setEmail("");
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Get Your Free Resource" size="md">
      <div className="space-y-4">
        <div className="bg-bitcoin-50 border border-bitcoin-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Download className="w-5 h-5 text-bitcoin-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-bitcoin-900 mb-1">
                {resourceTitle}
              </h3>
              <p className="text-sm text-bitcoin-700">
                Enter your email to download this resource instantly
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              disabled={isSubmitting}
              required
            />
            {error && (
              <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div className="bg-neutral-50 rounded-lg p-4 text-sm text-neutral-600">
            <Mail className="w-4 h-4 inline mr-2" />
            By subscribing, you'll also receive our weekly newsletter with Bitcoin retirement strategies and exclusive content. Unsubscribe anytime.
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              loading={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? "Sending..." : "Get Resource"}
            </Button>
          </div>
        </form>

        <p className="text-xs text-neutral-500 text-center">
          We respect your privacy. Your email will never be shared.
        </p>
      </div>
    </Modal>
  );
}
