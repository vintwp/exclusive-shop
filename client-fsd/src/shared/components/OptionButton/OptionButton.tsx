import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import React from 'react';

type PropsText = {
  type: 'TEXT';
  content: string;
  size?: 'sm' | 'md';
  color?: never;
};

type PropsColor = {
  type: 'COLOR';
  color: string;
  content?: never;
  size?: never;
};

type PropsCommon = {
  href: string;
  active?: boolean;
};

type Props = PropsCommon & (PropsText | PropsColor);

export const OptionButton: React.FC<Props> = ({
  type,
  href,
  active,
  color,
  content,
  size = 'sm',
}) => {
  if (type === 'COLOR') {
    return (
      <Button
        asChild
        className={cn(
          `border-box relative block h-5 w-5 rounded-full p-0
          shadow-[inset_0_0_0_4px_transparent] transition-opacity hover:opacity-50`,
          active &&
            `shadow-white after:absolute after:z-10 after:h-full after:w-full
            after:rounded-full after:border-[2px] after:border-black after:transition-colors
            after:content-[""]`,
        )}
        style={{
          backgroundColor: color,
        }}
      >
        <Link href={href} />
      </Button>
    );
  }

  return (
    <Button
      asChild
      className={cn(
        `rounded-sm border-[1px] border-black/50 bg-transparent text-black
        hover:border-clr-button-hov hover:bg-clr-button-hov hover:text-white`,
        size === 'sm' && 'px-1 py-[2px] text-[8px] font-light',
        size === 'md' && 'px-3 py-[6px] text-sm',
      )}
    >
      <Link href={href}>{content}</Link>
    </Button>
  );
};
