import * as React from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default: 'bg-clr-button-2 text-clr-text hover:bg-clr-button-hov',
        destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
        outline:
          'border border-black/50 bg-transparent text-black hover:text-clr-text-2',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80',
        ghost: 'hover:bg-slate-100 hover:text-slate-900',
        link: 'leading-6 relative after:content-[""] after:absolute after:-bottom-[0px] after:left-0 after:w-0 after:h-[1px] after:block after:bg-clr-text-2 after:transition-all after:hover:w-full text-base text-inherit',
      },
      size: {
        default: 'min-h-5 p-4 text-base font-medium',
        sm: 'min-h-4 rounded-md px-2 py-[10px]',
        xs: 'min-h-2 rounded-md px-2 py-[8px]',
        xxs: 'min-h-2 rounded-md px-2 py-[8px] text-xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        link: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const LoadingSpinner = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text- mr-2 animate-spin')}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  childred?: React.ReactNode;
}

const CarouselButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  },
);

CarouselButton.displayName = 'Button';

export { CarouselButton, buttonVariants };
