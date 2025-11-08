#!/usr/bin/env node

/**
 * Slow Connection Testing Script
 * Tests page load times under various network conditions
 */

const puppeteer = require('puppeteer');

const NETWORK_PROFILES = {
  'slow-3g': {
    downloadThroughput: (500 * 1024) / 8,
    uploadThroughput: (500 * 1024) / 8,
    latency: 400,
  },
  'fast-3g': {
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
    latency: 150,
  },
  '4g': {
    downloadThroughput: (4 * 1024 * 1024) / 8,
    uploadThroughput: (3 * 1024 * 1024) / 8,
    latency: 50,
  },
};

const PAGES = [
  { name: 'Home', url: '/' },
  { name: 'About', url: '/about' },
  { name: 'Videos', url: '/content/videos' },
  { name: 'Blog', url: '/content/blog' },
];

async function testPageLoad(baseUrl, networkProfile) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];

  for (const page of PAGES) {
    const url = `${baseUrl}${page.url}`;
    console.log(`Testing: ${page.name} (${url})`);

    try {
      const browserPage = await browser.newPage();

      // Set network conditions
      const client = await browserPage.target().createCDPSession();
      await client.send('Network.emulateNetworkConditions', {
        offline: false,
        ...NETWORK_PROFILES[networkProfile],
      });

      // Measure load time
      const startTime = Date.now();
      
      await browserPage.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 60000,
      });

      const loadTime = Date.now() - startTime;

      // Get performance metrics
      const performanceMetrics = await browserPage.evaluate(() => {
        const perfData = window.performance.timing;
        const navigation = window.performance.getEntriesByType('navigation')[0];
        
        return {
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
          loadComplete: perfData.loadEventEnd - perfData.navigationStart,
          firstPaint: navigation?.responseStart - navigation?.requestStart || 0,
          domInteractive: perfData.domInteractive - perfData.navigationStart,
        };
      });

      results.push({
        page: page.name,
        url,
        loadTime,
        metrics: performanceMetrics,
      });

      console.log(`  ✓ Load time: ${(loadTime / 1000).toFixed(2)}s`);
      console.log(`  ✓ DOM Content Loaded: ${(performanceMetrics.domContentLoaded / 1000).toFixed(2)}s`);
      console.log(`  ✓ Load Complete: ${(performanceMetrics.loadComplete / 1000).toFixed(2)}s\n`);

      await browserPage.close();
    } catch (error) {
      console.error(`  ✗ Error testing ${page.name}:`, error.message);
      results.push({
        page: page.name,
        url,
        error: error.message,
      });
    }
  }

  await browser.close();
  return results;
}

async function runTests(baseUrl) {
  console.log('\n🌐 Testing Page Load Times Under Various Network Conditions\n');
  console.log(`Base URL: ${baseUrl}\n`);

  const allResults = {};

  for (const [profileName, profile] of Object.entries(NETWORK_PROFILES)) {
    console.log(`\n📶 Testing with ${profileName.toUpperCase()} connection`);
    console.log(`   Download: ${(profile.downloadThroughput * 8 / 1024).toFixed(0)} Kbps`);
    console.log(`   Upload: ${(profile.uploadThroughput * 8 / 1024).toFixed(0)} Kbps`);
    console.log(`   Latency: ${profile.latency}ms\n`);

    const results = await testPageLoad(baseUrl, profileName);
    allResults[profileName] = results;
  }

  // Generate summary
  console.log('\n📊 Summary Report\n');

  for (const [profileName, results] of Object.entries(allResults)) {
    const validResults = results.filter(r => !r.error);
    if (validResults.length === 0) continue;

    const avgLoadTime = validResults.reduce((sum, r) => sum + r.loadTime, 0) / validResults.length;
    
    console.log(`${profileName.toUpperCase()}:`);
    console.log(`  Average load time: ${(avgLoadTime / 1000).toFixed(2)}s`);
    
    const slowPages = validResults.filter(r => r.loadTime > 5000);
    if (slowPages.length > 0) {
      console.log(`  ⚠️  Slow pages (>5s):`);
      slowPages.forEach(p => {
        console.log(`     - ${p.page}: ${(p.loadTime / 1000).toFixed(2)}s`);
      });
    }
    console.log('');
  }

  console.log('\n💡 Recommendations:\n');
  console.log('1. Optimize images and use WebP format');
  console.log('2. Implement lazy loading for below-fold content');
  console.log('3. Minimize JavaScript bundle size');
  console.log('4. Use CDN for static assets');
  console.log('5. Implement service worker for offline support');
  console.log('6. Consider critical CSS inlining\n');
}

// Main execution
const baseUrl = process.argv[2] || 'http://localhost:3000';

console.log('Starting slow connection tests...');

runTests(baseUrl)
  .then(() => {
    console.log('✅ Tests completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Error running tests:', error);
    process.exit(1);
  });
