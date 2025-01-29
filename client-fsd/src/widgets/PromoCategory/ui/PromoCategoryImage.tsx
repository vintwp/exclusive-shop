import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib';

type Props = {
  src: string;
  alt: string;
};

const Gragient = () => (
  <div
    className={cn(
      'absolute left-1/2 top-1/2',
      'h-[250px] w-[250px]',
      '-translate-x-1/2 -translate-y-1/2',
      'bg-[#d9d9d9]',
      'blur-[200px]',
    )}
  />
);

export const PromoCategoryImage: React.FC<Props> = ({ src, alt }) => {
  return (
    <div className="relative hidden max-w-[568px] flex-grow basis-1/2 sm:block">
      <Image
        src={src}
        alt={alt}
        fill
        className="z-10 object-contain"
      />
      <Gragient />
    </div>
  );
};
