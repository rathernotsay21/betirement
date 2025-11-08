import { ButtonHTMLAttributes, forwardRef } from 'react';
import Link from 'next/link';
import { cn } from '@/src/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  href?: string;
  onClick?: () => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-bitcoin-500 text-white hover:bg-bitcoin-600 focus:ring-bitcoin-500 active:bg-bitcoin-700',
      secondary:
        'bg-black text-white hover:bg-black-light focus:ring-black active:bg-neutral-900',
      outline:
        'border-2 border-bitcoin-500 text-bitcoin-500 hover:bg-bitcoin-50 focus:ring-bitcoin-500 active:bg-bitcoin-100',
      ghost:
        'text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-500 active:bg-neutral-200',
    };

    const sizeStyles = {
      sm: 'px-4 py-2.5 text-sm rounded min-h-[44px]', // Ensure 44px min height for touch
      md: 'px-5 py-3 text-base rounded-md min-h-[44px]',
      lg: 'px-6 py-3.5 text-lg rounded-lg min-h-[48px]',
    };

    const buttonClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={buttonClasses}
          aria-disabled={disabled || loading}
          aria-busy={loading}
          onClick={props.onClick}
        >
          {loading && (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </>
          )}
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-live={loading ? 'polite' : undefined}
        {...props}
      >
        {loading && (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
