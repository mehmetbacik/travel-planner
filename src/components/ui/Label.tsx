import { LabelHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  variant?: 'default' | 'small';
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, variant = 'default', ...props }, ref) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'small':
          return 'text-sm text-text-secondary';
        default:
          return 'text-base text-text-primary font-medium';
      }
    };

    return (
      <label
        ref={ref}
        className={twMerge(
          'block mb-2',
          getVariantClasses(),
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-error ml-1">*</span>}
      </label>
    );
  }
); 