export const siteConfig = {
  name: "Betirement",
  title: "₿etirement - Engineer Your Bitcoin Retirement",
  description: "Practical bitcoin strategies from 28 years in engineering. No hype, just data and experience.",
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
    bio: "Retired at 51 with bitcoin. Engineer sharing practical lessons from actual experience, not theory.",
  },
  keywords: [
    "bitcoin retirement",
    "early retirement",
    "bitcoin allocation",
    "financial independence",
    "engineer retirement",
    "bitcoin strategy",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
