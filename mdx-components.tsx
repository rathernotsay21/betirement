import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-6 text-black font-heading">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mb-4 mt-8 text-black font-heading">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-6 text-black font-heading">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 text-neutral-700 leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-neutral-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-neutral-700">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    a: ({ href, children }) => (
      <Link
        href={href as string}
        className="text-bitcoin-500 hover:text-bitcoin-600 underline"
      >
        {children}
      </Link>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-bitcoin-500 pl-4 italic my-4 text-neutral-600">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-neutral-100 px-2 py-1 rounded text-sm font-mono text-bitcoin-600">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    img: (props) => (
      <Image
        src={props.src as string}
        alt={props.alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-6"
      />
    ),
    ...components,
  };
}
