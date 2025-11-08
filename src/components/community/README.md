# Community Components

This directory contains components for the Betirement Community portal, enabling member engagement, tier comparison, and success story submissions.

## Components

### MembershipTierCard

Displays a single membership tier with features, pricing, and CTA button.

**Props:**
- `tier: MembershipTierInfo` - Membership tier data
- `onSelect?: (tierId: string) => void` - Callback when tier is selected

**Features:**
- Highlighted styling for featured tiers
- Feature list with checkmarks
- Responsive design
- Hover effects

### MembershipComparison

Displays all membership tiers in a comparison grid layout.

**Props:**
- `tiers: MembershipTierInfo[]` - Array of membership tiers
- `onSelectTier?: (tierId: string) => void` - Callback when tier is selected

**Features:**
- Three-tier comparison (Free, Premium, VIP)
- Responsive grid layout
- Money-back guarantee messaging
- FAQ link

### ForumPlaceholder

Displays community forum information with stats and external link.

**Features:**
- Community statistics (members, discussions, success stories)
- Forum benefits list
- External link to community platform
- Premium/VIP member access indicator

**Note:** Links to external community platform (e.g., Discord, Circle, Discourse)

### SuccessStoryForm

Form for members to submit their success stories.

**Features:**
- Netlify Forms integration
- Client-side validation
- Required fields: name, email, achievement, story
- Optional field: age
- Consent checkbox for public sharing
- Character counter for story field
- Success/error messaging

**Validation:**
- Email format validation
- Minimum story length (50 characters)
- Required field checking
- Consent confirmation

## Data Structure

### Membership Tiers

Located at: `src/data/community/membership-tiers.json`

```json
{
  "tiers": [
    {
      "id": "free",
      "name": "Free Member",
      "price": "Free",
      "description": "...",
      "features": ["..."],
      "cta": "Join Free",
      "highlighted": false
    }
  ]
}
```

## Usage Example

```tsx
import {
  MembershipComparison,
  ForumPlaceholder,
  SuccessStoryForm,
} from "@/components/community";
import membershipTiers from "@/data/community/membership-tiers.json";

export default function CommunityPage() {
  const handleTierSelect = (tierId: string) => {
    // Handle tier selection
    console.log("Selected tier:", tierId);
  };

  return (
    <main>
      <MembershipComparison
        tiers={membershipTiers.tiers}
        onSelectTier={handleTierSelect}
      />
      <ForumPlaceholder />
      <SuccessStoryForm />
    </main>
  );
}
```

## Netlify Forms Setup

The SuccessStoryForm uses Netlify Forms. Ensure the following:

1. Form has `data-netlify="true"` attribute
2. Form has `name` attribute matching the form-name hidden input
3. Honeypot field included for spam protection
4. Configure email notifications in Netlify dashboard

## Future Enhancements

- [ ] Add authentication for member-only features
- [ ] Implement success story gallery/showcase
- [ ] Add member leaderboard component
- [ ] Integrate with payment processor for tier upgrades
- [ ] Add member testimonials carousel
- [ ] Implement forum integration (if self-hosted)
- [ ] Add member profile components
- [ ] Create engagement tracking

## Requirements Addressed

- **10.1**: Three membership tiers (Free, Premium, VIP)
- **10.2**: Welcome email series (handled by ConvertKit integration)
- **10.3**: Member forum with external platform link
- **10.4**: Success story submission form with structured fields
