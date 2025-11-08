import { Video } from "@/src/types/video";

/**
 * Mock video data for development and fallback
 * Based on typical Bitcoin/retirement content themes
 */
export const mockVideos: Video[] = [
  {
    id: "mock-1",
    youtubeId: "dQw4w9WgXcQ",
    title: "Why Bitcoin is the Ultimate Retirement Asset",
    description: "In this video, I explain why Bitcoin should be a core part of your retirement portfolio. We'll cover the fundamentals of digital scarcity, inflation hedging, and long-term value appreciation.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=1",
      medium: "https://picsum.photos/320/180?random=1",
      high: "https://picsum.photos/640/360?random=1",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    duration: "18:42",
    category: "bitcoin-fundamentals",
    tags: ["bitcoin", "retirement", "investing", "portfolio"],
    viewCount: 45234,
    likeCount: 2103,
  },
  {
    id: "mock-2",
    youtubeId: "mock-video-2",
    title: "My Journey to Early Retirement at 51 with Bitcoin",
    description: "Sharing my personal story of how strategic Bitcoin investing allowed me to retire early. Learn from my mistakes and successes on the path to financial freedom.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=2",
      medium: "https://picsum.photos/320/180?random=2",
      high: "https://picsum.photos/640/360?random=2",
    },
    publishedAt: "2024-01-10T14:30:00Z",
    duration: "25:16",
    category: "success-stories",
    tags: ["early retirement", "bitcoin success", "financial freedom", "personal story"],
    viewCount: 78432,
    likeCount: 5421,
  },
  {
    id: "mock-3",
    youtubeId: "mock-video-3",
    title: "Bitcoin Market Analysis: Q1 2024 Outlook",
    description: "Technical and fundamental analysis of Bitcoin's price action and what to expect in the coming months. Key levels, on-chain metrics, and macro factors discussed.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=3",
      medium: "https://picsum.photos/320/180?random=3",
      high: "https://picsum.photos/640/360?random=3",
    },
    publishedAt: "2024-01-05T09:15:00Z",
    duration: "32:08",
    category: "market-analysis",
    tags: ["bitcoin analysis", "price prediction", "technical analysis", "market outlook"],
    viewCount: 56789,
    likeCount: 3234,
  },
  {
    id: "mock-4",
    youtubeId: "mock-video-4",
    title: "The 4% Rule vs Bitcoin: Rethinking Retirement Planning",
    description: "Comparing traditional retirement strategies with a Bitcoin-inclusive approach. Why the old rules may no longer apply in the digital age.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=4",
      medium: "https://picsum.photos/320/180?random=4",
      high: "https://picsum.photos/640/360?random=4",
    },
    publishedAt: "2024-01-01T11:00:00Z",
    duration: "21:54",
    category: "retirement-planning",
    tags: ["4% rule", "retirement planning", "bitcoin strategy", "financial planning"],
    viewCount: 34567,
    likeCount: 1987,
  },
  {
    id: "mock-5",
    youtubeId: "mock-video-5",
    title: "Dollar Cost Averaging into Bitcoin: My 10-Year Strategy",
    description: "How I've been systematically accumulating Bitcoin over the past decade using DCA. Includes real numbers and results from my personal portfolio.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=5",
      medium: "https://picsum.photos/320/180?random=5",
      high: "https://picsum.photos/640/360?random=5",
    },
    publishedAt: "2023-12-28T13:45:00Z",
    duration: "19:23",
    category: "investment-strategies",
    tags: ["DCA", "bitcoin investing", "long-term strategy", "portfolio management"],
    viewCount: 67890,
    likeCount: 4532,
  },
  {
    id: "mock-6",
    youtubeId: "mock-video-6",
    title: "Book Review: The Bitcoin Standard by Saifedean Ammous",
    description: "Deep dive into one of the most important books about Bitcoin. Key takeaways and how it shaped my understanding of money and economics.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=6",
      medium: "https://picsum.photos/320/180?random=6",
      high: "https://picsum.photos/640/360?random=6",
    },
    publishedAt: "2023-12-25T10:30:00Z",
    duration: "28:17",
    category: "book-club",
    tags: ["book review", "bitcoin standard", "economics", "monetary theory"],
    viewCount: 23456,
    likeCount: 1234,
  },
  {
    id: "mock-7",
    youtubeId: "mock-video-7",
    title: "Understanding Bitcoin Cycles: When to Buy and Hold",
    description: "Exploring the 4-year halving cycle and how it affects Bitcoin's price. Historical patterns and what they might mean for future returns.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=7",
      medium: "https://picsum.photos/320/180?random=7",
      high: "https://picsum.photos/640/360?random=7",
    },
    publishedAt: "2023-12-20T08:00:00Z",
    duration: "24:38",
    category: "bitcoin-fundamentals",
    tags: ["bitcoin cycles", "halving", "market cycles", "investment timing"],
    viewCount: 89012,
    likeCount: 6789,
  },
  {
    id: "mock-8",
    youtubeId: "mock-video-8",
    title: "Retiring Abroad with Bitcoin: Tax Optimization Strategies",
    description: "How to structure your Bitcoin holdings for tax efficiency when retiring internationally. Legal strategies and important considerations.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=8",
      medium: "https://picsum.photos/320/180?random=8",
      high: "https://picsum.photos/640/360?random=8",
    },
    publishedAt: "2023-12-15T12:15:00Z",
    duration: "30:45",
    category: "retirement-planning",
    tags: ["tax strategy", "international retirement", "bitcoin taxation", "expat life"],
    viewCount: 45678,
    likeCount: 2890,
  },
  {
    id: "mock-9",
    youtubeId: "mock-video-9",
    title: "Bitcoin vs Real Estate: Where to Invest for Retirement",
    description: "Comprehensive comparison of Bitcoin and real estate as retirement assets. Liquidity, returns, management, and risk considerations.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=9",
      medium: "https://picsum.photos/320/180?random=9",
      high: "https://picsum.photos/640/360?random=9",
    },
    publishedAt: "2023-12-10T15:30:00Z",
    duration: "27:12",
    category: "investment-strategies",
    tags: ["bitcoin vs real estate", "investment comparison", "asset allocation", "retirement assets"],
    viewCount: 56789,
    likeCount: 3456,
  },
  {
    id: "mock-10",
    youtubeId: "mock-video-10",
    title: "Live Q&A: Your Bitcoin Retirement Questions Answered",
    description: "Answering viewer questions about Bitcoin, retirement planning, and achieving financial independence. Timestamps in description.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=10",
      medium: "https://picsum.photos/320/180?random=10",
      high: "https://picsum.photos/640/360?random=10",
    },
    publishedAt: "2023-12-05T18:00:00Z",
    duration: "45:23",
    category: "success-stories",
    tags: ["Q&A", "viewer questions", "bitcoin advice", "retirement planning"],
    viewCount: 34567,
    likeCount: 2345,
  },
  {
    id: "mock-11",
    youtubeId: "mock-video-11",
    title: "Bitcoin Security for Retirees: Protecting Your Wealth",
    description: "Essential security practices for storing and managing Bitcoin in retirement. Hardware wallets, multi-sig, and inheritance planning.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=11",
      medium: "https://picsum.photos/320/180?random=11",
      high: "https://picsum.photos/640/360?random=11",
    },
    publishedAt: "2023-12-01T11:45:00Z",
    duration: "22:56",
    category: "bitcoin-fundamentals",
    tags: ["bitcoin security", "hardware wallets", "cold storage", "inheritance planning"],
    viewCount: 78901,
    likeCount: 5678,
  },
  {
    id: "mock-12",
    youtubeId: "mock-video-12",
    title: "December Market Update: Bitcoin Breaking Records",
    description: "Monthly analysis of Bitcoin's price action, institutional adoption news, and what it means for long-term holders and retirees.",
    thumbnail: {
      default: "https://picsum.photos/120/90?random=12",
      medium: "https://picsum.photos/320/180?random=12",
      high: "https://picsum.photos/640/360?random=12",
    },
    publishedAt: "2023-11-30T09:00:00Z",
    duration: "18:34",
    category: "market-analysis",
    tags: ["market update", "price analysis", "bitcoin news", "institutional adoption"],
    viewCount: 91234,
    likeCount: 7890,
  },
];

/**
 * Get mock videos by category
 */
export function getMockVideosByCategory(category: string): Video[] {
  return mockVideos.filter(video => video.category === category);
}

/**
 * Get featured mock videos (top by view count)
 */
export function getFeaturedMockVideos(count: number = 4): Video[] {
  return [...mockVideos]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, count);
}

/**
 * Search mock videos
 */
export function searchMockVideos(query: string): Video[] {
  const searchTerm = query.toLowerCase();
  return mockVideos.filter(video =>
    video.title.toLowerCase().includes(searchTerm) ||
    video.description.toLowerCase().includes(searchTerm) ||
    video.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}