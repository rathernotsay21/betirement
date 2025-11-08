# UI Components

This directory contains the core UI components for the Betirement website, built with React, TypeScript, and Tailwind CSS.

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: boolean (default: false)
- `disabled`: boolean
- `href`: string (optional - renders as anchor tag)

**Example:**
```tsx
import { Button } from '@/src/components/ui';

<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="outline" loading>
  Processing...
</Button>

<Button href="/about" variant="secondary">
  Learn More
</Button>
```

### Card

A flexible card component with multiple sub-components for structured content.

**Sub-components:**
- `Card`: Main container
- `CardHeader`: Header section
- `CardTitle`: Title text
- `CardDescription`: Description text
- `CardContent`: Main content area
- `CardFooter`: Footer section
- `CardImage`: Image section

**Props:**
- `hover`: boolean (default: false) - Adds hover effect
- `featured`: boolean (default: false) - Adds Bitcoin orange border

**Example:**
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/src/components/ui';

<Card hover featured>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Modal

An accessible modal dialog component with focus management and keyboard navigation.

**Props:**
- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `title`: string (required)
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `closeOnOverlayClick`: boolean (default: true)
- `showCloseButton`: boolean (default: true)

**Features:**
- Focus trap
- Escape key to close
- Click outside to close
- Proper ARIA attributes
- Focus restoration
- Body scroll lock

**Example:**
```tsx
import { Modal, ModalFooter } from '@/src/components/ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  <p>Modal content goes here</p>
  
  <ModalFooter>
    <Button variant="ghost" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit}>
      Submit
    </Button>
  </ModalFooter>
</Modal>
```

### Input

A form input component with validation states and helper text.

**Props:**
- `label`: string (optional)
- `error`: string (optional) - Shows error state and message
- `success`: boolean (optional) - Shows success state
- `helperText`: string (optional)
- `leftIcon`: React.ReactNode (optional)
- `rightIcon`: React.ReactNode (optional)
- All standard HTML input attributes

**Features:**
- Automatic error/success icons
- Accessible labels and error messages
- Required field indicator
- Disabled state styling

**Example:**
```tsx
import { Input } from '@/src/components/ui';

<Input
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  error={emailError}
  required
/>

<Input
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
  success={isValid}
/>
```

## Design System

### Colors

The components use the Betirement color palette defined in `tailwind.config.ts`:

- **Bitcoin Orange**: `bitcoin-500` (#F7931A) - Primary brand color
- **Rich Black**: `black` (#0D0D0D) - Secondary color
- **Success Green**: `success` (#27AE60) - Success states
- **Trust Blue**: `trust` (#2E86DE) - Trust indicators
- **Neutral**: `neutral-*` - Gray scale for text and backgrounds

### Typography

- **Headings**: Inter font family (`font-heading`)
- **Body**: Open Sans font family (`font-body`)

### Accessibility

All components follow WCAG 2.1 AA guidelines:

- Proper ARIA attributes
- Keyboard navigation support
- Focus indicators
- Color contrast ratios
- Screen reader support

## Usage Guidelines

1. **Import from index**: Always import from `@/src/components/ui` for consistency
2. **Use TypeScript**: All components have proper TypeScript types
3. **Accessibility**: Ensure proper labels and ARIA attributes when using components
4. **Styling**: Use Tailwind classes for additional styling via `className` prop
5. **Testing**: Test components with keyboard navigation and screen readers

## Demo

Visit `/components-demo` to see all components in action with various configurations and states.
