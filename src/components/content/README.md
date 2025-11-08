# Content Components

This directory contains components for displaying and managing content, specifically for the video library feature.

## Components

### VideoCard

Displays a single video with thumbnail, title, metadata, and category badge.

**Props:**
- `id` (string): Video ID for linking
- `title` (string): Video title
- `thumbnail` (string): Thumbnail image URL
- `duration` (string): Video duration (e.g., "10:30")
- `category` (VideoCategory): Video category
- `publishedAt` (string): Publication date
- `viewCount` (number, optional): Number of views

**Usage:**
```tsx
<VideoCard
  id="video-123"
  title="Bitcoin Basics"
  thumbnail="/images/thumbnail.jpg"
  duration="10:30"
  category="bitcoin-fundamentals"
  publishedAt="2024-01-01"
  viewCount={1000}
/>
```

### VideoGrid

Displays a grid of video cards with responsive layout.

**Props:**
- `videos` (Video[]): Array of video objects
- `emptyMessage` (string, optional): Message to display when no videos

**Usage:**
```tsx
<VideoGrid
  videos={videos}
  emptyMessage="No videos found."
/>
```

### VideoSearch

Search input with debounced search functionality (300ms delay).

**Props:**
- `onSearch` (function): Callback function called with search query
- `placeholder` (string, optional): Input placeholder text

**Usage:**
```tsx
<VideoSearch
  onSearch={(query) => console.log(query)}
  placeholder="Search videos..."
/>
```

### CategoryFilter

Category filter buttons for filtering videos by category.

**Props:**
- `selectedCategory` (VideoCategory | "all"): Currently selected category
- `onCategoryChange` (function): Callback function called when category changes

**Usage:**
```tsx
<CategoryFilter
  selectedCategory="bitcoin-fundamentals"
  onCategoryChange={(category) => console.log(category)}
/>
```

### Pagination

Pagination controls for navigating through pages of content.

**Props:**
- `currentPage` (number): Current page number (1-indexed)
- `totalPages` (number): Total number of pages
- `onPageChange` (function): Callback function called when page changes

**Usage:**
```tsx
<Pagination
  currentPage={1}
  totalPages={5}
  onPageChange={(page) => console.log(page)}
/>
```

## Video Categories

The following categories are available:
- `bitcoin-fundamentals`: Bitcoin Fundamentals
- `retirement-planning`: Retirement Planning
- `investment-strategies`: Investment Strategies
- `market-analysis`: Market Analysis
- `success-stories`: Success Stories
- `book-club`: Book Club

## Pages

### Video Library Page (`/content/videos`)

Features:
- Grid layout of all videos
- Category filtering (6 categories + "All")
- Search functionality with debounced input
- Pagination (12 videos per page)
- Loading and error states
- Results count display

### Video Detail Page (`/content/videos/[id]`)

Features:
- YouTube video embed
- Video metadata (views, likes, duration, date)
- Category badge
- Full description
- Tags display
- Related videos sidebar (same category)
- Transcript support (when available)
- Responsive layout

## Implementation Notes

- All components are client-side components (`"use client"`)
- Video library page fetches data on mount using YouTube API client
- Search is debounced by 300ms to reduce API calls
- Pagination resets to page 1 when filters change
- Video detail page uses ISR with 1-hour revalidation
- Related videos are filtered by category (max 3 videos)
