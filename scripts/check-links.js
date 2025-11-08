#!/usr/bin/env node

/**
 * Link Checker Script
 * Validates all internal and external links on the website
 * Usage: node scripts/check-links.js [url]
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const visited = new Set();
const brokenLinks = [];
const externalLinks = new Set();

console.log('🔍 Starting link validation...');
console.log(`Base URL: ${BASE_URL}\n`);

/**
 * Fetch HTML content from URL
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
        resolve({ statusCode: res.statusCode, body: data });
      });
    }).on('error', (err) => {
      reject(err);
    }).on('timeout', () => {
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Extract links from HTML
 */
function extractLinks(html, baseUrl) {
  const links = [];
  
  // Match href attributes
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  
  while ((match = hrefRegex.exec(html)) !== null) {
    const link = match[1];
    
    // Skip anchors, mailto, tel, javascript
    if (link.startsWith('#') || 
        link.startsWith('mailto:') || 
        link.startsWith('tel:') ||
        link.startsWith('javascript:')) {
      continue;
    }
    
    // Convert relative URLs to absolute
    let absoluteUrl;
    if (link.startsWith('http')) {
      absoluteUrl = link;
    } else if (link.startsWith('/')) {
      absoluteUrl = baseUrl + link;
    } else {
      continue; // Skip relative paths without /
    }
    
    links.push(absoluteUrl);
  }
  
  return links;
}

/**
 * Check if link is valid
 */
async function checkLink(url) {
  try {
    const { statusCode } = await fetchPage(url);
    return {
      url,
      valid: statusCode >= 200 && statusCode < 400,
      statusCode
    };
  } catch (error) {
    return {
      url,
      valid: false,
      error: error.message
    };
  }
}

/**
 * Crawl page and check links
 */
async function crawlPage(url) {
  if (visited.has(url)) {
    return;
  }
  
  visited.add(url);
  console.log(`Checking: ${url}`);
  
  try {
    const { statusCode, body } = await fetchPage(url);
    
    if (statusCode !== 200) {
      brokenLinks.push({ url, statusCode, type: 'page' });
      return;
    }
    
    const links = extractLinks(body, BASE_URL);
    
    for (const link of links) {
      if (link.startsWith(BASE_URL)) {
        // Internal link - crawl it
        await crawlPage(link);
      } else {
        // External link - just check it
        externalLinks.add(link);
      }
    }
  } catch (error) {
    brokenLinks.push({ url, error: error.message, type: 'page' });
  }
}

/**
 * Check external links
 */
async function checkExternalLinks() {
  console.log('\n🌐 Checking external links...\n');
  
  const externalResults = [];
  
  for (const link of externalLinks) {
    const result = await checkLink(link);
    if (!result.valid) {
      brokenLinks.push({ ...result, type: 'external' });
    }
    externalResults.push(result);
    
    // Rate limit external requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return externalResults;
}

/**
 * Main execution
 */
async function main() {
  try {
    // Start crawling from home page
    await crawlPage(BASE_URL);
    
    // Check external links
    await checkExternalLinks();
    
    // Report results
    console.log('\n' + '='.repeat(60));
    console.log('📊 LINK VALIDATION RESULTS');
    console.log('='.repeat(60) + '\n');
    
    console.log(`✅ Pages checked: ${visited.size}`);
    console.log(`🔗 External links checked: ${externalLinks.size}`);
    console.log(`❌ Broken links found: ${brokenLinks.length}\n`);
    
    if (brokenLinks.length > 0) {
      console.log('🚨 BROKEN LINKS:\n');
      brokenLinks.forEach(({ url, statusCode, error, type }) => {
        console.log(`  [${type.toUpperCase()}] ${url}`);
        if (statusCode) {
          console.log(`    Status: ${statusCode}`);
        }
        if (error) {
          console.log(`    Error: ${error}`);
        }
        console.log('');
      });
      
      process.exit(1);
    } else {
      console.log('✨ All links are valid!\n');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error during link checking:', error);
    process.exit(1);
  }
}

main();
