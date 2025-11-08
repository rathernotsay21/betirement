"use client";

import type { MembershipTierInfo } from "@/types/community";
import { MembershipTierCard } from "./MembershipTierCard";

interface MembershipComparisonProps {
  tiers: MembershipTierInfo[];
  onSelectTier?: (tierId: string) => void;
}

export function MembershipComparison({
  tiers,
  onSelectTier,
}: MembershipComparisonProps) {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">
            Choose Your Membership Level
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Join thousands of members on their journey to Bitcoin-powered early
            retirement. Select the membership tier that fits your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <MembershipTierCard
              key={tier.id}
              tier={tier}
              onSelect={onSelectTier}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-600">
            All memberships include a 30-day money-back guarantee.{" "}
            <a href="#faq" className="text-bitcoin-500 hover:underline">
              View FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
