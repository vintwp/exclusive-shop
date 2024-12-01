'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib';

type Props = {
  name: string;
  href: string;
  className?: string;
};

export const AccountSidebarLink: React.FC<Props> = ({
  name,
  href,
  className,
}) => {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        'text-black/50',
        currentPath === href && 'text-clr-button-2',
        'hover:text-clr-button-hov',
        'after:bg-transparent',
        className,
      )}
    >
      {name}
    </Link>
  );
};
