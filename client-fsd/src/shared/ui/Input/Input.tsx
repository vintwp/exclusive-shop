import * as React from 'react';

import { cn } from '@/shared/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  StartAdornment?: React.ReactNode;
  EndAdornment?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled = false,
      StartAdornment,
      EndAdornment,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          'relative flex items-center gap-3 px-3 py-2',
          'rounded-md border-[1px]',
          'hover:[&:not(:focus-within)]:border-clr-primary/50',
          'focus-within:border-clr-primary/50',
          'focus:border-clr-primary/50',
          'transition-colors',
          'text-clr-primary',
          disabled && 'bg-clr-secondary-2 text-clr-text-2',
          className,
        )}
      >
        {StartAdornment}
        <input
          type={type}
          className={cn('outline-none', 'bg-inherit', 'w-full')}
          ref={ref}
          {...props}
        />
        {EndAdornment}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
