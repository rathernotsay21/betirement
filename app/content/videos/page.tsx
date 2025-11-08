"use client";

import { useState, useEffect, useCallback } from "react";
import { Video, VideoCategory } from "@/src/types/video";
import { youtubeClient } from "@/src/lib/youtube";
import { mockVideos } from "@/src/data/mock-videos";
import CategoryFilter from "@/src/components/content/CategoryFilter";
import VideoSearch from "@/src/components/content/VideoSearch";
import VideoGrid from "@/src/components/content/VideoGrid";
import Pagination from "@/src/components/content/Pagination";

const VIDEOS_PER_PAGE = 12;

export default function VideosPage() {
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  // Fetch videos on mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch real videos
        const videos = await youtubeClient.getChannelVideos(50);

        if (videos.length > 0) {
          setAllVideos(videos);
          setFilteredVideos(videos);
          setIsUsingMockData(false);
        } else {
          // Fall back to mock data if no videos returned
          console.log("No videos from YouTube API, using mock data");
          setAllVideos(mockVideos);
          setFilteredVideos(mockVideos);
          setIsUsingMockData(true);
        }
      } catch (err) {
        console.error("Error fetching videos:", err);

        // Fall back to mock data on error
        console.log("Using mock data due to API error");
        setAllVideos(mockVideos);
        setFilteredVideos(mockVideos);
        setIsUsingMockData(true);
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on category and search query
  useEffect(() => {
    let filtered = allVideos;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((video) => video.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredVideos(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allVideos, selectedCategory, searchQuery]);

  // Update displayed videos based on pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * VIDEOS_PER_PAGE;
    const endIndex = startIndex + VIDEOS_PER_PAGE;
    setDisplayedVideos(filteredVideos.slice(startIndex, endIndex));
  }, [filteredVideos, currentPage]);

  const handleCategoryChange = useCallback((category: VideoCategory | "all") => {
    setSelectedCategory(category);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            Video Library
          </h1>
          <p className="text-neutral-600 text-lg">
            Explore our collection of videos on Bitcoin and retirement planning.
            Learn from real experience and proven strategies.
          </p>
        </div>

        {/* Development Notice */}
        {isUsingMockData && process.env.NODE_ENV === "development" && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Development Mode:</strong> Using mock video data. Configure YouTube API credentials in .env.local to load real videos.
            </p>
          </div>
        )}

        {/* Search */}
        <VideoSearch
          onSearch={handleSearch}
          placeholder="Search by title, description, or tags..."
        />

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Results Count */}
        {!loading && !error && (
          <div className="mb-6">
            <p className="text-neutral-600">
              Showing {displayedVideos.length} of {filteredVideos.length} videos
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-bitcoin-500"></div>
            <p className="mt-4 text-neutral-600">Loading videos...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Video Grid */}
        {!loading && !error && (
          <>
            <VideoGrid
              videos={displayedVideos}
              emptyMessage={
                searchQuery
                  ? `No videos found for "${searchQuery}". Try a different search term.`
                  : "No videos found in this category."
              }
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
