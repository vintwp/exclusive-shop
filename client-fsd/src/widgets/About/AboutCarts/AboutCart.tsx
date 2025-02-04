import { Button } from '@/shared/ui';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/shared/lib';
import Image from 'next/image';
import { AboutCartSocialButton } from './AboutCartSocialButton';

type Props = {
  image: string;
  name: string;
  position: string;
  twitter?: string;
  instagramm?: string;
  linkedin?: string;
};

export const AboutCart: React.FC<Props> = ({
  image,
  name,
  position,
  twitter,
  instagramm,
  linkedin,
}) => {
  return (
    <div className="max-w-[370px]">
      <div
        className={cn(
          'relative mb-8 max-h-[430px] bg-clr-secondary-2',
          'after:block after:pb-[116%] after:content-[""]',
        )}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <p className="mb-2 text-[32px] font-medium leading-none tracking-wider">
        {name}
      </p>
      <p className="mb-4 text-base">{position}</p>
      <div className="flex gap-4">
        {twitter && (
          <AboutCartSocialButton
            variant="twitter"
            link={twitter}
          />
        )}
        {instagramm && (
          <AboutCartSocialButton
            variant="instagramm"
            link={instagramm}
          />
        )}

        {linkedin && (
          <AboutCartSocialButton
            variant="linkedin"
            link={linkedin}
          />
        )}
      </div>
    </div>
  );
};
