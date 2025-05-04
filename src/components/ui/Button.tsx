import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, loading, disabled, variant = 'primary', ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'secondary':
          return 'bg-secondary text-text-on-primary hover:bg-opacity-90';
        case 'accent':
          return 'bg-accent text-text-primary hover:bg-opacity-90';
        default:
          return 'bg-gradient-to-r from-primary to-accent text-text-on-primary hover:shadow-lg';
      }
    };

    return (
      <button
        ref={ref}
        className={twMerge(
          'relative inline-flex items-center justify-center',
          'px-4 py-2 rounded-md font-medium',
          'transition-all duration-300 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          getVariantClasses(),
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
          </span>
        )}
        <span className={loading ? 'opacity-0' : 'opacity-100'}>
          {children}
        </span>
      </button>
    );
  }
); 