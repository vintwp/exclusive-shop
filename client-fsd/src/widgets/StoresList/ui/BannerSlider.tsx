/* eslint-disable @typescript-eslint/ban-ts-comment */

'use client';

import React from 'react';
import { TBanner } from '@/entities/Banner';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/shared/ui';
import Fade from 'embla-carousel-fade';
import Autoplay from 'embla-carousel-autoplay';
import { Banner } from './Banner';

type Props = {
  banner: TBanner[];
};

export const BannerSlider: React.FC<Props> = ({ banner }) => {
  return (
    <Carousel
      className="relative h-full"
      // @ts-expect-error
      plugins={[Fade(), Autoplay({ delay: 5000 })]}
    >
      <CarouselContent className="h-full">
        {banner.map(bnr => (
          <CarouselItem key={bnr.url}>
            <Banner banner={bnr} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="absolute bottom-0 left-1/2 -translate-x-1/2 p-3" />
    </Carousel>
  );
};
