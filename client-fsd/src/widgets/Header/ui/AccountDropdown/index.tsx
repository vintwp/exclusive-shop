'use client';

import { cn } from '@/shared/lib';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { User, ShoppingBag, CircleX, Star, LogOut } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { signOutAction } from '../../lib/signOut';

const ddItemStyle = cn(
  'text-white hover:bg-transparent hover:text-clr-button-2 focus:bg-transparent focus:text-clr-button-2 cursor-pointer',
);

const linkItemStyle = cn('flex items-center gap-2');

type Props = {
  name?: string;
};

export const AccoundDropdown: React.FC<Props> = ({ name = '' }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  return (
    <DropdownMenu
      open={isOpened}
      onOpenChange={setIsOpened}
    >
      <DropdownMenuTrigger
        className={cn(
          isOpened && 'rounded-full bg-clr-secondary-3 text-white',
          'outline-none',
        )}
      >
        <div className="p-1">
          <User />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none bg-black/20 backdrop-blur-md">
        <DropdownMenuLabel className="text-white">{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={cn(ddItemStyle)}>
          <Link
            href="/profile"
            className={linkItemStyle}
          >
            <User />
            <span>Manage My Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn(ddItemStyle)}>
          <Link
            href="/orders"
            className={linkItemStyle}
          >
            <ShoppingBag />
            <span>My Order</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn(ddItemStyle)}>
          <Link
            href="/cancellations"
            className={linkItemStyle}
          >
            <CircleX />
            <span>My Cancellations</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn(ddItemStyle)}>
          <Link
            href="/reviews"
            className={linkItemStyle}
          >
            <Star />
            <span>My Reviews</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className={cn(ddItemStyle)}>
          <Button
            variant="ghost"
            className={cn(
              linkItemStyle,
              'w-full justify-start hover:bg-transparent hover:text-inherit',
            )}
            size="link"
            onClick={() => signOutAction()}
          >
            <LogOut />
            <span>Logout</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
