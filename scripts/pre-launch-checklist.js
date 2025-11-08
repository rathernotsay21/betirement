#!/usr/bin/env node

/**
 * Pre-Launch Checklist Script
 * Comprehensive final checks before production deployment
 * Usage: node scripts/pre-launch-checklist.js [url]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = process.argv[2] || 'http://localhost:3000';

console.log('🚀 PRE-LAUNCH CHECKLIST');
console.log('='.repeat(60));
console.log(`Base URL: ${BASE_URL}\n`);

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  checks: []
};

/**
 * Log check result
 */
function logCheck(category, name, status, message = '') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
  console.log(`${icon} [${category}] ${name}`);
  if (message) {
    console.log(`   ${message}`);
  }
  
  results.checks.push({ category, name, status, message });
  if (status === 'pass') results.passed++;
  else if (status === 'fail') results.failed++;
  else results.warnings++;
}

/**
 * Check if file exists
 */
function fileExists(filePath) {
  return fs.existsSync(path.join(process.cwd(), filePath));
}

/**
 * Check file content
 */
function checkFileContent(filePath, pattern) {
  try {
    const content = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
    return pattern.test(content);
  } catch {
    return false;
  }
}

/**
 * Run command and return output
 */
function runCommand(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    return null;
  }
}

/**
 * 1. Content Review
 */
function checkContent() {
  console.log('\n📝 CONTENT REVIEW\n');
  
  // Check for placeholder content
  const filesToCheck = [
    'app/page.tsx',
    'app/about/page.tsx',
    'src/config/site.ts'
  ];
  
  filesToCheck.forEach(file => {
    if (fileExists(file)) {
      const hasPlaceholder = checkFileContent(file, /placeholder|lorem ipsum|TODO|FIXME|xxx/i);
      logCheck('Content', `${file} - No placeholders`, !hasPlaceholder ? 'pass' : 'fail',
        hasPlaceholder ? 'Contains placeholder content' : '');
    }
  });
  
  // Check blog posts exist
  const blogDir = path.join(process.cwd(), 'src/data/blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
    logCheck('Content', 'Blog posts exist', blogFiles.length > 0 ? 'pass' : 'warn',
      `Found ${blogFiles.length} blog posts`);
  }
}

/**
 * 2. Image Alt Text Verification
 */
function checkImageAltText() {
  console.log('\n🖼️  IMAGE ALT TEXT VERIFICATION\n');
  
  const imageFiles = [
    'app/page.tsx',
    'app/about/page.tsx',
    'src/components/sections/HeroSection.tsx',
    'src/components/content/BlogCard.tsx',
    'src/components/content/VideoCard.tsx'
  ];
  
  imageFiles.forEach(file => {
    if (fileExists(file)) {
      const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
      
      // Check for Image components - improved regex to handle multiline
      const imageMatches = content.match(/<Image[\s\S]*?\/>/g) || [];
      
      if (imageMatches.length > 0) {
        let imagesWithAlt = 0;
        imageMatches.forEach(img => {
          if (/alt\s*=\s*[{"'][^"'}]+[}"']/.test(img)) {
            imagesWithAlt++;
          }
        });
        
        const allHaveAlt = imageMatches.length === imagesWithAlt;
        logCheck('Images', `${path.basename(file)} - All images have alt text`, allHaveAlt ? 'pass' : 'fail',
          `${imagesWithAlt}/${imageMatches.length} images have alt text`);
      }
    }
  });
}

/**
 * 3. Email Integration Testing
 */
function checkEmailIntegration() {
  console.log('\n📧 EMAIL INTEGRATION\n');
  
  // Check ConvertKit integration
  const convertKitFile = 'src/lib/convertkit.ts';
  if (fileExists(convertKitFile)) {
    logCheck('Email', 'ConvertKit client exists', true, 'pass');
    
    const hasErrorHandling = checkFileContent(convertKitFile, /try.*catch|error/i);
    logCheck('Email', 'ConvertKit has error handling', hasErrorHandling ? 'pass' : 'warn');
  } else {
    logCheck('Email', 'ConvertKit client exists', false, 'fail');
  }
  
  // Check email forms
  const emailForms = [
    'src/components/forms/EmailCaptureForm.tsx',
    'src/components/forms/ContactForm.tsx'
  ];
  
  emailForms.forEach(form => {
    if (fileExists(form)) {
      const hasValidation = checkFileContent(form, /validate|required/i);
      logCheck('Email', `${path.basename(form)} has validation`, hasValidation ? 'pass' : 'warn');
    }
  });
  
  // Check API route
  if (fileExists('app/api/subscribe/route.ts')) {
    logCheck('Email', 'Subscribe API route exists', true, 'pass');
  } else {
    logCheck('Email', 'Subscribe API route exists', false, 'fail');
  }
}

/**
 * 4. YouTube API Integration
 */
function checkYouTubeIntegration() {
  console.log('\n🎥 YOUTUBE API INTEGRATION\n');
  
  const youtubeFile = 'src/lib/youtube.ts';
  if (fileExists(youtubeFile)) {
    logCheck('YouTube', 'YouTube client exists', true, 'pass');
    
    const hasErrorHandling = checkFileContent(youtubeFile, /try.*catch|error/i);
    logCheck('YouTube', 'YouTube client has error handling', hasErrorHandling ? 'pass' : 'warn');
    
    const hasCaching = checkFileContent(youtubeFile, /cache|revalidate/i);
    logCheck('YouTube', 'YouTube client has caching', hasCaching ? 'pass' : 'warn');
  } else {
    logCheck('YouTube', 'YouTube client exists', false, 'fail');
  }
  
  // Check video pages
  if (fileExists('app/content/videos/page.tsx')) {
    logCheck('YouTube', 'Video library page exists', true, 'pass');
  }
  
  if (fileExists('app/api/videos/route.ts')) {
    logCheck('YouTube', 'Videos API route exists', true, 'pass');
  }
}

/**
 * 5. Mobile Responsiveness
 */
function checkMobileResponsiveness() {
  console.log('\n📱 MOBILE RESPONSIVENESS\n');
  
  // Check Tailwind config
  if (fileExists('tailwind.config.ts')) {
    logCheck('Mobile', 'Tailwind config exists', true, 'pass');
  }
  
  // Check for responsive classes in key components
  const componentsToCheck = [
    'src/components/layout/Header.tsx',
    'src/components/layout/Footer.tsx',
    'app/page.tsx'
  ];
  
  componentsToCheck.forEach(file => {
    if (fileExists(file)) {
      const hasResponsive = checkFileContent(file, /\b(sm:|md:|lg:|xl:|2xl:)/);
      logCheck('Mobile', `${path.basename(file)} uses responsive classes`, hasResponsive ? 'pass' : 'warn');
    }
  });
  
  // Check mobile CSS
  if (fileExists('app/mobile-enhancements.css')) {
    logCheck('Mobile', 'Mobile enhancements CSS exists', true, 'pass');
  }
}

/**
 * 6. Environment Variables
 */
function checkEnvironmentVariables() {
  console.log('\n🔐 ENVIRONMENT VARIABLES\n');
  
  const requiredVars = [
    'YOUTUBE_API_KEY',
    'YOUTUBE_CHANNEL_ID',
    'CONVERTKIT_API_KEY',
    'NEXT_PUBLIC_SITE_URL'
  ];
  
  requiredVars.forEach(varName => {
    const exists = process.env[varName] !== undefined;
    logCheck('Environment', varName, exists ? 'pass' : 'warn',
      exists ? 'Set' : 'Not set (check .env.local or deployment environment)');
  });
  
  // Check .env.example exists
  if (fileExists('.env.example')) {
    logCheck('Environment', '.env.example exists', true, 'pass');
  } else {
    logCheck('Environment', '.env.example exists', false, 'warn');
  }
}

/**
 * 7. Build and Deployment
 */
function checkBuildAndDeployment() {
  console.log('\n🏗️  BUILD AND DEPLOYMENT\n');
  
  // Check package.json scripts
  if (fileExists('package.json')) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
    
    const requiredScripts = ['build', 'start', 'lint'];
    requiredScripts.forEach(script => {
      const exists = packageJson.scripts && packageJson.scripts[script];
      logCheck('Build', `Script "${script}" exists`, exists ? 'pass' : 'fail');
    });
  }
  
  // Check Netlify config
  if (fileExists('netlify.toml')) {
    logCheck('Deployment', 'netlify.toml exists', true, 'pass');
    
    const hasCommand = checkFileContent('netlify.toml', /command\s*=\s*["'].*build["']/);
    logCheck('Deployment', 'Build command configured', hasCommand ? 'pass' : 'warn');
  } else {
    logCheck('Deployment', 'netlify.toml exists', false, 'warn');
  }
  
  // Check next.config
  if (fileExists('next.config.mjs') || fileExists('next.config.js')) {
    logCheck('Build', 'Next.js config exists', true, 'pass');
  }
}

/**
 * 8. Security and Legal
 */
function checkSecurityAndLegal() {
  console.log('\n🔒 SECURITY AND LEGAL\n');
  
  // Check legal pages
  const legalPages = [
    'app/legal/privacy/page.tsx',
    'app/legal/terms/page.tsx',
    'app/legal/disclaimer/page.tsx',
    'app/legal/affiliate-disclosure/page.tsx'
  ];
  
  legalPages.forEach(page => {
    const exists = fileExists(page);
    logCheck('Legal', `${path.basename(path.dirname(page))} page exists`, exists ? 'pass' : 'fail');
  });
  
  // Check cookie consent
  if (fileExists('src/components/legal/CookieConsent.tsx')) {
    logCheck('Legal', 'Cookie consent component exists', true, 'pass');
  }
  
  // Check security utilities
  if (fileExists('src/lib/sanitization.ts')) {
    logCheck('Security', 'Input sanitization utility exists', true, 'pass');
  }
  
  if (fileExists('src/lib/rate-limit.ts')) {
    logCheck('Security', 'Rate limiting utility exists', true, 'pass');
  }
}

/**
 * 9. SEO and Analytics
 */
function checkSEOAndAnalytics() {
  console.log('\n🔍 SEO AND ANALYTICS\n');
  
  // Check sitemap
  if (fileExists('app/sitemap.ts')) {
    logCheck('SEO', 'Sitemap generator exists', true, 'pass');
  } else {
    logCheck('SEO', 'Sitemap generator exists', false, 'fail');
  }
  
  // Check robots.txt
  if (fileExists('app/robots.ts')) {
    logCheck('SEO', 'Robots.txt generator exists', true, 'pass');
  } else {
    logCheck('SEO', 'Robots.txt generator exists', false, 'warn');
  }
  
  // Check analytics
  if (fileExists('src/components/analytics/AnalyticsProvider.tsx')) {
    logCheck('Analytics', 'Analytics provider exists', true, 'pass');
  }
  
  if (fileExists('src/lib/analytics.ts')) {
    logCheck('Analytics', 'Analytics utility exists', true, 'pass');
  }
}

/**
 * 10. Error Handling
 */
function checkErrorHandling() {
  console.log('\n⚠️  ERROR HANDLING\n');
  
  // Check error pages
  if (fileExists('app/not-found.tsx')) {
    logCheck('Errors', '404 page exists', true, 'pass');
  } else {
    logCheck('Errors', '404 page exists', false, 'fail');
  }
  
  if (fileExists('app/error.tsx')) {
    logCheck('Errors', 'Error page exists', true, 'pass');
  } else {
    logCheck('Errors', 'Error page exists', false, 'fail');
  }
  
  if (fileExists('app/global-error.tsx')) {
    logCheck('Errors', 'Global error page exists', true, 'pass');
  }
  
  // Check error boundary
  if (fileExists('src/components/ui/ErrorBoundary.tsx')) {
    logCheck('Errors', 'Error boundary component exists', true, 'pass');
  }
}

/**
 * 11. Documentation
 */
function checkDocumentation() {
  console.log('\n📚 DOCUMENTATION\n');
  
  const docs = [
    'README.md',
    'docs/DEPLOYMENT.md',
    'docs/ENVIRONMENT_VARIABLES.md',
    'docs/API_DOCUMENTATION.md'
  ];
  
  docs.forEach(doc => {
    const exists = fileExists(doc);
    logCheck('Documentation', `${path.basename(doc)} exists`, exists ? 'pass' : 'warn');
  });
}

/**
 * Print final summary
 */
function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 PRE-LAUNCH CHECKLIST SUMMARY');
  console.log('='.repeat(60) + '\n');
  
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`⚠️  Warnings: ${results.warnings}`);
  console.log(`📝 Total checks: ${results.checks.length}\n`);
  
  const passRate = ((results.passed / results.checks.length) * 100).toFixed(1);
  console.log(`Pass rate: ${passRate}%\n`);
  
  // Group failures by category
  const failures = results.checks.filter(c => c.status === 'fail');
  if (failures.length > 0) {
    console.log('🚨 CRITICAL ISSUES TO FIX:\n');
    failures.forEach(({ category, name, message }) => {
      console.log(`  [${category}] ${name}`);
      if (message) console.log(`    ${message}`);
    });
    console.log('');
  }
  
  // Group warnings by category
  const warnings = results.checks.filter(c => c.status === 'warn');
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS TO REVIEW:\n');
    warnings.forEach(({ category, name, message }) => {
      console.log(`  [${category}] ${name}`);
      if (message) console.log(`    ${message}`);
    });
    console.log('');
  }
  
  // Final verdict
  if (results.failed === 0 && results.warnings === 0) {
    console.log('🎉 ALL CHECKS PASSED! Ready for launch!\n');
    return 0;
  } else if (results.failed === 0) {
    console.log('✅ All critical checks passed. Review warnings before launch.\n');
    return 0;
  } else {
    console.log('❌ Critical issues found. Fix failures before launch.\n');
    return 1;
  }
}

/**
 * Main execution
 */
function main() {
  try {
    checkContent();
    checkImageAltText();
    checkEmailIntegration();
    checkYouTubeIntegration();
    checkMobileResponsiveness();
    checkEnvironmentVariables();
    checkBuildAndDeployment();
    checkSecurityAndLegal();
    checkSEOAndAnalytics();
    checkErrorHandling();
    checkDocumentation();
    
    const exitCode = printSummary();
    process.exit(exitCode);
  } catch (error) {
    console.error('❌ Error during pre-launch checks:', error);
    process.exit(1);
  }
}

main();
