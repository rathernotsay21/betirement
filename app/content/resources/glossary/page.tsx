"use client";

import { useState, useMemo } from "react";
import { Search, BookOpen } from "lucide-react";
import { Input } from "@/src/components/ui/Input";
import Link from "next/link";

// Import glossary terms
import glossaryData from "@/src/data/glossary/terms.json";

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const terms = glossaryData as GlossaryTerm[];

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(terms.map((term) => term.category));
    return ["all", ...Array.from(cats).sort()];
  }, [terms]);

  // Filter and search terms
  const filteredTerms = useMemo(() => {
    return terms.filter((term) => {
      const matchesSearch =
        searchQuery === "" ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [terms, searchQuery, selectedCategory]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};

    filteredTerms.forEach((term) => {
      const firstLetter = term.term[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });

    // Sort terms within each group
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => a.term.localeCompare(b.term));
    });

    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort();

  const categoryColors: Record<string, string> = {
    Cryptocurrency: "bg-bitcoin-100 text-bitcoin-700 border-bitcoin-200",
    Technology: "bg-trust/10 text-trust border-trust/20",
    Security: "bg-red-100 text-red-700 border-red-200",
    Strategy: "bg-success/10 text-success border-success/20",
    Economics: "bg-purple-100 text-purple-700 border-purple-200",
    Investment: "bg-blue-100 text-blue-700 border-blue-200",
    Retirement: "bg-green-100 text-green-700 border-green-200",
    Regulation: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-trust to-trust-light text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Bitcoin & Retirement Glossary
            </h1>
            <p className="text-xl text-blue-50">
              Your comprehensive guide to understanding Bitcoin and retirement planning terminology
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/content/resources"
            className="text-bitcoin-500 hover:text-bitcoin-600 font-medium"
          >
            ← Back to Resources
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-neutral-700 mb-2">
              Search Terms
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                id="search"
                type="text"
                placeholder="Search for a term or definition..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Filter by Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-bitcoin-500 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {category === "all" ? "All Categories" : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing <span className="font-semibold">{filteredTerms.length}</span> term
            {filteredTerms.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Glossary Terms */}
        {letters.length > 0 ? (
          <div className="space-y-8">
            {letters.map((letter) => (
              <div key={letter} id={letter}>
                <h2 className="text-3xl font-heading font-bold text-bitcoin-600 mb-4 pb-2 border-b-2 border-bitcoin-200">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {groupedTerms[letter].map((term) => (
                    <div
                      key={term.id}
                      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-heading font-bold text-black">
                          {term.term}
                        </h3>
                        <span
                          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border whitespace-nowrap ${
                            categoryColors[term.category] || "bg-neutral-100 text-neutral-700 border-neutral-200"
                          }`}
                        >
                          {term.category}
                        </span>
                      </div>
                      <p className="text-neutral-700 leading-relaxed">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-neutral-500 text-lg mb-4">
              No terms found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-bitcoin-500 hover:text-bitcoin-600 font-medium"
            >
              Clear search and filters
            </button>
          </div>
        )}

        {/* Alphabet Navigation (for large screens) */}
        {letters.length > 0 && (
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden xl:block">
            <div className="bg-white rounded-lg shadow-lg p-2 space-y-1">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#${letter}`}
                  className="block w-8 h-8 flex items-center justify-center text-sm font-semibold text-neutral-600 hover:bg-bitcoin-50 hover:text-bitcoin-600 rounded transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-bitcoin-500 to-bitcoin-600 rounded-lg p-8 text-white text-center mt-12">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Ready to Put This Knowledge to Use?
          </h2>
          <p className="text-xl text-bitcoin-50 mb-6 max-w-2xl mx-auto">
            Start your Bitcoin retirement journey with our free resources and calculators
          </p>
          <Link href="/content/resources">
            <button className="bg-white text-bitcoin-600 px-8 py-3 rounded-lg font-semibold hover:bg-bitcoin-50 transition-colors">
              Explore Resources
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
