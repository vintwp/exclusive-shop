import { cn } from '@/shared/lib';
import React from 'react';

const BenefitCard = ({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={className}>{children}</div>
);

const BenefitCardIcon = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'relative h-20 w-20 rounded-full bg-clr-secondary-2',
      'mx-auto mb-3 sm:mb-6',
      `after:absolute after:left-1/2 after:top-1/2 after:h-[60px] after:w-[60px]
      after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-black
      after:content-[""]`,
      className,
    )}
    {...props}
  >
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      {children}
    </div>
  </div>
);

const BenefitCardTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <p
    className={cn(
      'mb-2 text-center text-base font-semibold uppercase leading-[1.4] sm:text-xl',
      className,
    )}
    {...props}
  >
    {children}
  </p>
);

const BenefitCardText = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <p
    className={cn('text-center text-xs leading-normal sm:text-sm', className)}
    {...props}
  >
    {children}
  </p>
);

BenefitCard.Icon = BenefitCardIcon;
BenefitCard.Title = BenefitCardTitle;
BenefitCard.Text = BenefitCardText;

export { BenefitCard };
