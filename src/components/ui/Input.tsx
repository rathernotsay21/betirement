import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/src/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      success,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = success && !hasError;

    const baseStyles =
      'w-full px-4 py-3 text-base sm:text-base border rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-neutral-50 min-h-[44px]';

    const stateStyles = hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : hasSuccess
        ? 'border-success focus:border-success focus:ring-success'
        : 'border-neutral-300 focus:border-bitcoin-500 focus:ring-bitcoin-500';

    const iconPaddingStyles = leftIcon
      ? 'pl-10'
      : rightIcon
        ? 'pr-10'
        : '';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            {label}
            {props.required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(baseStyles, stateStyles, iconPaddingStyles, className)}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />

          {rightIcon && !hasError && !hasSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500">
              {rightIcon}
            </div>
          )}

          {hasError && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {hasSuccess && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
