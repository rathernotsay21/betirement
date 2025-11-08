"use client";

import { Button } from "@/components/ui";
import { MessageSquare, Users, TrendingUp, Award } from "lucide-react";

export function ForumPlaceholder() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Member Community Forum
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Connect with fellow members, share experiences, and learn from the
            community on your Bitcoin retirement journey.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Forum Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <Users className="w-8 h-8 text-bitcoin-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-black mb-1">2,500+</div>
              <div className="text-sm text-neutral-600">Active Members</div>
            </div>
            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <MessageSquare className="w-8 h-8 text-bitcoin-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-black mb-1">15,000+</div>
              <div className="text-sm text-neutral-600">Discussions</div>
            </div>
            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-bitcoin-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-black mb-1">500+</div>
              <div className="text-sm text-neutral-600">Success Stories</div>
            </div>
            <div className="text-center p-6 bg-neutral-50 rounded-lg">
              <Award className="w-8 h-8 text-bitcoin-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-black mb-1">24/7</div>
              <div className="text-sm text-neutral-600">Community Support</div>
            </div>
          </div>

          {/* Forum Preview */}
          <div className="bg-neutral-50 rounded-lg p-8 md:p-12 text-center">
            <MessageSquare className="w-16 h-16 text-bitcoin-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-black mb-4">
              Join the Conversation
            </h3>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              Our member forum is hosted on a dedicated community platform where
              you can engage in threaded discussions, share insights, ask
              questions, and connect with other members pursuing Bitcoin-powered
              early retirement.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-2 text-neutral-700">
                <Check className="w-5 h-5 text-success" />
                <span>Moderated discussions for quality content</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-neutral-700">
                <Check className="w-5 h-5 text-success" />
                <span>Topic categories: Strategy, News, Success Stories</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-neutral-700">
                <Check className="w-5 h-5 text-success" />
                <span>Direct messaging with other members</span>
              </div>
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                window.open("https://community.betirement.com", "_blank")
              }
            >
              Access Member Forum
            </Button>
            <p className="text-sm text-neutral-500 mt-4">
              Premium and VIP members only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
