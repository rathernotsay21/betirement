"use client";

import dynamic from "next/dynamic";
import {
  MembershipComparison,
} from "@/components/community";
import { Button } from "@/components/ui";
import { Users, Heart, TrendingUp, Shield } from "lucide-react";
import type { MembershipTierInfo } from "@/types/community";
import membershipTiersData from "@/data/community/membership-tiers.json";

// Dynamic imports for below-fold components
const ForumPlaceholder = dynamic(
  () => import("@/components/community").then((mod) => mod.ForumPlaceholder),
  { ssr: false }
);

const SuccessStoryForm = dynamic(
  () => import("@/components/community").then((mod) => mod.SuccessStoryForm),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bitcoin-500"></div>
        <p className="mt-4 text-neutral-600">Loading form...</p>
      </div>
    ),
  }
);

const InstagramFeed = dynamic(
  () => import("@/components/social").then((mod) => mod.InstagramFeed),
  { ssr: false }
);

const TwitterTimeline = dynamic(
  () => import("@/components/social").then((mod) => mod.TwitterTimeline),
  { ssr: false }
);

const SocialFollowerStats = dynamic(
  () => import("@/components/social").then((mod) => mod.SocialFollowerStats),
  { ssr: false }
);

const membershipTiers = membershipTiersData.tiers as MembershipTierInfo[];

export default function CommunityPage() {
  const handleTierSelect = (tierId: string) => {
    // Scroll to email capture or redirect to signup
    const emailSection = document.getElementById("join-community");
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bitcoin-500 to-bitcoin-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Join the Betirement Community
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-bitcoin-50">
              Connect with thousands of members on their journey to
              Bitcoin-powered early retirement. Learn, share, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("membership")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Membership Options
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-bitcoin-500"
                onClick={() =>
                  document
                    .getElementById("forum")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Community Forum
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Why Join Our Community?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              More than just a membership - it's a supportive network of
              like-minded individuals pursuing financial freedom through Bitcoin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-bitcoin-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-bitcoin-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Connect & Learn
              </h3>
              <p className="text-neutral-600">
                Engage with experienced members, ask questions, and learn from
                real success stories.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Exclusive Content
              </h3>
              <p className="text-neutral-600">
                Access premium videos, tools, and resources not available to the
                public.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-trust/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-trust" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Expert Guidance
              </h3>
              <p className="text-neutral-600">
                Get insights from Michael and other experts who've successfully
                retired with Bitcoin.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                Supportive Network
              </h3>
              <p className="text-neutral-600">
                Join a judgment-free community that celebrates your wins and
                supports your challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <div id="membership">
        <MembershipComparison
          tiers={membershipTiers}
          onSelectTier={handleTierSelect}
        />
      </div>

      {/* Forum Section */}
      <div id="forum">
        <ForumPlaceholder />
      </div>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Member Success Stories
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Real stories from real members who are achieving their Bitcoin
              retirement goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Sample Success Stories */}
            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-bitcoin-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h3 className="font-bold text-black">John D.</h3>
                  <p className="text-sm text-neutral-600">Retired at 49</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The community support was invaluable. I learned strategies that
                accelerated my retirement by 5 years. Best investment I ever
                made."
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-bitcoin-500 rounded-full flex items-center justify-center text-white font-bold">
                  SM
                </div>
                <div>
                  <h3 className="font-bold text-black">Sarah M.</h3>
                  <p className="text-sm text-neutral-600">Premium Member</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The calculators and planning tools helped me create a clear
                roadmap. I'm now on track to retire in 3 years at age 52."
              </p>
            </div>

            <div className="bg-neutral-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-bitcoin-500 rounded-full flex items-center justify-center text-white font-bold">
                  RT
                </div>
                <div>
                  <h3 className="font-bold text-black">Robert T.</h3>
                  <p className="text-sm text-neutral-600">VIP Member</p>
                </div>
              </div>
              <p className="text-neutral-700 italic">
                "The monthly calls with Michael transformed my strategy. His
                personalized guidance was worth every penny."
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .getElementById("share-story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Read More Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Social Media Feeds */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Stay Connected
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Follow us on social media for daily Bitcoin retirement tips, market insights, and community updates.
            </p>
            <SocialFollowerStats className="mb-12" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                Latest from Instagram
              </h3>
              <InstagramFeed maxPosts={6} />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-black mb-6">
                Recent Tweets
              </h3>
              <TwitterTimeline username="betirement" height={600} theme="light" />
            </div>
          </div>
        </div>
      </section>

      {/* Success Story Submission Form */}
      <div id="share-story">
        <SuccessStoryForm />
      </div>

      {/* CTA Section */}
      <section id="join-community" className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Join thousands of members who are building their path to
              Bitcoin-powered early retirement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("membership")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Choose Your Membership
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black"
                href="/start-here"
              >
                Take the Quiz First
              </Button>
            </div>
            <p className="text-sm text-neutral-400 mt-6">
              30-day money-back guarantee • Cancel anytime • No long-term
              commitment
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
