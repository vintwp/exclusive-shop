'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { navigation } from '../../model/Navigation';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav>
      <div className={cn('flex flex-row gap-12')}>
        {navigation.map(link => (
          <Button
            variant="link"
            size="link"
            asChild
            key={link.url}
            className={cn(pathname === link.url && 'after:w-full')}
          >
            <Link href={link.url}>{link.name}</Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};
