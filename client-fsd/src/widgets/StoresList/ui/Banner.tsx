import React from 'react';
import Image from 'next/image';
import { TBanner } from '@/entities/Banner';
import Link from 'next/link';

type Props = {
  banner: TBanner;
};

export const Banner: React.FC<Props> = ({ banner }) => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={banner.image}
        alt={banner.url}
        objectFit="cover"
        fill
      />
      <Link
        href={banner.url}
        className="absolute h-full w-full"
      />
    </div>
  );
};
