# Performance Testing Scripts

This directory contains scripts for testing and analyzing the performance of the Betirement website.

## Scripts Overview

### lighthouse-audit.js

Runs comprehensive Lighthouse audits on all major pages of the website.

**Usage:**
```bash
# Audit local development server (mobile)
node scripts/lighthouse-audit.js http://localhost:3000 mobile

# Audit local development server (desktop)
node scripts/lighthouse-audit.js http://localhost:3000 desktop

# Audit production site
node scripts/lighthouse-audit.js https://betirement.com mobile
```

**Requirements:**
```bash
npm install --save-dev lighthouse chrome-launcher
```

**Output:**
- Individual HTML reports for each page
- Summary JSON with all scores
- Summary markdown with recommendations
- Reports saved to `lighthouse-reports/[timestamp]/`

**Metrics Measured:**
- Performance score
- Accessibility score
- Best Practices score
- SEO score
- Core Web Vitals (LCP, FID, CLS)
- Additional metrics (FCP, TTI, TBT, SI)

### analyze-bundle.js

Analyzes the Next.js bundle size and identifies optimization opportunities.

**Usage:**
```bash
# Build first, then analyze
npm run build
node scripts/analyze-bundle.js
```

**Output:**
- Total bundle size
- Number of chunks
- Large chunks (>100KB)
- Optimization recommendations

**What It Checks:**
- Bundle size and chunk distribution
- Large dependencies
- Dynamic import usage
- Common optimization opportunities

### test-slow-connection.js

Tests page load times under various network conditions to ensure good performance for all users.

**Usage:**
```bash
# Test local development server
node scripts/test-slow-connection.js http://localhost:3000

# Test production site
node scripts/test-slow-connection.js https://betirement.com
```

**Requirements:**
```bash
npm install --save-dev puppeteer
```

**Network Profiles:**
- Slow 3G: 500 Kbps, 400ms latency
- Fast 3G: 1.6 Mbps, 150ms latency
- 4G: 4 Mbps, 50ms latency

**Output:**
- Load time for each page under each network condition
- DOM Content Loaded time
- Load Complete time
- Summary with recommendations

## NPM Scripts

For convenience, these scripts are available as npm commands:

```bash
# Run full performance audit (build + lighthouse + analyze)
npm run perf

# Run Lighthouse audit (mobile)
npm run lighthouse:mobile

# Run Lighthouse audit (desktop)
npm run lighthouse:desktop

# Analyze bundle size
npm run analyze

# Test slow connections
npm run test:performance
```

## Continuous Integration

The Lighthouse CI workflow (`.github/workflows/lighthouse-ci.yml`) automatically runs performance audits on:
- Pull requests to main branch
- Pushes to main branch

Results are:
- Posted as PR comments
- Uploaded as workflow artifacts
- Used to enforce performance budgets

## Performance Budgets

Performance budgets are defined in `lighthouserc.json`:

**Target Scores:**
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

**Core Web Vitals:**
- LCP: < 2.5s
- CLS: < 0.1
- TBT: < 300ms

**Bundle Size:**
- Total page weight: < 1MB
- First Load JS: < 200KB

## Troubleshooting

### Lighthouse fails to run

**Issue:** Chrome fails to launch or Lighthouse times out

**Solutions:**
- Ensure Chrome is installed
- Try running with `--no-sandbox` flag
- Check if port 3000 is available
- Increase timeout in script

### Bundle analysis shows no results

**Issue:** Build directory not found

**Solutions:**
- Run `npm run build` first
- Check that `.next` directory exists
- Verify build completed successfully

### Slow connection tests fail

**Issue:** Puppeteer fails to launch or pages timeout

**Solutions:**
- Install Puppeteer: `npm install --save-dev puppeteer`
- Increase timeout in script (currently 60s)
- Check if server is running
- Try with headless: false for debugging

## Best Practices

1. **Run audits regularly**
   - Before each major release
   - After significant changes
   - Weekly on production

2. **Monitor trends**
   - Track scores over time
   - Identify regressions early
   - Celebrate improvements

3. **Set up alerts**
   - Configure CI to fail on score drops
   - Set up monitoring alerts
   - Review failed builds promptly

4. **Document findings**
   - Save audit reports
   - Document optimization decisions
   - Share results with team

5. **Prioritize fixes**
   - Focus on user-facing issues
   - Fix high-impact problems first
   - Balance performance with features

## Resources

- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Performance Testing Guide](../docs/PERFORMANCE_TESTING.md)


---

## Quality Assurance Testing Scripts

### qa-checklist.js

Runs comprehensive automated QA checks on the website.

**Usage:**
```bash
# Test local development server
npm run qa:checklist
node scripts/qa-checklist.js http://localhost:3000

# Test production site
node scripts/qa-checklist.js https://betirement.com
```

**Features:**
- SSL certificate verification
- Error page testing (404, 500)
- Analytics integration checks
- Meta tags validation
- Security headers verification
- Responsive design checks
- Accessibility features validation
- Performance optimization checks
- Critical pages availability

**Output:**
- ✅ Passed checks
- ❌ Failed checks
- ⚠️ Warnings
- Detailed pass rate percentage

### test-forms.js

Tests form validation and functionality across the website.

**Usage:**
```bash
npm run qa:forms
```

**Features:**
- Email validation testing
- Form accessibility checks
- Error handling verification
- Netlify Forms configuration validation
- API route validation
- Validation logic testing

**Checks:**
- Email validation utilities
- Form component validation
- Accessibility attributes (ARIA labels, required fields)
- Error handling (try/catch blocks)
- Netlify form attributes
- Honeypot spam protection

### check-links.js

Validates all internal and external links on the website.

**Usage:**
```bash
# Test local development server
npm run qa:links
node scripts/check-links.js http://localhost:3000

# Test production site
node scripts/check-links.js https://betirement.com
```

**Features:**
- Crawls all internal pages
- Validates internal links
- Checks external links
- Reports broken links (404s)
- Identifies timeout errors
- Rate-limited external link checking

**Output:**
- Pages checked count
- External links validated
- Broken links report with status codes
- Exit code 1 if broken links found

### qa:all

Runs all automated QA tests in sequence.

**Usage:**
```bash
npm run qa:all
```

**Includes:**
- Form validation tests
- QA checklist
- (Link checking can be run separately due to time)

## Complete Testing Workflow

### Pre-Launch QA Testing

Run this complete test suite before launching:

```bash
# 1. Run automated QA tests
npm run qa:all

# 2. Check all links
npm run qa:links

# 3. Run performance tests
npm run perf

# 4. Manual testing (see docs/QA_TESTING_GUIDE.md)
```

### Continuous Testing

For ongoing quality assurance:

```bash
# Quick QA check
npm run qa:checklist

# Form validation check
npm run qa:forms

# Performance check
npm run lighthouse:mobile
```

### Production Testing

Test the live production site:

```bash
# QA checklist on production
node scripts/qa-checklist.js https://betirement.com

# Link checking on production
node scripts/check-links.js https://betirement.com

# Performance audit on production
node scripts/lighthouse-audit.js https://betirement.com mobile
```

## QA Documentation

For detailed testing procedures, see:
- **QA Testing Guide:** `docs/QA_TESTING_GUIDE.md`
- **Browser Compatibility:** `docs/BROWSER_COMPATIBILITY_MATRIX.md`
- **Performance Testing:** `docs/PERFORMANCE_TESTING.md`

## Exit Codes

Scripts use standard exit codes:
- `0` - All tests passed
- `1` - Tests failed or errors encountered

This allows integration with CI/CD pipelines.

## QA Testing Notes

- Run QA tests on a running development server
- Link checking can take several minutes depending on site size
- External link checking is rate-limited to avoid overwhelming servers
- Form tests check for validation logic in component files
- QA checklist tests both functionality and best practices
