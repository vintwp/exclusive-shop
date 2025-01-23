import { cn } from '@/shared/lib';
import React from 'react';

type UpperTitleProps = {
  title: string;
  className?: string;
};

export const PageSectionUpperTitle: React.FC<UpperTitleProps> = ({
  title,
  className,
}) => {
  return (
    <h3
      className={cn(
        `relative mb-5 flex items-center gap-4 text-sm font-semibold text-clr-secondary-3
        before:h-6 before:w-3 before:rounded-md before:bg-clr-secondary-3
        before:content-[''] md:text-base lg:before:h-10 lg:before:w-5`,
        className,
      )}
    >
      {title}
    </h3>
  );
};

type PrimaryTitleProps = UpperTitleProps & {
  className?: string;
  children?: React.ReactNode;
};

export const PageSectionPrimaryTitle: React.FC<PrimaryTitleProps> = ({
  title,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'mb-8 flex items-center justify-between md:mb-10 lg:mb-14',
        className,
      )}
    >
      <h2
        className={cn(
          'text-xl font-semibold tracking-tight lg:text-4xl',
          className,
        )}
      >
        {title}
      </h2>
      {children}
    </div>
  );
};

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const PageSection: React.FC<Props> = ({ className, children }) => {
  return <div className={cn('py-8 lg:py-16', className)}>{children}</div>;
};
