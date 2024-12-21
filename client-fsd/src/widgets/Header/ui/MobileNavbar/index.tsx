'use client';

import { X, Menu } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib';
import Link from 'next/link';
import { navigation } from '../../model/Navigation';

const LinkSpanStyles = cn(
  "relative after:absolute after:-bottom-[0px] after:left-0 after:block after:h-[1px] after:w-0 after:bg-clr-text-2 after:transition-all after:content-[''] after:group-hover:w-full after:data-[active=true]:w-full",
);

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const [isOpened, setIsOpened] = useState<boolean>(false);

  useEffect(() => {
    setIsOpened(false);
  }, [pathname]);

  return (
    <Drawer
      direction="left"
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <DrawerTitle />
      <DrawerTrigger>
        <Menu />
      </DrawerTrigger>
      <DrawerContent
        className="left-0 top-0 mt-0 h-full w-max min-w-[200px] rounded-none"
        aria-describedby=""
      >
        <DrawerHeader className="flex justify-end bg-black">
          <DrawerClose className="text-white transition-colors hover:text-white/80">
            <X className="hover:text-clr-secondary-3" />
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-5 py-4">
          {navigation.map(link => (
            <Button
              variant="link"
              size="link"
              asChild
              key={link.url}
              className={cn('after:hidden', 'group')}
            >
              <Link href={link.url}>
                <span
                  data-active={pathname === link.url}
                  className={cn(LinkSpanStyles)}
                >
                  {link.name}
                </span>
              </Link>
            </Button>
          ))}
          <Button
            variant="link"
            size="link"
            asChild
            className={cn('after:hidden', 'group')}
          >
            <Link href="/cart">
              <span
                data-active={pathname === '/cart'}
                className={cn(LinkSpanStyles)}
              >
                Cart
              </span>
            </Link>
          </Button>
          <Button
            variant="link"
            size="link"
            asChild
            className={cn('after:hidden', 'group')}
          >
            <Link href="/wishlist">
              <span
                data-active={pathname === '/wishlist'}
                className={cn(LinkSpanStyles)}
              >
                Wishlist
              </span>
            </Link>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
