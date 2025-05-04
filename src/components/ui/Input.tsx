import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variant?: 'default' | 'outlined';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, variant = 'default', ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'outlined':
          return 'bg-transparent border-2';
        default:
          return 'bg-background-light border';
      }
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          className={twMerge(
            'w-full px-4 py-2 rounded-md',
            'transition-all duration-300 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            getVariantClasses(),
            error
              ? 'border-error focus:ring-error'
              : 'border-border-color focus:ring-primary',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error">{error}</p>
        )}
      </div>
    );
  }
); 