import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Betirement',
  description: 'Important disclaimers about the information and advice provided on Betirement.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-black">Disclaimer</h1>
        <p className="text-neutral-500 mb-8">Last Updated: November 8, 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section className="bg-bitcoin-50 border-l-4 border-bitcoin-500 p-6 rounded">
            <h2 className="text-xl font-bold mb-3 text-black">⚠️ Important Notice</h2>
            <p className="text-neutral-700 font-semibold">
              The information provided on this website is for educational and informational purposes only. 
              It is NOT financial, investment, legal, or tax advice. Always consult with qualified professionals 
              before making any financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. Not Financial Advice</h2>
            <p className="text-neutral-700 mb-4">
              The content on Betirement, including articles, videos, calculators, and other resources, is provided for 
              educational purposes only and should not be construed as financial, investment, legal, or tax advice.
            </p>
            <p className="text-neutral-700 mb-4">
              We are not registered financial advisors, investment advisors, or certified financial planners. The information 
              shared on this website represents personal experiences, opinions, and educational content only.
            </p>
            <p className="text-neutral-700">
              Before making any financial decisions, including but not limited to investing in Bitcoin, 
              retirement planning, or asset allocation, you should consult with qualified financial, legal, and tax professionals 
              who understand your specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. Investment Risks</h2>
            
            <h3 className="text-xl font-semibold mb-3 text-black">2.1 General Investment Risks</h3>
            <p className="text-neutral-700 mb-4">
              All investments carry risk, including the potential loss of principal. Past performance does not guarantee 
              future results. The value of investments can go up or down, and you may lose money.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-black">2.2 Bitcoin Risks</h3>
            <p className="text-neutral-700 mb-4">
              Bitcoin is a highly volatile and speculative investment. The bitcoin market
              is subject to significant price fluctuations, regulatory changes, technological risks, and other uncertainties.
            </p>
            <p className="text-neutral-700 mb-4">
              Bitcoin investments may result in substantial or complete loss of your investment. Consider the following risks:
            </p>
            <ul className="list-disc pl-6 mb-4 text-neutral-700 space-y-2">
              <li><strong>Volatility:</strong> Bitcoin price can fluctuate dramatically in short periods</li>
              <li><strong>Regulatory Risk:</strong> Government regulations may change and impact bitcoin value</li>
              <li><strong>Security Risk:</strong> Bitcoin can be lost or stolen through hacking or user error</li>
              <li><strong>Liquidity Risk:</strong> You may not be able to sell your bitcoin when desired</li>
              <li><strong>Technology Risk:</strong> Bitcoin technology continues to evolve and may have unforeseen issues</li>
              <li><strong>Market Risk:</strong> Bitcoin markets operate 24/7 with limited oversight</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 text-black">2.3 Retirement Planning Risks</h3>
            <p className="text-neutral-700">
              Early retirement planning involves complex financial considerations. Your individual circumstances, including 
              age, health, family situation, income, expenses, risk tolerance, and financial goals, will significantly impact 
              the appropriateness of any retirement strategy. What worked for one person may not work for you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. No Guarantees or Warranties</h2>
            <p className="text-neutral-700 mb-4">
              We make no representations or warranties regarding the accuracy, completeness, reliability, or timeliness of 
              the information provided on this website. The content is provided "as is" without any warranties of any kind.
            </p>
            <p className="text-neutral-700 mb-4">
              We do not guarantee any specific results or outcomes from using the information, strategies, or tools provided 
              on this website. Individual results will vary based on numerous factors.
            </p>
            <p className="text-neutral-700">
              While we strive to provide accurate and up-to-date information, laws, regulations, market conditions, and best 
              practices change frequently. Information on this website may become outdated or inaccurate over time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. Personal Experience and Opinions</h2>
            <p className="text-neutral-700 mb-4">
              The content on this website reflects personal experiences, opinions, and perspectives. What worked for the 
              author may not work for you. Your financial situation, risk tolerance, goals, and circumstances are unique.
            </p>
            <p className="text-neutral-700">
              The strategies and approaches discussed on this website are based on personal experience and should not be 
              considered universally applicable or suitable for everyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. Third-Party Content and Links</h2>
            <p className="text-neutral-700 mb-4">
              This website may contain links to third-party websites, products, or services. We do not endorse, guarantee, 
              or assume responsibility for any third-party content, products, or services.
            </p>
            <p className="text-neutral-700">
              Any reliance you place on third-party content or services is strictly at your own risk. We encourage you to 
              review the terms, privacy policies, and disclaimers of any third-party websites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. Calculators and Tools</h2>
            <p className="text-neutral-700 mb-4">
              Any calculators, tools, or interactive features provided on this website are for educational and illustrative 
              purposes only. They are based on simplified assumptions and may not accurately reflect your specific situation.
            </p>
            <p className="text-neutral-700">
              Results from calculators and tools should not be used as the sole basis for financial decisions. Always verify 
              calculations with qualified professionals and consider your unique circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. Tax Implications</h2>
            <p className="text-neutral-700 mb-4">
              We are not tax professionals. The tax implications of bitcoin investments, retirement planning, and 
              other financial strategies can be complex and vary based on your jurisdiction and individual circumstances.
            </p>
            <p className="text-neutral-700">
              Always consult with a qualified tax professional regarding the tax implications of any financial decisions. 
              Tax laws change frequently and may impact your financial strategies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">8. Legal Compliance</h2>
            <p className="text-neutral-700 mb-4">
              You are responsible for ensuring that your use of the information on this website and any actions you take 
              comply with all applicable laws and regulations in your jurisdiction.
            </p>
            <p className="text-neutral-700">
              Bitcoin regulations vary by country and region. Some jurisdictions may restrict or prohibit bitcoin 
              ownership or trading. It is your responsibility to understand and comply with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">9. No Professional Relationship</h2>
            <p className="text-neutral-700 mb-4">
              Your use of this website does not create a professional relationship between you and Betirement or its owner. 
              We do not have a fiduciary duty to you.
            </p>
            <p className="text-neutral-700">
              Any communication through this website, including email, comments, or forms, does not establish a professional 
              advisory relationship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">10. Limitation of Liability</h2>
            <p className="text-neutral-700 mb-4">
              To the fullest extent permitted by law, Betirement and its owner shall not be liable for any direct, indirect, 
              incidental, consequential, or punitive damages arising from your use of this website or reliance on any information 
              provided herein.
            </p>
            <p className="text-neutral-700">
              This includes but is not limited to financial losses, investment losses, lost profits, or any other damages 
              resulting from decisions made based on information from this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">11. Do Your Own Research</h2>
            <p className="text-neutral-700 mb-4">
              We strongly encourage you to conduct your own research and due diligence before making any financial decisions. 
              Consider multiple sources of information, consult with qualified professionals, and carefully evaluate your 
              personal circumstances.
            </p>
            <p className="text-neutral-700">
              Never invest money you cannot afford to lose. Never make financial decisions based solely on information from 
              a single source, including this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">12. Updates and Changes</h2>
            <p className="text-neutral-700">
              This disclaimer may be updated from time to time. Your continued use of the website after changes are posted 
              constitutes your acceptance of the updated disclaimer. Please review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">13. Questions</h2>
            <p className="text-neutral-700 mb-4">
              If you have questions about this disclaimer, please contact us at:
            </p>
            <p className="text-neutral-700">
              Email: <a href="mailto:legal@betirement.com" className="text-bitcoin-500 hover:underline">legal@betirement.com</a>
            </p>
          </section>

          <section className="bg-neutral-100 p-6 rounded">
            <p className="text-neutral-700 font-semibold">
              By using this website, you acknowledge that you have read, understood, and agree to this disclaimer. 
              If you do not agree with any part of this disclaimer, please do not use this website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
