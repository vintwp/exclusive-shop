import React from 'react';
import { cn } from '@/shared/lib';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/ui';

const carouselButtonStyle =
  'static translate-x-0 translate-y-0 border-clr-secondary-2 bg-clr-secondary-2 hover:bg-clr-secondary-2/80';

type ItemCarouselProps = {
  children: React.ReactNode;
};

const ItemsCarousel: React.FC<ItemCarouselProps> = ({ children }) => (
  <Carousel
    opts={{
      align: 'start',
    }}
    className="w-full"
  >
    {children}
  </Carousel>
);

type ItemCarouselContentProps = {
  children: React.ReactNode;
  className?: string;
  showItemsBorder?: boolean;
};

const ItemsCarouselContent: React.FC<ItemCarouselContentProps> = ({
  className,
  showItemsBorder = false,
  children,
}) => (
  <CarouselContent
    parentClassName={cn(
      showItemsBorder && '-ml-[10px] w-[calc(100%+20px)] p-[10px]',
    )}
    className={cn('-ml-[15px] h-full sm:-ml-[30px]', className)}
  >
    {children}
  </CarouselContent>
);

type ItemCarouselControlProps = {
  className?: string;
};

const ItemsCarouselControl: React.FC<ItemCarouselControlProps> = ({
  className,
}) => (
  <div
    className={cn(
      'absolute -top-8 right-0 flex -translate-y-full gap-2 md:-top-10 lg:-top-14',
      className,
    )}
  >
    <CarouselPrevious className={carouselButtonStyle} />
    <CarouselNext className={carouselButtonStyle} />
  </div>
);

type ItemCarouselItemProps = {
  children: React.ReactNode;
  variant?: 'card' | 'default';
  className?: string;
};

const ItemsCarouselItem: React.FC<ItemCarouselItemProps> = ({
  variant = 'default',
  children,
  className,
}) => (
  <CarouselItem
    className={cn(
      variant === 'default' && 'basis-1/2 pl-[30px] md:basis-1/3 lg:basis-1/6',
      variant === 'card' &&
        `flex basis-full justify-center pl-[15px] sm:basis-[300px] sm:justify-start
        sm:pl-[30px]`,

      className,
    )}
  >
    {children}
  </CarouselItem>
);

export {
  ItemsCarousel,
  ItemsCarouselContent,
  ItemsCarouselControl,
  ItemsCarouselItem,
};
