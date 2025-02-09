'use client';

import { cn } from '@/shared/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

type Props = {
  homeElement?: React.ReactNode;
  separator?: string;
};

export const Breadcrumbs: React.FC<Props> = ({
  homeElement = 'Home',
  separator = '/',
}) => {
  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);

  return (
    <div className="text-sm text-black/50">
      <ul className="flex gap-3">
        <li className={cn('underline-offset-2 hover:underline')}>
          <Link href="/">{homeElement}</Link>
        </li>
        {pathNames.length > 0 && <span>{separator}</span>}
        {pathNames.map((link, index) => {
          const href = `/${pathNames.slice(0, index + 1).join('/')}`;
          const isActive = paths === href;

          return (
            <React.Fragment key={link}>
              <li
                className={cn(
                  'capitalize underline-offset-2 hover:underline',
                  isActive && 'text-black',
                )}
              >
                <Link href={href}>{link.replaceAll('-', ' ')}</Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};
