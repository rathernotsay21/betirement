export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Content Hub",
    href: "/content",
    children: [
      {
        label: "Video Library",
        href: "/content/videos",
      },
      {
        label: "Blog",
        href: "/content/blog",
      },
      {
        label: "Resources",
        href: "/content/resources",
      },
    ],
  },
  {
    label: "Community",
    href: "/community",
  },
  {
    label: "Start Here",
    href: "/start-here",
  },
  {
    label: "Speaking",
    href: "/speaking",
  },
];

export const footerNavigation = {
  content: [
    { label: "Video Library", href: "/content/videos" },
    { label: "Blog", href: "/content/blog" },
    { label: "Resources", href: "/content/resources" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Speaking", href: "/speaking" },
    { label: "Start Here", href: "/start-here" },
    { label: "Contact", href: "/contact" },
  ],
  community: [
    { label: "Join Community", href: "/community" },
    { label: "Success Stories", href: "/community/stories" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Disclaimer", href: "/legal/disclaimer" },
    { label: "Affiliate Disclosure", href: "/legal/affiliate-disclosure" },
  ],
};
