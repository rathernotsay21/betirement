# Blog System Documentation

## Overview

The Betirement blog system uses Markdown files with frontmatter for content management. Blog posts are statically generated at build time for optimal performance.

## Creating a New Blog Post

### 1. Create a Markdown File

Create a new `.md` file in `src/data/blog/` with a kebab-case filename:

```
src/data/blog/your-post-slug.md
```

### 2. Add Frontmatter

Every blog post must include frontmatter at the top:

```markdown
---
title: "Your Post Title"
excerpt: "A brief summary of your post (150-200 characters)"
coverImage: "/images/blog/your-image.jpg"
publishedAt: "2024-01-01"
category: "Category Name"
tags: ["tag1", "tag2", "tag3"]
featured: false
---
```

### 3. Write Content

After the frontmatter, write your content using standard Markdown:

```markdown
# Main Heading

Your introduction paragraph.

## Section Heading

Content with **bold** and *italic* text.

- List item 1
- List item 2

[Link text](https://example.com)
```

## Frontmatter Fields

### Required Fields

- **title** (string): The post title (used in SEO and display)
- **excerpt** (string): Brief summary for cards and SEO
- **coverImage** (string): Path to cover image (1200x630px recommended)
- **publishedAt** (string): Publication date in YYYY-MM-DD format
- **category** (string): Post category (see categories below)
- **tags** (array): Array of relevant tags

### Optional Fields

- **updatedAt** (string): Last update date in YYYY-MM-DD format
- **featured** (boolean): Set to `true` to feature on homepage (default: false)
- **author** (object): Override default author
  ```yaml
  author:
    name: "Author Name"
    avatar: "/images/author/avatar.jpg"
    bio: "Short bio"
  ```
- **seo** (object): Override SEO metadata
  ```yaml
  seo:
    title: "Custom SEO Title"
    description: "Custom meta description"
    keywords: ["keyword1", "keyword2"]
    ogImage: "/images/custom-og.jpg"
  ```

## Categories

Use one of these standard categories:

- **Bitcoin Fundamentals**: Basic Bitcoin education
- **Retirement Planning**: Retirement strategies and planning
- **Investment Strategies**: Investment approaches and tactics
- **Market Analysis**: Market trends and analysis
- **Success Stories**: Personal stories and case studies
- **Getting Started**: Beginner guides and introductions

## Tags

Common tags to use:

- bitcoin
- retirement
- investing
- strategy
- basics
- advanced
- market analysis
- financial freedom
- portfolio
- security

## Markdown Features

### Supported Syntax

- **Headings**: `#`, `##`, `###`
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Links**: `[text](url)`
- **Lists**: `- item` or `1. item`
- **Code**: `` `code` `` or ` ```language ```
- **Blockquotes**: `> quote`
- **Images**: `![alt](url)`

### Styling

The blog system automatically applies styling:

- Headings use the brand font (Inter)
- Links are styled in Bitcoin orange
- Code blocks have syntax highlighting
- Lists are properly spaced
- Images are responsive

## Images

### Cover Images

- **Location**: `/public/images/blog/`
- **Dimensions**: 1200x630px (optimal for social sharing)
- **Format**: WebP preferred, JPG/PNG acceptable
- **Size**: < 200KB for performance

### In-Content Images

```markdown
![Alt text](/images/blog/content-image.jpg)
```

Images are automatically optimized by Next.js Image component.

## Reading Time

Reading time is automatically calculated based on content length (approximately 200 words per minute).

## SEO

### Automatic SEO Features

- Meta titles and descriptions from frontmatter
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Schema.org Article markup
- Automatic sitemap generation

### Best Practices

1. **Title**: 50-60 characters, include target keyword
2. **Excerpt**: 150-160 characters, compelling summary
3. **Keywords**: 3-5 relevant tags
4. **Images**: Always include descriptive alt text
5. **Links**: Use descriptive anchor text

## URL Structure

Blog posts are accessible at:

```
/content/blog/[slug]
```

Where `[slug]` is the filename without the `.md` extension.

## Filtering and Search

### Category Filtering

```
/content/blog?category=Bitcoin%20Fundamentals
```

### Tag Filtering

```
/content/blog?tag=retirement
```

### Search

```
/content/blog?search=bitcoin
```

## Development Workflow

### 1. Create Post

```bash
# Create new file
touch src/data/blog/my-new-post.md

# Add frontmatter and content
```

### 2. Add Cover Image

```bash
# Add image to public directory
cp my-image.jpg public/images/blog/
```

### 3. Test Locally

```bash
npm run dev
# Visit http://localhost:3000/content/blog
```

### 4. Build and Deploy

```bash
npm run build
# Posts are statically generated
```

## API Functions

The blog system provides utility functions in `src/lib/blog.ts`:

- `getAllBlogPosts()`: Get all posts sorted by date
- `getBlogPostBySlug(slug)`: Get single post
- `getBlogPostsByCategory(category)`: Filter by category
- `getBlogPostsByTag(tag)`: Filter by tag
- `getAllCategories()`: Get all unique categories
- `getAllTags()`: Get all unique tags
- `getFeaturedBlogPosts(limit?)`: Get featured posts
- `searchBlogPosts(query)`: Search posts

## Social Sharing

Each blog post includes social sharing buttons for:

- Twitter
- LinkedIn
- Facebook
- Email
- Copy link

## Performance

- **Static Generation**: All posts pre-rendered at build time
- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Each post loaded on demand
- **Caching**: Aggressive caching for static assets

## Future Enhancements

Planned features:

- MDX support for interactive components
- Related posts suggestions
- Comments system integration
- Newsletter signup integration
- Author pages
- Series/collections
- Table of contents generation
- Estimated reading progress

## Troubleshooting

### Post Not Showing

1. Check frontmatter syntax (YAML format)
2. Ensure file is in `src/data/blog/`
3. Verify filename ends with `.md`
4. Rebuild the site: `npm run build`

### Images Not Loading

1. Check image path starts with `/`
2. Verify image exists in `public/images/blog/`
3. Check image filename matches exactly (case-sensitive)

### Build Errors

1. Validate frontmatter YAML syntax
2. Check for special characters in content
3. Ensure all required fields are present
4. Run `npm run build` to see specific errors

## Support

For questions or issues with the blog system, refer to:

- Next.js documentation: https://nextjs.org/docs
- Markdown guide: https://www.markdownguide.org/
- Project README: `/README.md`
