import React from 'react';
import { cn } from '@/shared/lib';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const ShadowedFrame: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'relative h-full rounded px-8 py-5 shadow lg:px-20 lg:py-10',
        className,
      )}
    >
      {children}
    </div>
  );
};
