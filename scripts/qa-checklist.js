#!/usr/bin/env node

/**
 * QA Checklist Runner
 * Automated quality assurance checks
 * Usage: node scripts/qa-checklist.js [url]
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.argv[2] || 'http://localhost:3000';

console.log('🔍 Running QA Checklist...');
console.log(`Base URL: ${BASE_URL}\n`);

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  checks: []
};

/**
 * Log test result
 */
function logResult(name, status, message = '') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} ${name}`);
  if (message) {
    console.log(`   ${message}`);
  }
  
  results.checks.push({ name, status, message });
  if (status === 'pass') results.passed++;
  else if (status === 'fail') results.failed++;
  else results.warnings++;
}

/**
 * Fetch page content
 */
async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({ 
          statusCode: res.statusCode, 
          headers: res.headers,
          body: data 
        });
      });
    }).on('error', (err) => {
      reject(err);
    }).on('timeout', () => {
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Check SSL certificate
 */
async function checkSSL() {
  console.log('Checking SSL Certificate...\n');
  
  if (!BASE_URL.startsWith('https')) {
    logResult('SSL Certificate', 'warn', 'Testing on HTTP (SSL check skipped for localhost)');
    return;
  }
  
  try {
    await fetchPage(BASE_URL);
    logResult('SSL Certificate', 'pass', 'Valid SSL certificate');
  } catch (error) {
    logResult('SSL Certificate', 'fail', error.message);
  }
}

/**
 * Check error pages
 */
async function checkErrorPages() {
  console.log('\nChecking Error Pages...\n');
  
  // Check 404 page
  try {
    const { statusCode, body } = await fetchPage(`${BASE_URL}/this-page-does-not-exist-404`);
    
    if (statusCode === 404) {
      const has404Content = /not found|404/i.test(body);
      const hasHomeLink = /href=["']\/["']|return home/i.test(body);
      
      logResult('404 Page exists', 'pass');
      logResult('404 Page has helpful content', has404Content ? 'pass' : 'fail');
      logResult('404 Page has home link', hasHomeLink ? 'pass' : 'warn');
    } else {
      logResult('404 Page', 'fail', `Expected 404, got ${statusCode}`);
    }
  } catch (error) {
    logResult('404 Page', 'fail', error.message);
  }
  
  // Check if error.tsx exists
  const errorFile = path.join(process.cwd(), 'app/error.tsx');
  if (fs.existsSync(errorFile)) {
    logResult('Error page component exists', 'pass');
  } else {
    logResult('Error page component exists', 'fail', 'app/error.tsx not found');
  }
  
  // Check if global-error.tsx exists
  const globalErrorFile = path.join(process.cwd(), 'app/global-error.tsx');
  if (fs.existsSync(globalErrorFile)) {
    logResult('Global error page exists', 'pass');
  } else {
    logResult('Global error page exists', 'warn', 'app/global-error.tsx not found');
  }
}

/**
 * Check analytics integration
 */
async function checkAnalytics() {
  console.log('\nChecking Analytics Integration...\n');
  
  try {
    const { body } = await fetchPage(BASE_URL);
    
    // Check for Vercel Analytics
    const hasVercelAnalytics = /@vercel\/analytics|vercel\.com\/analytics/i.test(body);
    logResult('Vercel Analytics', hasVercelAnalytics ? 'pass' : 'warn', 
      hasVercelAnalytics ? 'Detected' : 'Not detected');
    
    // Check for Plausible Analytics
    const hasPlausible = /plausible\.io|plausible-analytics/i.test(body);
    logResult('Plausible Analytics', hasPlausible ? 'pass' : 'warn',
      hasPlausible ? 'Detected' : 'Not detected');
    
    // Check for analytics component
    const analyticsFile = path.join(process.cwd(), 'src/components/analytics/AnalyticsProvider.tsx');
    if (fs.existsSync(analyticsFile)) {
      logResult('Analytics Provider component', 'pass');
    } else {
      logResult('Analytics Provider component', 'warn', 'Component not found');
    }
  } catch (error) {
    logResult('Analytics check', 'fail', error.message);
  }
}

/**
 * Check meta tags
 */
async function checkMetaTags() {
  console.log('\nChecking Meta Tags...\n');
  
  try {
    const { body } = await fetchPage(BASE_URL);
    
    const checks = {
      'Title tag': /<title>.*<\/title>/i,
      'Meta description': /<meta[^>]*name=["']description["']/i,
      'Open Graph title': /<meta[^>]*property=["']og:title["']/i,
      'Open Graph description': /<meta[^>]*property=["']og:description["']/i,
      'Open Graph image': /<meta[^>]*property=["']og:image["']/i,
      'Twitter card': /<meta[^>]*name=["']twitter:card["']/i,
      'Viewport meta': /<meta[^>]*name=["']viewport["']/i,
      'Charset meta': /<meta[^>]*charset/i
    };
    
    for (const [name, pattern] of Object.entries(checks)) {
      const exists = pattern.test(body);
      logResult(name, exists ? 'pass' : 'fail');
    }
  } catch (error) {
    logResult('Meta tags check', 'fail', error.message);
  }
}

/**
 * Check security headers
 */
async function checkSecurityHeaders() {
  console.log('\nChecking Security Headers...\n');
  
  try {
    const { headers } = await fetchPage(BASE_URL);
    
    const securityChecks = {
      'X-Frame-Options': headers['x-frame-options'],
      'X-Content-Type-Options': headers['x-content-type-options'],
      'Referrer-Policy': headers['referrer-policy'],
      'Strict-Transport-Security': headers['strict-transport-security']
    };
    
    for (const [name, value] of Object.entries(securityChecks)) {
      if (value) {
        logResult(name, 'pass', `Value: ${value}`);
      } else {
        logResult(name, 'warn', 'Header not set');
      }
    }
  } catch (error) {
    logResult('Security headers check', 'fail', error.message);
  }
}

/**
 * Check responsive design
 */
async function checkResponsiveDesign() {
  console.log('\nChecking Responsive Design...\n');
  
  try {
    const { body } = await fetchPage(BASE_URL);
    
    // Check for viewport meta tag
    const hasViewport = /<meta[^>]*name=["']viewport["']/i.test(body);
    logResult('Viewport meta tag', hasViewport ? 'pass' : 'fail');
    
    // Check for responsive CSS
    const hasMediaQueries = /@media|breakpoint|responsive/i.test(body);
    logResult('Responsive CSS detected', hasMediaQueries ? 'pass' : 'warn');
    
    // Check Tailwind responsive classes
    const hasTailwindResponsive = /\b(sm:|md:|lg:|xl:|2xl:)/i.test(body);
    logResult('Tailwind responsive classes', hasTailwindResponsive ? 'pass' : 'warn');
  } catch (error) {
    logResult('Responsive design check', 'fail', error.message);
  }
}

/**
 * Check accessibility features
 */
async function checkAccessibility() {
  console.log('\nChecking Accessibility Features...\n');
  
  try {
    const { body } = await fetchPage(BASE_URL);
    
    const a11yChecks = {
      'Skip to content link': /skip.*content|skip.*main/i,
      'ARIA labels': /aria-label/i,
      'Alt attributes': /alt=["']/i,
      'Semantic HTML': /<(header|nav|main|footer|article|section)/i,
      'Form labels': /<label/i
    };
    
    for (const [name, pattern] of Object.entries(a11yChecks)) {
      const exists = pattern.test(body);
      logResult(name, exists ? 'pass' : 'warn');
    }
  } catch (error) {
    logResult('Accessibility check', 'fail', error.message);
  }
}

/**
 * Check performance optimizations
 */
async function checkPerformance() {
  console.log('\nChecking Performance Optimizations...\n');
  
  try {
    const { body } = await fetchPage(BASE_URL);
    
    // Check for Next.js Image optimization
    const hasNextImage = /next\/image|_next\/image/i.test(body);
    logResult('Next.js Image optimization', hasNextImage ? 'pass' : 'warn');
    
    // Check for lazy loading
    const hasLazyLoading = /loading=["']lazy["']/i.test(body);
    logResult('Lazy loading images', hasLazyLoading ? 'pass' : 'warn');
    
    // Check for font optimization
    const hasFontOptimization = /next\/font|font-display/i.test(body);
    logResult('Font optimization', hasFontOptimization ? 'pass' : 'warn');
  } catch (error) {
    logResult('Performance check', 'fail', error.message);
  }
}

/**
 * Check critical pages
 */
async function checkCriticalPages() {
  console.log('\nChecking Critical Pages...\n');
  
  const pages = [
    '/',
    '/about',
    '/start-here',
    '/speaking',
    '/content/videos',
    '/content/blog',
    '/content/resources',
    '/community',
    '/contact'
  ];
  
  for (const page of pages) {
    try {
      const { statusCode } = await fetchPage(`${BASE_URL}${page}`);
      const status = statusCode === 200 ? 'pass' : 'fail';
      logResult(`Page: ${page}`, status, `Status: ${statusCode}`);
    } catch (error) {
      logResult(`Page: ${page}`, 'fail', error.message);
    }
  }
}

/**
 * Main execution
 */
async function main() {
  try {
    await checkSSL();
    await checkErrorPages();
    await checkAnalytics();
    await checkMetaTags();
    await checkSecurityHeaders();
    await checkResponsiveDesign();
    await checkAccessibility();
    await checkPerformance();
    await checkCriticalPages();
    
    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 QA CHECKLIST RESULTS');
    console.log('='.repeat(60) + '\n');
    
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`⚠️  Warnings: ${results.warnings}`);
    console.log(`📝 Total checks: ${results.checks.length}\n`);
    
    const passRate = ((results.passed / results.checks.length) * 100).toFixed(1);
    console.log(`Pass rate: ${passRate}%\n`);
    
    if (results.failed > 0) {
      console.log('⚠️  Some QA checks failed. Review the results above.\n');
      process.exit(1);
    } else if (results.warnings > 0) {
      console.log('⚠️  All critical checks passed, but some warnings were found.\n');
      process.exit(0);
    } else {
      console.log('✨ All QA checks passed!\n');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error during QA checks:', error);
    process.exit(1);
  }
}

main();
