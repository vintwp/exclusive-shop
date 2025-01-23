import React from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  type?: 'normal' | 'fluid';
  className?: string;
  children: React.ReactNode;
};

export const Container: React.FC<Props> = ({
  type = 'normal',
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'container px-0',
        type === 'normal' && 'max-w-[1202px] px-4',
        type === 'fluid' && 'm-0 max-w-full',
        className,
      )}
    >
      {children}
    </div>
  );
};
