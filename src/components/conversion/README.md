# Conversion Optimization Components

This directory contains components designed to improve conversion rates and user engagement on the Betirement website.

## Components

### SlideInEmailCapture

A slide-in email capture form that appears after a specified delay (default: 30 seconds).

**Features:**
- Configurable delay before showing
- Respects user preferences (won't show if already subscribed or dismissed)
- Smooth animations
- Mobile responsive
- Accessible with ARIA labels

**Usage:**
```tsx
import { SlideInEmailCapture } from '@/src/components/conversion';

<SlideInEmailCapture
  delay={30000} // 30 seconds
  leadMagnet="Bitcoin Retirement Starter Guide"
  tags={['slide-in-capture', 'homepage']}
/>
```

**Props:**
- `delay` (number, optional): Delay in milliseconds before showing (default: 30000)
- `leadMagnet` (string, optional): Name of the lead magnet to offer
- `tags` (string[], optional): ConvertKit tags to apply to subscribers

### SocialProofNotification

Displays social proof notifications showing recent user actions (signups, downloads, purchases).

**Features:**
- Cycles through multiple events
- Configurable display duration and delays
- Can be dismissed by user
- Respects session preferences
- Smooth fade animations

**Usage:**
```tsx
import { SocialProofNotification } from '@/src/components/conversion';

<SocialProofNotification
  displayDuration={5000} // Show each for 5 seconds
  delayBetween={15000} // 15 seconds between notifications
  initialDelay={10000} // Wait 10 seconds before first notification
/>
```

**Props:**
- `events` (SocialProofEvent[], optional): Array of events to display
- `displayDuration` (number, optional): How long to show each notification (default: 5000ms)
- `delayBetween` (number, optional): Delay between notifications (default: 15000ms)
- `initialDelay` (number, optional): Initial delay before first notification (default: 10000ms)

**Event Type:**
```typescript
interface SocialProofEvent {
  id: string;
  type: 'signup' | 'purchase' | 'download';
  message: string;
  timestamp: number;
  location?: string;
}
```

### UrgencyIndicator

Displays urgency indicators for limited-time offers, limited spots, or limited stock.

**Features:**
- Three types: countdown timer, limited spots, limited stock
- Real-time countdown updates
- Visual progress bars
- Color-coded urgency levels
- Responsive design

**Usage:**

**Countdown Timer:**
```tsx
import { UrgencyIndicator } from '@/src/components/conversion';

<UrgencyIndicator
  type="countdown"
  endDate={new Date('2024-12-31T23:59:59')}
  message="Special Offer Ends In:"
/>
```

**Limited Spots:**
```tsx
<UrgencyIndicator
  type="limited-spots"
  totalSpots={100}
  remainingSpots={23}
  message="Limited Enrollment Available"
/>
```

**Limited Stock:**
```tsx
<UrgencyIndicator
  type="limited-stock"
  totalStock={50}
  remainingStock={8}
/>
```

**Props:**
- `type` ('countdown' | 'limited-spots' | 'limited-stock'): Type of urgency indicator
- `endDate` (Date, optional): End date for countdown type
- `totalSpots` (number, optional): Total spots for limited-spots type
- `remainingSpots` (number, optional): Remaining spots for limited-spots type
- `totalStock` (number, optional): Total stock for limited-stock type
- `remainingStock` (number, optional): Remaining stock for limited-stock type
- `message` (string, optional): Custom message to display
- `className` (string, optional): Additional CSS classes

### ABTestProvider & useABTest

A simple A/B testing framework for running experiments on the website.

**Features:**
- Random variant assignment
- Persistent assignments across sessions (localStorage)
- Weighted distribution support
- Automatic tracking of assignments and conversions
- React Context API for easy access

**Usage:**

**1. Wrap your app with ABTestProvider:**
```tsx
import { ABTestProvider } from '@/src/components/conversion';

const tests = [
  {
    id: 'homepage-cta',
    variants: ['A', 'B'],
    weights: [0.5, 0.5], // Optional: 50/50 split
  },
  {
    id: 'pricing-layout',
    variants: ['grid', 'list', 'cards'],
    // Equal distribution if weights not specified
  },
];

<ABTestProvider tests={tests}>
  <YourApp />
</ABTestProvider>
```

**2. Use the hook in your components:**
```tsx
import { useABTest } from '@/src/components/conversion';

function CTAButton() {
  const { getVariant, trackConversion } = useABTest();
  const variant = getVariant('homepage-cta');

  const handleClick = () => {
    trackConversion('homepage-cta', 'signup');
    // ... rest of click handler
  };

  if (variant === 'A') {
    return <Button onClick={handleClick}>Get Started</Button>;
  } else {
    return <Button onClick={handleClick}>Start Your Journey</Button>;
  }
}
```

**3. Or use the ABTestVariant component:**
```tsx
import { ABTestVariant } from '@/src/components/conversion';

<ABTestVariant testId="homepage-cta" variant="A">
  <Button>Get Started</Button>
</ABTestVariant>

<ABTestVariant testId="homepage-cta" variant="B">
  <Button>Start Your Journey</Button>
</ABTestVariant>
```

**Test Configuration:**
```typescript
interface ABTest {
  id: string;
  variants: string[];
  weights?: number[]; // Optional weights (must sum to 1)
}
```

## Integration

To integrate these components into your pages:

### Home Page Example

```tsx
import {
  SlideInEmailCapture,
  SocialProofNotification,
  ABTestProvider,
} from '@/src/components/conversion';

export default function HomePage() {
  return (
    <ABTestProvider tests={[
      { id: 'hero-cta', variants: ['A', 'B'] }
    ]}>
      <main>
        {/* Your page content */}
      </main>
      
      {/* Conversion optimization components */}
      <SlideInEmailCapture />
      <SocialProofNotification />
    </ABTestProvider>
  );
}
```

### Product Page Example

```tsx
import { UrgencyIndicator } from '@/src/components/conversion';

export default function ProductPage() {
  return (
    <div>
      <h1>Bitcoin Retirement Course</h1>
      
      <UrgencyIndicator
        type="limited-spots"
        totalSpots={100}
        remainingSpots={23}
      />
      
      <UrgencyIndicator
        type="countdown"
        endDate={new Date('2024-12-31T23:59:59')}
        message="Early Bird Pricing Ends In:"
      />
      
      {/* Rest of product page */}
    </div>
  );
}
```

## Analytics

All conversion components automatically track events using the analytics utility:

- **SlideInEmailCapture**: Tracks when shown and when user subscribes
- **SocialProofNotification**: Can be extended to track impressions
- **UrgencyIndicator**: Can be extended to track views and interactions
- **ABTestProvider**: Automatically tracks variant assignments and conversions

## Best Practices

1. **Don't Overuse**: Too many conversion elements can be overwhelming. Use strategically.

2. **Test Timing**: Experiment with different delays for slide-ins and notifications.

3. **Respect User Preferences**: All components respect dismissal and subscription status.

4. **Mobile Optimization**: All components are mobile-responsive, but test on real devices.

5. **A/B Testing**: Always run A/B tests to validate that these elements improve conversions.

6. **Accessibility**: All components include proper ARIA labels and keyboard navigation.

7. **Performance**: Components use lazy loading and don't impact initial page load.

## Future Enhancements

- [ ] Connect SocialProofNotification to real-time API
- [ ] Add more urgency indicator types (e.g., "X people viewing this")
- [ ] Implement advanced A/B testing with statistical significance calculations
- [ ] Add exit-intent detection for slide-in
- [ ] Create admin dashboard for managing A/B tests
- [ ] Add heatmap integration for conversion tracking
