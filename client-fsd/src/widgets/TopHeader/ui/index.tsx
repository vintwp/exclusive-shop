import React from 'react';
import Link from 'next/link';
import { Container } from '@/shared/ui';
import { cn } from '@/shared/lib';

export const TopHeader: React.FC = () => {
  return (
    <div className="bg-buttonCard bg-black py-3 text-sm text-clr-text">
      <Container>
        <div className="flex items-center gap-2">
          <div className="flex flex-auto items-center justify-center gap-4 overflow-hidden font-normal">
            <p className="truncate">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </p>
            <Link
              href="/"
              className={cn(
                'text-nowrap font-bold underline',
                'transition-colors hover:text-clr-secondary-3',
              )}
            >
              Shop Now
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
