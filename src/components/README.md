# Components Directory

This directory contains all React components for the Betirement website.

## Structure

- `ui/` - Reusable UI components (Button, Card, Modal, Input, etc.)
- `sections/` - Page-specific sections (Hero, Features, etc.)
- `forms/` - Form components (EmailCapture, Contact, Quiz, etc.)
- `layout/` - Layout components (Header, Footer, Navigation, etc.)

## Component Guidelines

- Use TypeScript for all components
- Include proper prop types and interfaces
- Follow accessibility best practices (WCAG 2.1 AA)
- Use Tailwind CSS for styling
- Keep components focused and reusable
- Document complex components with JSDoc comments

## Example Component

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded',
        variant === 'primary' && 'bg-bitcoin-500 text-white',
        variant === 'secondary' && 'bg-black text-white'
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```
