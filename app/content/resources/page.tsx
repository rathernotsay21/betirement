"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Resource, ResourceType, ResourceDifficulty } from "@/src/types/resource";
import ResourceCard from "@/src/components/content/ResourceCard";
import ResourceFilters from "@/src/components/content/ResourceFilters";
import EmailGateModal from "@/src/components/content/EmailGateModal";
import { Button } from "@/src/components/ui/Button";
import { BookOpen, Calculator } from "lucide-react";
import Link from "next/link";

// Dynamic imports for heavy calculator components
const RetirementCalculator = dynamic(
  () => import("@/src/components/calculators/RetirementCalculator"),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bitcoin-500"></div>
        <p className="mt-4 text-neutral-600">Loading calculator...</p>
      </div>
    ),
    ssr: false,
  }
);

const BitcoinAllocationCalculator = dynamic(
  () => import("@/src/components/calculators/BitcoinAllocationCalculator"),
  {
    loading: () => (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bitcoin-500"></div>
        <p className="mt-4 text-neutral-600">Loading calculator...</p>
      </div>
    ),
    ssr: false,
  }
);

// Import resources data
import resourcesData from "@/src/data/resources/resources.json";

export default function ResourcesPage() {
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<ResourceDifficulty | "all">("all");
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showCalculators, setShowCalculators] = useState(false);

  const resources = resourcesData as Resource[];

  // Filter resources
  const filteredResources = resources.filter((resource) => {
    const typeMatch = selectedType === "all" || resource.type === selectedType;
    const difficultyMatch = selectedDifficulty === "all" || resource.difficulty === selectedDifficulty;
    return typeMatch && difficultyMatch;
  });

  const handleResourceDownload = (resource: Resource) => {
    if (resource.type === "calculator") {
      setShowCalculators(true);
      return;
    }

    if (resource.requiresEmail) {
      setSelectedResource(resource);
      setShowEmailGate(true);
    } else if (resource.downloadUrl) {
      // Direct download
      window.open(resource.downloadUrl, "_blank");
    }
  };

  const handleEmailSubmit = async (email: string) => {
    // TODO: Integrate with ConvertKit API
    console.log("Email submitted:", email);
    console.log("Resource:", selectedResource?.title);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // After successful submission, trigger download
    if (selectedResource?.downloadUrl) {
      window.open(selectedResource.downloadUrl, "_blank");
    }

    // Show success message (could use a toast notification)
    alert("Check your email for the download link!");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-bitcoin-500 to-bitcoin-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Resources Center
            </h1>
            <p className="text-xl text-bitcoin-50">
              Free guides, calculators, and tools to help you plan your Bitcoin-powered retirement
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-bitcoin-500">
            <div className="flex items-start gap-4">
              <Calculator className="w-8 h-8 text-bitcoin-500 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-heading font-bold mb-2">Interactive Calculators</h2>
                <p className="text-neutral-600 mb-4">
                  Plan your retirement and calculate your Bitcoin allocation with our free tools
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCalculators(true)}
                >
                  Open Calculators
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-trust">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-trust flex-shrink-0" />
              <div>
                <h2 className="text-xl font-heading font-bold mb-2">Bitcoin Glossary</h2>
                <p className="text-neutral-600 mb-4">
                  Learn the terminology with our comprehensive glossary of Bitcoin and retirement terms
                </p>
                <Link href="/content/resources/glossary">
                  <Button variant="outline" size="sm">
                    View Glossary
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ResourceFilters
          selectedType={selectedType}
          selectedDifficulty={selectedDifficulty}
          onTypeChange={setSelectedType}
          onDifficultyChange={setSelectedDifficulty}
        />

        {/* Resources Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-heading font-bold mb-6">
            {selectedType === "all" ? "All Resources" : `${selectedType.toUpperCase()} Resources`}
            <span className="text-neutral-500 text-lg ml-2">
              ({filteredResources.length})
            </span>
          </h2>

          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onDownload={handleResourceDownload}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-500 text-lg">
                No resources found matching your filters.
              </p>
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setSelectedType("all");
                  setSelectedDifficulty("all");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Calculators Section */}
        {showCalculators && (
          <div className="space-y-8 mb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-heading font-bold">Interactive Calculators</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCalculators(false)}
              >
                Hide Calculators
              </Button>
            </div>

            <RetirementCalculator />
            <BitcoinAllocationCalculator />
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-lg p-8 text-white text-center mt-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Want More Exclusive Resources?
          </h2>
          <p className="text-xl text-bitcoin-50 mb-6 max-w-2xl mx-auto">
            Join our community to get access to premium guides, templates, and personalized retirement strategies
          </p>
          <Link href="/start-here">
            <Button variant="secondary" size="lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Email Gate Modal */}
      {showEmailGate && selectedResource && (
        <EmailGateModal
          isOpen={showEmailGate}
          onClose={() => {
            setShowEmailGate(false);
            setSelectedResource(null);
          }}
          resourceTitle={selectedResource.title}
          onSubmit={handleEmailSubmit}
        />
      )}
    </div>
  );
}
