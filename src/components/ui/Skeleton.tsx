import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'text',
  animation = 'pulse',
  width,
  height,
}: SkeletonProps) {
  const baseClasses = 'bg-neutral-200 dark:bg-neutral-800';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: '',
    none: '',
  };

  if (animation === 'wave') {
    return (
      <div
        className={cn(
          baseClasses,
          variantClasses[variant],
          'relative overflow-hidden',
          className
        )}
        style={{ width, height }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'linear',
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={{ width, height }}
    />
  );
}

// Video Card Skeleton
export function VideoCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Skeleton variant="rectangular" className="aspect-video" />
      <div className="p-4">
        <Skeleton variant="rounded" height={20} className="mb-2 w-1/3" />
        <Skeleton variant="text" height={24} className="mb-2" />
        <Skeleton variant="text" height={20} className="mb-2 w-5/6" />
        <div className="flex justify-between mt-3">
          <Skeleton variant="text" width={80} height={16} />
          <Skeleton variant="text" width={60} height={16} />
        </div>
      </div>
    </div>
  );
}

// Blog Card Skeleton
export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <Skeleton variant="rectangular" className="h-48" />
      <div className="p-6">
        <Skeleton variant="rounded" height={20} className="mb-3 w-1/4" />
        <Skeleton variant="text" height={28} className="mb-3" />
        <Skeleton variant="text" height={20} className="mb-2" />
        <Skeleton variant="text" height={20} className="mb-2 w-4/5" />
        <Skeleton variant="text" height={20} className="w-3/5" />
        <div className="flex items-center justify-between mt-4">
          <Skeleton variant="text" width={100} height={16} />
          <Skeleton variant="text" width={80} height={16} />
        </div>
      </div>
    </div>
  );
}

// Resource Card Skeleton
export function ResourceCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-start gap-4">
        <Skeleton variant="rounded" width={48} height={48} />
        <div className="flex-1">
          <Skeleton variant="text" height={24} className="mb-2" />
          <Skeleton variant="text" height={20} className="mb-2" />
          <Skeleton variant="text" height={20} className="w-4/5" />
          <div className="flex gap-2 mt-3">
            <Skeleton variant="rounded" width={60} height={24} />
            <Skeleton variant="rounded" width={80} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="text-center">
          <Skeleton variant="text" height={48} className="mb-2 mx-auto w-32" />
          <Skeleton variant="text" height={20} className="mx-auto w-24" />
        </div>
      ))}
    </div>
  );
}

// Video Grid Skeleton
export function VideoGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <VideoCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Content Section Skeleton
export function ContentSectionSkeleton() {
  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <Skeleton variant="text" height={40} className="max-w-md mx-auto mb-4" />
        <Skeleton variant="text" height={24} className="max-w-2xl mx-auto" />
      </div>
      <VideoGridSkeleton count={3} />
    </div>
  );
}

// Profile Skeleton
export function ProfileSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="flex-1">
        <Skeleton variant="text" height={24} className="mb-2 w-1/3" />
        <Skeleton variant="text" height={20} className="w-1/2" />
      </div>
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr>
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton variant="text" height={20} />
        </td>
      ))}
    </tr>
  );
}