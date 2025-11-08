'use client';

import { useEffect, useRef, Fragment } from 'react';
import { cn } from '@/src/lib/utils';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const sizeStyles = {
    sm: 'max-w-md mx-4',
    md: 'max-w-lg mx-4',
    lg: 'max-w-2xl mx-4',
    xl: 'max-w-4xl mx-4',
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Store currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      // Focus the modal
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  // Trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab as any);
    return () => modal.removeEventListener('keydown', handleTab as any);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          ref={modalRef}
          className={cn(
            'bg-white rounded-lg shadow-xl w-full relative',
            'transform transition-all',
            'my-4 sm:my-8', // Vertical margin for mobile
            sizeStyles[size]
          )}
          tabIndex={-1}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-neutral-100">
            <h2
              id="modal-title"
              className="text-xl sm:text-2xl font-heading font-semibold text-neutral-900 pr-8"
            >
              {title}
            </h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-neutral-500 hover:text-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-bitcoin-500 rounded absolute top-2 right-2 sm:relative sm:top-0 sm:right-0"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 max-h-[calc(100vh-200px)] overflow-y-auto">{children}</div>
        </div>
      </div>
    </Fragment>
  );
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 pt-4 border-t border-neutral-100',
        className
      )}
    >
      {children}
    </div>
  );
}
