import * as React from 'react';

import { cn } from '@/shared/lib';

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'relative flex min-h-[80px] w-full items-center gap-3 px-3 py-2',
        'rounded-md border-[1px]',
        'hover:[&:not(:focus-within)]:border-clr-primary/50',
        'focus-within:border-clr-primary/50',
        'focus:border-clr-primary/50',
        'transition-colors',
        'text-clr-primary',
        'disabled:cursor-not-allowed',
        'outline-none',
        // disabled && 'bg-clr-secondary-2 text-clr-text-2',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
