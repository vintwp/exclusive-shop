import React from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={cn('container max-w-[1202px] px-4', className)}>
      {children}
    </div>
  );
};
