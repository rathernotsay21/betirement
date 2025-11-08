import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Community - Join the Betirement Movement",
  description:
    "Connect with thousands of members pursuing Bitcoin-powered early retirement. Access exclusive content, join discussions, and share your journey.",
  keywords: [
    "bitcoin community",
    "retirement community",
    "bitcoin investors",
    "early retirement network",
  ],
  url: "/community",
});

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
