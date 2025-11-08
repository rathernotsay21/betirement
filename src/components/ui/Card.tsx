import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  featured?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, featured = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-white rounded-lg shadow-md overflow-hidden',
          hover &&
            'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          featured && 'border-2 border-bitcoin-500',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pb-4', className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-heading font-semibold', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-500 mt-2', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('p-6 pt-0 flex items-center gap-2', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

const CardImage = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { src: string; alt: string }
>(({ className, src, alt, ...props }, ref) => (
  <div ref={ref} className={cn('relative w-full h-48', className)} {...props}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  </div>
));

CardImage.displayName = 'CardImage';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
};
