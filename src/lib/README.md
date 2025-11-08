# Library Directory

This directory contains utility functions and API clients for the Betirement website.

## Files

- `utils.ts` - General utility functions (formatting, validation, etc.)
- `youtube.ts` - YouTube Data API client (to be implemented)
- `convertkit.ts` - ConvertKit API client (to be implemented)
- `analytics.ts` - Analytics tracking utilities (to be implemented)

## Usage

```typescript
import { cn, formatDate, isValidEmail } from '@/lib/utils';
import { YouTubeClient } from '@/lib/youtube';
import { ConvertKitClient } from '@/lib/convertkit';
```

## API Clients

API clients should:
- Handle authentication
- Implement error handling
- Include rate limiting protection
- Cache responses where appropriate
- Provide TypeScript types for responses
