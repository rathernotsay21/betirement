import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import { Header, Footer, SkipToContent } from '@/src/components/layout';
import { generateMetadata, generateOrganizationSchema } from '@/src/lib/seo';
import { JsonLd } from '@/src/components/seo';
import {
  PlausibleAnalytics,
  VercelAnalytics,
  AnalyticsProvider,
} from '@/src/components/analytics';
import { ABTestProvider } from '@/src/components/conversion';
import { AccessibilityAudit } from '@/src/components/ui/AccessibilityAudit';
import { CookieConsent } from '@/src/components/legal';
import { PerformanceMonitor } from '@/src/components/analytics/PerformanceMonitor';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
});

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();

  // Define A/B tests for the entire site
  const abTests = [
    {
      id: 'homepage-hero-cta',
      variants: ['A', 'B'],
      weights: [0.5, 0.5],
    },
    {
      id: 'email-capture-headline',
      variants: ['A', 'B'],
      weights: [0.5, 0.5],
    },
  ];

  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <head>
        <JsonLd data={organizationSchema} />
        <PlausibleAnalytics />
      </head>
      <body className="font-body antialiased">
        <AnalyticsProvider>
          <ABTestProvider tests={abTests}>
            <SkipToContent />
            <Header />
            <main id="main-content" className="min-h-screen pt-16 lg:pt-20">
              {children}
            </main>
            <Footer />
            <CookieConsent />
            <VercelAnalytics />
            <PerformanceMonitor />
            {process.env.NODE_ENV === 'development' && <AccessibilityAudit />}
          </ABTestProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
