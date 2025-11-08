import Link from 'next/link';
import Image from 'next/image';
import type { BlogCardProps } from '@/types/blog';

export default function BlogCard({
  slug,
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  readingTime,
  tags,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/content/blog/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
          <time dateTime={publishedAt}>{formattedDate}</time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        <Link href={`/content/blog/${slug}`}>
          <h3 className="text-xl font-bold text-black mb-2 hover:text-bitcoin-500 transition-colors font-heading">
            {title}
          </h3>
        </Link>

        <p className="text-neutral-600 mb-4 line-clamp-3">{excerpt}</p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/content/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full hover:bg-bitcoin-50 hover:text-bitcoin-600 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <Link
            href={`/content/blog/${slug}`}
            className="text-bitcoin-500 hover:text-bitcoin-600 font-semibold text-sm transition-colors"
          >
            Read more →
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">By {author}</p>
        </div>
      </div>
    </article>
  );
}
