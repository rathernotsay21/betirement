# Component Usage Guide

This document provides detailed usage examples and patterns for all components in the Betirement website.

## Overview

The component library is organized into categories:
- **UI Components**: Basic building blocks
- **Layout Components**: Page structure
- **Section Components**: Page sections
- **Form Components**: Forms and inputs
- **Content Components**: Content display
- **Analytics Components**: Tracking and monitoring
- **Social Components**: Social media integration

## UI Components

### Button

Versatile button component with multiple variants and sizes.

**Location**: `src/components/ui/Button.tsx`

**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}
```

**Usage**:
```tsx
import { Button } from '@/components/ui/Button';

// Primary button
<Button variant="primary" size="md">
  Subscribe Now
</Button>

// Link button
<Button variant="outline" href="/about">
  Learn More
</Button>

// Loading state
<Button variant="primary" loading={isSubmitting}>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</Button>

// Disabled button
<Button variant="secondary" disabled>
  Coming Soon
</Button>
```

**Variants**:
- `primary`: Bitcoin orange background, white text
- `secondary`: Black background, white text
- `outline`: Transparent with border
- `ghost`: Transparent, no border

---

### Card

Container component for content grouping.

**Location**: `src/components/ui/Card.tsx`

**Props**:
```typescript
interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
  badge?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
```

**Usage**:
```tsx
import { Card } from '@/components/ui/Card';

// Basic card
<Card
  title="Bitcoin Fundamentals"
  description="Learn the basics of Bitcoin investing"
  image="/images/bitcoin-basics.jpg"
/>

// Interactive card
<Card
  title="Retirement Calculator"
  href="/resources/calculator"
  badge="Popular"
  footer={<Button variant="outline">Try Now</Button>}
>
  <p>Calculate your retirement timeline</p>
</Card>

// Custom content
<Card>
  <h3>Custom Content</h3>
  <p>Any content you want</p>
</Card>
```

---

### Modal

Accessible modal dialog component.

**Location**: `src/components/ui/Modal.tsx`

**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}
```

**Usage**:
```tsx
import { Modal } from '@/components/ui/Modal';
import { useState } from 'react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Subscribe to Newsletter"
        size="md"
      >
        <EmailCaptureForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
```

**Features**:
- Keyboard navigation (ESC to close)
- Focus trap
- Backdrop click to close
- Accessible (ARIA labels)
- Responsive sizing

---

### Input

Form input component with validation states.

**Location**: `src/components/ui/Input.tsx`

**Props**:
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}
```

**Usage**:
```tsx
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  return (
    <Input
      type="email"
      label="Email Address"
      placeholder="you@example.com"
      value={email}
      onChange={handleChange}
      error={error}
      required
    />
  );
}
```

---

### ErrorBoundary

Catches and handles React errors gracefully.

**Location**: `src/components/ui/ErrorBoundary.tsx`

**Props**:
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}
```

**Usage**:
```tsx
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// Wrap components that might error
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <VideoPlayer videoId={videoId} />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary
  fallback={
    <Card>
      <h3>Unable to load content</h3>
      <Button onClick={() => window.location.reload()}>
        Reload Page
      </Button>
    </Card>
  }
>
  <ComplexComponent />
</ErrorBoundary>
```

## Layout Components

### Header

Main site header with navigation.

**Location**: `src/components/layout/Header.tsx`

**Usage**:
```tsx
import { Header } from '@/components/layout/Header';

// In layout.tsx
<Header />
```

**Features**:
- Sticky positioning
- Mobile hamburger menu
- Desktop dropdown menus
- CTA button
- Logo with link to home

---

### Footer

Site footer with links and newsletter signup.

**Location**: `src/components/layout/Footer.tsx`

**Usage**:
```tsx
import { Footer } from '@/components/layout/Footer';

// In layout.tsx
<Footer />
```

**Features**:
- Multi-column layout
- Social media links
- Newsletter signup form
- Legal links
- Copyright notice

---

### Navigation

Navigation menu component.

**Location**: `src/components/layout/Navigation.tsx`

**Usage**:
```tsx
import { Navigation } from '@/components/layout/Navigation';

<Navigation items={navigationItems} />
```

## Section Components

### HeroSection

Homepage hero section.

**Location**: `src/components/sections/HeroSection.tsx`

**Props**:
```typescript
interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  trustIndicators?: string[];
}
```

**Usage**:
```tsx
import { HeroSection } from '@/components/sections/HeroSection';

<HeroSection
  headline="Your Bridge to Bitcoin-Powered Freedom"
  subheadline="Real experience. Proven strategies. Your path to early retirement."
  ctaPrimary={{
    text: "Start Here",
    href: "/start-here"
  }}
  ctaSecondary={{
    text: "Watch My Story",
    href: "/about"
  }}
  trustIndicators={[
    "Retired at 51",
    "28 Years Corporate Experience",
    "Bitcoin Since 2017"
  ]}
/>
```

---

### InteractiveTimeline

Timeline component with scroll animations.

**Location**: `src/components/sections/InteractiveTimeline.tsx`

**Props**:
```typescript
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface InteractiveTimelineProps {
  events: TimelineEvent[];
}
```

**Usage**:
```tsx
import { InteractiveTimeline } from '@/components/sections/InteractiveTimeline';

const events = [
  {
    year: "1995",
    title: "Started Corporate Career",
    description: "Began 28-year journey in corporate America",
    image: "/images/timeline/1995.jpg"
  },
  {
    year: "2017",
    title: "Discovered Bitcoin",
    description: "First Bitcoin purchase and deep dive into crypto",
    image: "/images/timeline/2017.jpg"
  },
  // ... more events
];

<InteractiveTimeline events={events} />
```

---

### FeaturedContent

Showcase featured content on homepage.

**Location**: `src/components/sections/FeaturedContent.tsx`

**Usage**:
```tsx
import { FeaturedContent } from '@/components/sections/FeaturedContent';

<FeaturedContent
  video={featuredVideo}
  blogPost={latestPost}
  product={spotlightProduct}
/>
```

---

### SocialProofBar

Display social proof metrics.

**Location**: `src/components/sections/SocialProofBar.tsx`

**Usage**:
```tsx
import { SocialProofBar } from '@/components/sections/SocialProofBar';

<SocialProofBar
  youtubeSubscribers={125000}
  totalViews={5000000}
  communityMembers={2500}
/>
```

## Form Components

### EmailCaptureForm

Email subscription form with ConvertKit integration.

**Location**: `src/components/forms/EmailCaptureForm.tsx`

**Props**:
```typescript
interface EmailCaptureFormProps {
  variant?: 'inline' | 'modal' | 'slide-in';
  leadMagnet?: string;
  tags?: string[];
  source?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}
```

**Usage**:
```tsx
import { EmailCaptureForm } from '@/components/forms/EmailCaptureForm';

// Inline form
<EmailCaptureForm
  variant="inline"
  tags={['website-home']}
  source="homepage-hero"
  onSuccess={() => console.log('Subscribed!')}
/>

// Modal form with lead magnet
<EmailCaptureForm
  variant="modal"
  leadMagnet="Bitcoin Retirement Guide"
  tags={['lead-magnet', 'guide']}
  source="resource-download"
/>

// Slide-in form
<EmailCaptureForm
  variant="slide-in"
  tags={['exit-intent']}
  source="exit-popup"
/>
```

---

### ContactForm

General contact form with Netlify Forms.

**Location**: `src/components/forms/ContactForm.tsx`

**Props**:
```typescript
interface ContactFormProps {
  type?: 'general' | 'speaking' | 'media';
  onSubmit?: (data: FormData) => void;
}
```

**Usage**:
```tsx
import { ContactForm } from '@/components/forms/ContactForm';

// General contact
<ContactForm type="general" />

// Speaking request
<ContactForm
  type="speaking"
  onSubmit={(data) => {
    console.log('Form submitted:', data);
  }}
/>
```

---

### ValidatedForm

Form wrapper with validation.

**Location**: `src/components/forms/ValidatedForm.tsx`

**Usage**:
```tsx
import { ValidatedForm } from '@/components/forms/ValidatedForm';
import { Input } from '@/components/ui/Input';

<ValidatedForm
  onSubmit={handleSubmit}
  validationSchema={schema}
>
  <Input name="email" type="email" required />
  <Input name="name" type="text" required />
  <Button type="submit">Submit</Button>
</ValidatedForm>
```

## Content Components

### VideoCard

Display video information in a card.

**Location**: `src/components/content/VideoCard.tsx`

**Props**:
```typescript
interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  publishedAt: string;
  viewCount?: number;
}
```

**Usage**:
```tsx
import { VideoCard } from '@/components/content/VideoCard';

<VideoCard
  id="abc123"
  title="Bitcoin Retirement Strategy"
  thumbnail="https://i.ytimg.com/vi/abc123/hqdefault.jpg"
  duration="10:30"
  category="Bitcoin Fundamentals"
  publishedAt="2024-01-01"
  viewCount={125000}
/>
```

---

### BlogCard

Display blog post in a card.

**Location**: `src/components/content/BlogCard.tsx`

**Props**:
```typescript
interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  featured?: boolean;
}
```

**Usage**:
```tsx
import { BlogCard } from '@/components/content/BlogCard';

<BlogCard
  slug="bitcoin-retirement-basics"
  title="Bitcoin Retirement Basics"
  excerpt="Learn the fundamentals of retiring with Bitcoin"
  coverImage="/images/blog/bitcoin-basics.jpg"
  publishedAt="2024-01-01"
  readingTime={5}
  tags={['bitcoin', 'retirement', 'basics']}
  featured
/>
```

---

### ResourceCard

Display downloadable resource.

**Location**: `src/components/content/ResourceCard.tsx`

**Props**:
```typescript
interface ResourceCardProps {
  title: string;
  description: string;
  type: 'pdf' | 'calculator' | 'template';
  downloadUrl?: string;
  requiresEmail: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
```

**Usage**:
```tsx
import { ResourceCard } from '@/components/content/ResourceCard';

<ResourceCard
  title="Bitcoin Allocation Calculator"
  description="Calculate optimal Bitcoin allocation for your portfolio"
  type="calculator"
  downloadUrl="/resources/calculator"
  requiresEmail={false}
  difficulty="intermediate"
/>
```

---

### VideoGrid

Grid layout for videos.

**Location**: `src/components/content/VideoGrid.tsx`

**Usage**:
```tsx
import { VideoGrid } from '@/components/content/VideoGrid';

<VideoGrid videos={videos} columns={3} />
```

---

### Pagination

Pagination component for lists.

**Location**: `src/components/content/Pagination.tsx`

**Props**:
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

**Usage**:
```tsx
import { Pagination } from '@/components/content/Pagination';

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
```

## Analytics Components

### AnalyticsProvider

Wrap app with analytics tracking.

**Location**: `src/components/analytics/AnalyticsProvider.tsx`

**Usage**:
```tsx
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';

// In layout.tsx
<AnalyticsProvider>
  {children}
</AnalyticsProvider>
```

---

### PerformanceMonitor

Monitor and report performance metrics.

**Location**: `src/components/analytics/PerformanceMonitor.tsx`

**Usage**:
```tsx
import { PerformanceMonitor } from '@/components/analytics/PerformanceMonitor';

// In layout.tsx
<PerformanceMonitor />
```

## Social Components

### InstagramFeed

Display Instagram posts.

**Location**: `src/components/social/InstagramFeed.tsx`

**Props**:
```typescript
interface InstagramFeedProps {
  maxPosts?: number;
}
```

**Usage**:
```tsx
import { InstagramFeed } from '@/components/social/InstagramFeed';

<InstagramFeed maxPosts={6} />
```

---

### SocialShare

Social sharing buttons.

**Location**: `src/components/social/SocialShare.tsx`

**Props**:
```typescript
interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  platforms?: ('twitter' | 'linkedin' | 'facebook' | 'email')[];
}
```

**Usage**:
```tsx
import { SocialShare } from '@/components/social/SocialShare';

<SocialShare
  url="https://betirement.com/blog/post-slug"
  title="Bitcoin Retirement Strategy"
  description="Learn how to retire early with Bitcoin"
  platforms={['twitter', 'linkedin', 'facebook']}
/>
```

## Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Composition**: Build complex UIs from simple components
3. **Props Interface**: Always define TypeScript interfaces
4. **Default Props**: Provide sensible defaults
5. **Error Handling**: Handle errors gracefully

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA Labels**: Add labels for screen readers
3. **Keyboard Navigation**: Support keyboard users
4. **Focus Management**: Manage focus appropriately
5. **Color Contrast**: Ensure sufficient contrast

### Performance

1. **Lazy Loading**: Use dynamic imports for heavy components
2. **Memoization**: Use React.memo for expensive renders
3. **Code Splitting**: Split code by route
4. **Image Optimization**: Use Next.js Image component
5. **Bundle Size**: Keep components small

### Testing

1. **Unit Tests**: Test component logic
2. **Integration Tests**: Test component interactions
3. **Accessibility Tests**: Test with screen readers
4. **Visual Tests**: Test responsive design
5. **E2E Tests**: Test user flows

## Common Patterns

### Form Handling

```tsx
function MyForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate
      const validationErrors = validate(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      // Submit
      await submitForm(formData);
      
      // Success
      toast.success('Form submitted!');
    } catch (error) {
      toast.error('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
        error={errors.email}
      />
      <Button type="submit" loading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

### Data Fetching

```tsx
function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data.videos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <VideoGrid videos={videos} />
  );
}
```

### Modal Management

```tsx
function MyPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <Button onClick={() => setActiveModal('subscribe')}>
        Subscribe
      </Button>

      <Modal
        isOpen={activeModal === 'subscribe'}
        onClose={() => setActiveModal(null)}
        title="Subscribe to Newsletter"
      >
        <EmailCaptureForm
          onSuccess={() => setActiveModal(null)}
        />
      </Modal>
    </>
  );
}
```

## Troubleshooting

### Component Not Rendering

1. Check import path
2. Verify props are correct
3. Check for TypeScript errors
4. Inspect browser console

### Styling Issues

1. Check Tailwind classes
2. Verify CSS specificity
3. Check responsive breakpoints
4. Inspect with browser DevTools

### Performance Issues

1. Use React DevTools Profiler
2. Check for unnecessary re-renders
3. Implement memoization
4. Optimize images

## References

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
