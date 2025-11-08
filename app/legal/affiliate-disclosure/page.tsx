import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | Betirement',
  description: 'Affiliate disclosure and transparency about how Betirement earns commissions from recommended products and services.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-black">Affiliate Disclosure</h1>
        <p className="text-neutral-500 mb-8">Last Updated: November 8, 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section className="bg-trust-light bg-opacity-10 border-l-4 border-trust p-6 rounded">
            <h2 className="text-xl font-bold mb-3 text-black">Transparency First</h2>
            <p className="text-neutral-700 font-semibold">
              We believe in complete transparency. This page explains how Betirement earns income through affiliate 
              relationships and how this may influence the content on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. What Are Affiliate Links?</h2>
            <p className="text-neutral-700 mb-4">
              Affiliate links are special tracking links that allow us to earn a commission when you purchase a product 
              or service through our recommendation. When you click an affiliate link and make a purchase, the company 
              pays us a small percentage of the sale at no additional cost to you.
            </p>
            <p className="text-neutral-700">
              This is a common practice that helps content creators like us continue providing free, valuable content 
              while earning income to support our work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. Our Affiliate Relationships</h2>
            <p className="text-neutral-700 mb-4">
              Betirement participates in various affiliate programs and may earn commissions from the following types 
              of products and services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Cryptocurrency exchanges and platforms</li>
              <li>Hardware wallets and security devices</li>
              <li>Books and educational resources</li>
              <li>Financial tools and software</li>
              <li>Online courses and training programs</li>
              <li>Web hosting and technology services</li>
              <li>Investment platforms and services</li>
            </ul>
            <p className="text-neutral-700">
              We may participate in affiliate programs including but not limited to Amazon Associates, cryptocurrency 
              exchange affiliate programs, and other relevant affiliate networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. How We Choose What to Recommend</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">3.1 Experience-Based Recommendations</h3>
            <p className="text-neutral-700 mb-4">
              We only recommend products and services that we have personally used, thoroughly researched, or genuinely 
              believe will provide value to our audience. The existence of an affiliate relationship does not influence 
              whether we recommend a product.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">3.2 Honest Reviews</h3>
            <p className="text-neutral-700 mb-4">
              Our reviews and recommendations are based on honest opinions and experiences. We will always disclose both 
              the benefits and drawbacks of products we recommend. If we have a negative experience with a product, we 
              will share that honestly, even if it has an affiliate program.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">3.3 No Obligation</h3>
            <p className="text-neutral-700">
              You are never obligated to purchase through our affiliate links. You can always search for products directly 
              or use non-affiliate links. The choice is entirely yours, and we respect whatever decision you make.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. Your Cost Remains the Same</h2>
            <p className="text-neutral-700 mb-4">
              Using our affiliate links does not cost you anything extra. The price you pay is the same whether you use 
              our affiliate link or go directly to the company's website.
            </p>
            <p className="text-neutral-700">
              In some cases, we may be able to negotiate special discounts or bonuses for our audience, which we will 
              clearly disclose when available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. How Affiliate Income Supports Our Work</h2>
            <p className="text-neutral-700 mb-4">
              Affiliate commissions help us:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>Continue creating free educational content</li>
              <li>Maintain and improve our website</li>
              <li>Research and test new products and services</li>
              <li>Invest in better equipment for video production</li>
              <li>Dedicate more time to helping our community</li>
            </ul>
            <p className="text-neutral-700">
              Without affiliate income and other revenue sources, we would not be able to provide the depth and quality 
              of free content that we currently offer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. Identifying Affiliate Links</h2>
            <p className="text-neutral-700 mb-4">
              We strive to clearly identify affiliate links on our website. You may see disclosures such as:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li>"This post contains affiliate links"</li>
              <li>"Affiliate link" or "Affiliate" notation near links</li>
              <li>Disclosure statements at the beginning or end of content</li>
              <li>Special styling or icons indicating affiliate links</li>
            </ul>
            <p className="text-neutral-700">
              However, please assume that any product or service link on this website may be an affiliate link.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. FTC Compliance</h2>
            <p className="text-neutral-700 mb-4">
              We comply with the Federal Trade Commission (FTC) guidelines regarding endorsements and testimonials. 
              We disclose our affiliate relationships in accordance with FTC requirements.
            </p>
            <p className="text-neutral-700">
              The FTC requires us to inform you that we may receive compensation for recommendations, which we do through 
              this disclosure page and inline disclosures throughout our content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">8. Sponsored Content</h2>
            <p className="text-neutral-700 mb-4">
              In addition to affiliate relationships, we may occasionally publish sponsored content or accept compensation 
              for product reviews or mentions. When we do, we will clearly disclose the sponsored nature of the content.
            </p>
            <p className="text-neutral-700">
              Sponsored content will be clearly labeled as "Sponsored," "Paid Partnership," or similar language. Our 
              editorial standards remain the same for sponsored content—we only work with brands we believe in and 
              maintain editorial independence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">9. Amazon Associates Disclosure</h2>
            <p className="text-neutral-700 mb-4">
              Betirement is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program 
              designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
            <p className="text-neutral-700">
              When you purchase through Amazon links on our site, we may earn a small commission at no additional cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">10. Cryptocurrency Exchange Affiliates</h2>
            <p className="text-neutral-700 mb-4">
              We may have affiliate relationships with cryptocurrency exchanges and platforms. When you sign up for an 
              exchange or platform through our link, we may receive a commission based on your trading activity or account 
              creation.
            </p>
            <p className="text-neutral-700">
              We only recommend exchanges and platforms that we have personally used and believe to be reputable. However, 
              you should always conduct your own research and understand the risks before using any cryptocurrency platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">11. No Guarantees</h2>
            <p className="text-neutral-700 mb-4">
              While we recommend products and services we believe in, we cannot guarantee your results or experience. 
              Every individual's situation is different, and what works for us may not work for you.
            </p>
            <p className="text-neutral-700">
              We are not responsible for the quality, performance, or customer service of third-party products and services. 
              Any issues with products or services should be directed to the respective companies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">12. Your Support Matters</h2>
            <p className="text-neutral-700 mb-4">
              When you use our affiliate links, you're supporting our work at no extra cost to you. We genuinely appreciate 
              your support, as it allows us to continue creating free content and helping others on their journey to financial 
              independence.
            </p>
            <p className="text-neutral-700">
              However, we want you to make the best decision for your situation. If you find a better deal elsewhere or 
              prefer to purchase directly, we completely understand and support your decision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">13. Changes to This Disclosure</h2>
            <p className="text-neutral-700">
              We may update this affiliate disclosure from time to time as we add new affiliate relationships or change 
              our practices. Please check this page periodically for updates. The "Last Updated" date at the top indicates 
              when this disclosure was last modified.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">14. Questions About Affiliate Relationships</h2>
            <p className="text-neutral-700 mb-4">
              If you have questions about our affiliate relationships or want to know if a specific link is an affiliate 
              link, please don't hesitate to contact us:
            </p>
            <p className="text-neutral-700">
              Email: <a href="mailto:affiliates@betirement.com" className="text-bitcoin-500 hover:underline">affiliates@betirement.com</a>
            </p>
          </section>

          <section className="bg-neutral-100 p-6 rounded">
            <h3 className="text-lg font-bold mb-3 text-black">Our Commitment to You</h3>
            <p className="text-neutral-700">
              We are committed to transparency, honesty, and providing value to our audience. Our recommendations are based 
              on genuine belief in the products and services we promote. Your trust is more valuable to us than any affiliate 
              commission, and we will never compromise our integrity for financial gain.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
