# Betirement Website

[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/betirement-website/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/betirement-website/actions/workflows/ci.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_SITE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_SITE_NAME/deploys)

A comprehensive digital ecosystem designed to establish Michael as a trusted authority on Bitcoin-powered early retirement. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment variables template:

```bash
cp .env.example .env.local
```

4. Fill in your environment variables in `.env.local`

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Code Quality

Run ESLint to check for code issues:

```bash
npm run lint
```

Format code with Prettier:

```bash
npm run format
```

### Performance Testing

Run Lighthouse audit (requires production build):

```bash
# Run full performance audit
npm run perf

# Run Lighthouse on mobile
npm run lighthouse:mobile

# Run Lighthouse on desktop
npm run lighthouse:desktop

# Analyze bundle size
npm run analyze

# Test slow connection performance
npm run test:performance
```

See [Performance Testing Guide](./docs/PERFORMANCE_TESTING.md) for detailed information.

## Available Scripts

### Development
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server on http://localhost:3000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code with Prettier |

### Testing & QA
| Script | Description |
|--------|-------------|
| `npm run qa:all` | Run all QA tests (forms + checklist) |
| `npm run qa:forms` | Test form validation |
| `npm run qa:checklist` | Run QA checklist |
| `npm run qa:links` | Check for broken links |
| `npm run pre-launch` | Run comprehensive pre-launch checklist |
| `npm run pre-launch:prod` | Run pre-launch checklist on production |

### Performance
| Script | Description |
|--------|-------------|
| `npm run perf` | Run full performance audit |
| `npm run lighthouse:mobile` | Run Lighthouse audit (mobile) |
| `npm run lighthouse:desktop` | Run Lighthouse audit (desktop) |
| `npm run analyze` | Analyze bundle size |
| `npm run test:performance` | Test slow connection performance |

### Utilities
| Script | Description |
|--------|-------------|
| `npm run backup` | Create backup of all content |
| `npm run format` | Format code with Prettier |
| `npm run lighthouse` | Run Lighthouse audit on localhost |
| `npm run lighthouse:mobile` | Run Lighthouse audit for mobile |
| `npm run lighthouse:desktop` | Run Lighthouse audit for desktop |
| `npm run analyze` | Build and analyze bundle size |
| `npm run test:performance` | Test performance on slow connection |
| `npm run perf` | Run complete performance test suite |

## Tech Stack

- **Framework**: Next.js 14.2+ (App Router)
- **Language**: TypeScript 5.4+
- **Styling**: Tailwind CSS 3.4+ with custom design system
- **Content**: MDX for blog posts with syntax highlighting
- **Deployment**: Netlify with automatic GitHub deployments
- **Email**: ConvertKit API integration
- **Analytics**: Vercel Analytics + Plausible Analytics

## Project Structure

```
betirement-website/
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── sections/      # Page sections
│   │   ├── forms/         # Form components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utility functions and API clients
│   ├── types/             # TypeScript type definitions
│   ├── config/            # Configuration files
│   │   ├── site.ts        # Site metadata
│   │   └── navigation.ts  # Navigation structure
│   └── data/              # Static data (JSON/MD)
│       ├── blog/          # Blog posts (Markdown)
│       ├── resources/     # Resource metadata
│       └── testimonials/  # Testimonials data
├── app/                   # Next.js App Router pages
├── public/                # Static assets
│   ├── images/           # Image files
│   ├── downloads/        # Downloadable resources
│   └── favicon/          # Favicon files
└── netlify/              # Netlify serverless functions (future)
```

## Configuration

### Site Configuration

Site metadata and settings are configured in `src/config/site.ts`:
- Site name, title, and description
- Social media links
- Author information
- SEO keywords

### Navigation

Navigation structure is defined in `src/config/navigation.ts`:
- Main navigation menu
- Footer navigation sections
- Dropdown menus

### Environment Variables

See [Environment Variables Documentation](./docs/ENVIRONMENT_VARIABLES.md) for detailed information.

Required environment variables (see `.env.example`):

**YouTube API** (Required):
- `YOUTUBE_API_KEY` - YouTube Data API v3 key
- `YOUTUBE_CHANNEL_ID` - Your YouTube channel ID

**ConvertKit** (Required):
- `CONVERTKIT_API_KEY` - ConvertKit API key
- `CONVERTKIT_API_SECRET` - ConvertKit API secret
- `CONVERTKIT_FORM_ID` - Default form ID for subscriptions

**Analytics** (Required):
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` - Your domain for Plausible Analytics
- `NEXT_PUBLIC_SITE_URL` - Production site URL

**Social Media APIs** (Optional):
- `INSTAGRAM_ACCESS_TOKEN` - Instagram Basic Display API token
- `INSTAGRAM_USER_ID` - Instagram user ID
- `TWITTER_BEARER_TOKEN` - Twitter API v2 bearer token

See `.env.example` for a complete list of environment variables.

## Features

### Blog System

The blog system uses Markdown files with frontmatter for content management:

- **Location**: `src/data/blog/`
- **Format**: Markdown (.md) with YAML frontmatter
- **Features**:
  - Category and tag filtering
  - Full-text search
  - Reading time calculation
  - Social sharing buttons
  - SEO optimization
  - Syntax highlighting for code blocks

See `src/data/blog/README.md` for detailed documentation on creating blog posts.

### Video Library

Integration with YouTube Data API to automatically fetch and display videos:

- Category filtering (6 categories)
- Search functionality
- Video detail pages with transcripts
- ISR for fresh content

### Components

Reusable UI components built with Tailwind CSS:

- **UI Components**: Button, Card, Modal, Input
- **Section Components**: Hero, Timeline, Featured Content
- **Content Components**: Video Cards, Blog Cards, Resource Cards
- **Form Components**: Email capture, Contact forms

## Performance Optimization

The Betirement website is optimized for maximum performance with a target Lighthouse score of 90+. Key optimizations include:

- **Font Optimization**: Automatic optimization with `next/font/google`
- **Image Optimization**: WebP/AVIF conversion, responsive sizing, lazy loading
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Aggressive caching for static assets
- **Bundle Optimization**: Tree shaking and minification

### Documentation

- [Performance Optimization Guide](./docs/PERFORMANCE_OPTIMIZATION.md) - Comprehensive performance documentation
- [Image Optimization Guide](./docs/IMAGE_OPTIMIZATION_GUIDE.md) - Detailed image optimization instructions
- [Quick Performance Reference](./docs/QUICK_PERFORMANCE_REFERENCE.md) - Quick reference for developers

### Testing Performance

```bash
# Build and test locally
npm run build
npm run start

# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view
```

## Mobile Responsiveness

The website is fully responsive and optimized for mobile devices with WCAG 2.1 AA compliance:

- **Touch Targets**: Minimum 44×44px for all interactive elements
- **Typography**: Responsive text sizing with 16px base (prevents iOS zoom)
- **Navigation**: Hamburger menu with slide-out drawer on mobile
- **Forms**: Mobile-optimized inputs with appropriate keyboard types
- **Video Players**: Responsive aspect ratios and touch-friendly controls

### Documentation

- [Mobile Responsiveness Guide](./docs/MOBILE_RESPONSIVENESS.md) - Comprehensive mobile documentation
- [Mobile Quick Reference](./docs/MOBILE_QUICK_REFERENCE.md) - Quick reference for developers

### Testing Mobile Responsiveness

Visit `/mobile-test` to see comprehensive mobile responsiveness testing including:
- Device information display
- Touch target size verification
- Typography scaling
- Form layouts
- Grid responsiveness
- Modal behavior
- Video player testing

```bash
# Test on different viewports
npm run dev
# Open http://localhost:3000/mobile-test
# Resize browser or use device emulation
```

## Deployment

The site is configured for automatic deployment to Netlify with CI/CD pipeline via GitHub Actions.

### Quick Deployment

1. **Production**: Push to `main` branch → Automatic deployment to production
2. **Preview**: Open a pull request → Automatic preview deployment with unique URL
3. **Rollback**: Use Netlify dashboard to rollback to any previous deployment

### Initial Setup

To set up deployment for the first time:

1. **Connect to Netlify**:
   - Sign up at [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings (already set in `netlify.toml`)

2. **Configure Environment Variables**:
   - Go to "Site settings" → "Environment variables"
   - Add all variables from `.env.example`
   - See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions

3. **Update Build Badges**:
   - Replace `YOUR_USERNAME` in the GitHub Actions badge URL
   - Replace `YOUR_SITE_ID` and `YOUR_SITE_NAME` in the Netlify badge URL
   - Find your Netlify site ID in "Site settings" → "General"

### CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Linting**: ESLint code quality checks
- **Type Checking**: TypeScript type validation
- **Build Verification**: Ensures production build succeeds
- **Deployment Status**: Tracks Netlify deployment status

All checks must pass before merging pull requests.

### Deployment Documentation

For comprehensive deployment instructions, see:
- [Deployment Guide](./docs/DEPLOYMENT.md) - Complete deployment documentation
- [netlify.toml](./netlify.toml) - Netlify configuration file

### Monitoring

- **Build Status**: Check GitHub Actions tab for CI/CD status
- **Deploy Status**: Check Netlify dashboard for deployment logs
- **Performance**: Monitor with Vercel Analytics and Plausible Analytics

## API Endpoints

The Betirement website provides several API endpoints for dynamic functionality. See [API Documentation](./docs/API_DOCUMENTATION.md) for detailed information.

### Available Endpoints

- **POST /api/subscribe** - Subscribe to email newsletter via ConvertKit
- **GET /api/videos** - Fetch YouTube videos with optional search
- **GET /api/videos/[id]** - Get details for a specific video
- **GET /api/instagram** - Fetch Instagram posts (placeholder)
- **GET /api/social/followers** - Get social media follower counts (placeholder)

All endpoints include:
- Rate limiting protection
- CORS headers
- Input sanitization
- Error handling

## Components

The project includes a comprehensive component library. See [Component Documentation](./docs/COMPONENT_USAGE.md) for detailed usage examples.

### Component Categories

- **UI Components**: Button, Card, Modal, Input, ErrorBoundary
- **Layout Components**: Header, Footer, Navigation
- **Section Components**: Hero, Timeline, Featured Content, Social Proof
- **Form Components**: Email Capture, Contact Forms, Quiz
- **Content Components**: Video Cards, Blog Cards, Resource Cards
- **Analytics Components**: Analytics Provider, Performance Monitor
- **Social Components**: Instagram Feed, Twitter Timeline, Social Share

## Content Management

### Blog Posts

Create blog posts using Markdown files in `src/data/blog/`. See [Blog System Documentation](./src/data/blog/README.md) for detailed instructions.

### Content Guidelines

See [Content Guidelines](./docs/CONTENT_GUIDELINES.md) for:
- Writing style and tone
- SEO best practices
- Image requirements
- Formatting standards

## Documentation

Comprehensive documentation is available in the `docs/` directory:

### Getting Started
- [Environment Variables](./docs/ENVIRONMENT_VARIABLES.md) - Complete environment variable reference
- [Component Usage](./docs/COMPONENT_USAGE.md) - Component examples and patterns
- [API Documentation](./docs/API_DOCUMENTATION.md) - API endpoint reference
- [Content Guidelines](./docs/CONTENT_GUIDELINES.md) - Content creation guide

### Deployment & Operations
- [Deployment Guide](./docs/DEPLOYMENT.md) - Complete deployment documentation
- [Netlify Setup Guide](./docs/NETLIFY_SETUP.md) - Quick Netlify setup instructions
- [Deployment Checklist](./docs/DEPLOYMENT_CHECKLIST.md) - Pre and post-deployment checklist
- [CI/CD Guide](./docs/CI_CD_GUIDE.md) - Continuous integration and deployment

### Performance & Optimization
- [Performance Optimization](./docs/PERFORMANCE_OPTIMIZATION.md) - Performance best practices
- [Image Optimization Guide](./docs/IMAGE_OPTIMIZATION_GUIDE.md) - Image optimization instructions
- [Quick Performance Reference](./docs/QUICK_PERFORMANCE_REFERENCE.md) - Quick reference guide
- [Performance Testing](./docs/PERFORMANCE_TESTING.md) - Testing and monitoring

### Accessibility & Mobile
- [Accessibility Guide](./docs/ACCESSIBILITY.md) - WCAG 2.1 AA compliance guide
- [Accessibility Checklist](./docs/ACCESSIBILITY_CHECKLIST.md) - Accessibility testing checklist
- [Mobile Responsiveness](./docs/MOBILE_RESPONSIVENESS.md) - Mobile optimization guide
- [Mobile Quick Reference](./docs/MOBILE_QUICK_REFERENCE.md) - Mobile development reference

### Security
- [Security Guide](./docs/SECURITY.md) - Security best practices
- [Security Quick Reference](./docs/SECURITY_QUICK_REFERENCE.md) - Security checklist

## Contributing

This is a private project, but if you're working on the codebase, please follow these guidelines:

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Run `npm run lint` before committing
- Format code with Prettier (`npm run format`)

### Git Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Create a pull request
5. Wait for CI/CD checks to pass
6. Request review if needed

### Commit Messages

Use conventional commit format:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Testing

- Test on multiple browsers (Chrome, Safari, Firefox)
- Test on mobile devices (iOS and Android)
- Verify accessibility with screen readers
- Check performance with Lighthouse

## Troubleshooting

### Common Issues

**Build Fails**:
- Check Node.js version (20.x required)
- Delete `node_modules` and `.next`, then `npm install`
- Verify environment variables are set
- Check for TypeScript errors

**Images Not Loading**:
- Verify images are in `public/` directory
- Check image paths start with `/`
- Ensure images are optimized (< 200KB)
- Check Next.js Image component configuration

**API Errors**:
- Verify environment variables are set correctly
- Check API keys are valid
- Review rate limits
- Check network connectivity

**Styling Issues**:
- Clear browser cache
- Check Tailwind configuration
- Verify CSS classes are correct
- Inspect with browser DevTools

### Getting Help

1. Check documentation in `docs/` directory
2. Review error messages carefully
3. Search existing issues
4. Check Next.js documentation
5. Review component examples

## Project Status

### Completed Features

- ✅ Core website structure
- ✅ Blog system with Markdown
- ✅ YouTube video integration
- ✅ Email capture with ConvertKit
- ✅ Resources center
- ✅ Community portal (basic)
- ✅ Analytics integration
- ✅ SEO optimization
- ✅ Mobile responsiveness
- ✅ Accessibility features
- ✅ Security measures
- ✅ Performance optimization
- ✅ CI/CD pipeline
- ✅ Comprehensive documentation

### Future Enhancements

- [ ] CMS integration (Sanity or Contentful)
- [ ] E-commerce for digital products
- [ ] Member authentication
- [ ] Advanced community features
- [ ] Live Instagram feed
- [ ] Real-time social follower counts
- [ ] Interactive calculators enhancement
- [ ] Video course platform
- [ ] Podcast integration

## License

Private - All rights reserved
