export const siteConfig = {
  name: "Betirement",
  title: "Betirement - Your Bridge to Bitcoin-Powered Freedom",
  description: "Real experience. Proven strategies. Your path to early retirement with Bitcoin.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://betirement.com",
  ogImage: "/images/og-image.jpg",
  links: {
    youtube: "https://youtube.com/@betirement",
    twitter: "https://twitter.com/betirement",
    instagram: "https://instagram.com/betirement",
    linkedin: "https://linkedin.com/in/betirement",
  },
  author: {
    name: "Michael",
    email: "contact@betirement.com",
    bio: "Retired at 51 using Bitcoin strategies. Sharing real experience and proven strategies for Bitcoin-powered early retirement.",
  },
  keywords: [
    "bitcoin retirement",
    "early retirement",
    "bitcoin investing",
    "financial independence",
    "cryptocurrency retirement",
    "bitcoin strategies",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
