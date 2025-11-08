#!/usr/bin/env node

/**
 * Lighthouse Audit Script
 * Runs Lighthouse audits on all major pages and generates reports
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Pages to audit
const PAGES = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Start Here', url: '/start-here' },
  { name: 'Videos', url: '/content/videos' },
  { name: 'Blog', url: '/content/blog' },
  { name: 'Resources', url: '/content/resources' },
  { name: 'Community', url: '/community' },
  { name: 'Speaking', url: '/speaking' },
  { name: 'Contact', url: '/contact' },
];

// Lighthouse configuration
const config = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
    },
  },
};

async function launchChromeAndRunLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: opts.chromeFlags });
  opts.port = chrome.port;
  const results = await lighthouse(url, opts, config);
  await chrome.kill();
  return results;
}

async function runAudit(baseUrl, device = 'mobile') {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const resultsDir = path.join(process.cwd(), 'lighthouse-reports', timestamp);

  // Create results directory
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  const results = [];
  const opts = {
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  };

  // Update config for device
  const deviceConfig = {
    ...config,
    settings: {
      ...config.settings,
      formFactor: device,
      screenEmulation: device === 'mobile' 
        ? { mobile: true, width: 375, height: 667, deviceScaleFactor: 2 }
        : { mobile: false, width: 1920, height: 1080, deviceScaleFactor: 1 },
    },
  };

  console.log(`\n🔍 Running Lighthouse audits (${device})...\n`);

  for (const page of PAGES) {
    const url = `${baseUrl}${page.url}`;
    console.log(`Auditing: ${page.name} (${url})`);

    try {
      const runnerResult = await launchChromeAndRunLighthouse(url, opts, deviceConfig);
      
      // Extract scores
      const scores = {
        performance: runnerResult.lhr.categories.performance.score * 100,
        accessibility: runnerResult.lhr.categories.accessibility.score * 100,
        bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
        seo: runnerResult.lhr.categories.seo.score * 100,
      };

      // Core Web Vitals
      const metrics = {
        lcp: runnerResult.lhr.audits['largest-contentful-paint'].numericValue,
        fid: runnerResult.lhr.audits['max-potential-fid']?.numericValue || 0,
        cls: runnerResult.lhr.audits['cumulative-layout-shift'].numericValue,
        fcp: runnerResult.lhr.audits['first-contentful-paint'].numericValue,
        tti: runnerResult.lhr.audits['interactive'].numericValue,
        tbt: runnerResult.lhr.audits['total-blocking-time'].numericValue,
        si: runnerResult.lhr.audits['speed-index'].numericValue,
      };

      results.push({
        page: page.name,
        url,
        scores,
        metrics,
      });

      // Save HTML report
      const reportHtml = runnerResult.report;
      const reportPath = path.join(resultsDir, `${page.name.toLowerCase().replace(/\s+/g, '-')}-${device}.html`);
      fs.writeFileSync(reportPath, reportHtml);

      console.log(`  ✓ Performance: ${scores.performance.toFixed(0)}`);
      console.log(`  ✓ Accessibility: ${scores.accessibility.toFixed(0)}`);
      console.log(`  ✓ Best Practices: ${scores.bestPractices.toFixed(0)}`);
      console.log(`  ✓ SEO: ${scores.seo.toFixed(0)}`);
      console.log(`  ✓ LCP: ${(metrics.lcp / 1000).toFixed(2)}s`);
      console.log(`  ✓ CLS: ${metrics.cls.toFixed(3)}`);
      console.log('');
    } catch (error) {
      console.error(`  ✗ Error auditing ${page.name}:`, error.message);
      results.push({
        page: page.name,
        url,
        error: error.message,
      });
    }
  }

  // Save summary JSON
  const summaryPath = path.join(resultsDir, `summary-${device}.json`);
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

  // Generate summary report
  generateSummaryReport(results, resultsDir, device);

  return results;
}

function generateSummaryReport(results, resultsDir, device) {
  const validResults = results.filter(r => !r.error);
  
  if (validResults.length === 0) {
    console.log('⚠️  No valid results to summarize');
    return;
  }

  const avgScores = {
    performance: validResults.reduce((sum, r) => sum + r.scores.performance, 0) / validResults.length,
    accessibility: validResults.reduce((sum, r) => sum + r.scores.accessibility, 0) / validResults.length,
    bestPractices: validResults.reduce((sum, r) => sum + r.scores.bestPractices, 0) / validResults.length,
    seo: validResults.reduce((sum, r) => sum + r.scores.seo, 0) / validResults.length,
  };

  const avgMetrics = {
    lcp: validResults.reduce((sum, r) => sum + r.metrics.lcp, 0) / validResults.length,
    cls: validResults.reduce((sum, r) => sum + r.metrics.cls, 0) / validResults.length,
    fcp: validResults.reduce((sum, r) => sum + r.metrics.fcp, 0) / validResults.length,
    tti: validResults.reduce((sum, r) => sum + r.metrics.tti, 0) / validResults.length,
  };

  const report = `
# Lighthouse Audit Summary (${device})
Generated: ${new Date().toLocaleString()}

## Average Scores
- Performance: ${avgScores.performance.toFixed(1)}/100
- Accessibility: ${avgScores.accessibility.toFixed(1)}/100
- Best Practices: ${avgScores.bestPractices.toFixed(1)}/100
- SEO: ${avgScores.seo.toFixed(1)}/100

## Core Web Vitals (Average)
- LCP (Largest Contentful Paint): ${(avgMetrics.lcp / 1000).toFixed(2)}s
- CLS (Cumulative Layout Shift): ${avgMetrics.cls.toFixed(3)}
- FCP (First Contentful Paint): ${(avgMetrics.fcp / 1000).toFixed(2)}s
- TTI (Time to Interactive): ${(avgMetrics.tti / 1000).toFixed(2)}s

## Individual Page Results

${validResults.map(r => `
### ${r.page}
- Performance: ${r.scores.performance.toFixed(0)}/100
- Accessibility: ${r.scores.accessibility.toFixed(0)}/100
- Best Practices: ${r.scores.bestPractices.toFixed(0)}/100
- SEO: ${r.scores.seo.toFixed(0)}/100
- LCP: ${(r.metrics.lcp / 1000).toFixed(2)}s
- CLS: ${r.metrics.cls.toFixed(3)}
`).join('\n')}

## Recommendations

${avgScores.performance < 90 ? '⚠️  Performance score below target (90). Review bundle size and loading strategies.' : '✓ Performance score meets target.'}
${avgScores.accessibility < 95 ? '⚠️  Accessibility score below target (95). Review ARIA labels and semantic HTML.' : '✓ Accessibility score meets target.'}
${avgMetrics.lcp > 2500 ? '⚠️  LCP above 2.5s threshold. Optimize images and critical rendering path.' : '✓ LCP within acceptable range.'}
${avgMetrics.cls > 0.1 ? '⚠️  CLS above 0.1 threshold. Review layout shifts and reserve space for dynamic content.' : '✓ CLS within acceptable range.'}
`;

  const reportPath = path.join(resultsDir, `SUMMARY-${device}.md`);
  fs.writeFileSync(reportPath, report);

  console.log('\n📊 Summary Report\n');
  console.log(report);
  console.log(`\n📁 Reports saved to: ${resultsDir}\n`);
}

// Main execution
const baseUrl = process.argv[2] || 'http://localhost:3000';
const device = process.argv[3] || 'mobile';

console.log(`Starting Lighthouse audits for: ${baseUrl}`);
console.log(`Device: ${device}`);

runAudit(baseUrl, device)
  .then(() => {
    console.log('✅ Lighthouse audits completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error running audits:', error);
    process.exit(1);
  });
