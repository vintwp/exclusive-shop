import { cn } from '@/shared/lib';
import React from 'react';

type PageSectionProps = {
  className?: string;
  children: React.ReactNode;
};

const PageSection = ({ className, children }: PageSectionProps) => {
  return <div className={cn('py-8 lg:py-16', className)}>{children}</div>;
};

const PageSectionPrimaryTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element => {
  return (
    <div
      className={cn('flex items-center justify-between', className)}
      {...props}
    >
      <h2
        className={cn(
          'text-xl font-semibold tracking-tight lg:text-4xl',
          className,
        )}
      >
        {children}
      </h2>
    </div>
  );
};

PageSection.PrimaryTitle = PageSectionPrimaryTitle;

const PageSectionUpperTitle = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <h3
      className={cn(
        `relative flex items-center gap-4 text-sm font-semibold text-clr-secondary-3
        before:h-6 before:w-3 before:rounded-md before:bg-clr-secondary-3
        before:content-[''] md:text-base lg:before:h-10 lg:before:w-5`,
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

PageSection.UpperTitle = PageSectionUpperTitle;

const PageSectionTitles = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-3 md:gap-6', className)}
    {...props}
  >
    {children}
  </div>
);

PageSection.Titles = PageSectionTitles;

const PageSectionHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'mb-8 flex items-end md:mb-10 lg:mb-14 lg:leading-none',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

PageSection.Header = PageSectionHeader;

export { PageSection };
