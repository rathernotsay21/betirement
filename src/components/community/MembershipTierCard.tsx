"use client";

import type { MembershipTierInfo } from "@/types/community";
import { Button } from "@/components/ui";
import { Check } from "lucide-react";

interface MembershipTierCardProps {
  tier: MembershipTierInfo;
  onSelect?: (tierId: string) => void;
}

export function MembershipTierCard({ tier, onSelect }: MembershipTierCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-lg border-2 p-8 ${
        tier.highlighted
          ? "border-bitcoin-500 shadow-lg scale-105"
          : "border-neutral-200"
      } bg-white transition-all hover:shadow-xl`}
    >
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-bitcoin-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-black mb-2">{tier.name}</h3>
        <div className="text-3xl font-bold text-bitcoin-500 mb-3">
          {tier.price}
        </div>
        <p className="text-neutral-600">{tier.description}</p>
      </div>

      <ul className="space-y-3 mb-8 flex-grow">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
            <span className="text-neutral-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={tier.highlighted ? "primary" : "outline"}
        size="lg"
        onClick={() => onSelect?.(tier.id)}
        className="w-full"
      >
        {tier.cta}
      </Button>
    </div>
  );
}
