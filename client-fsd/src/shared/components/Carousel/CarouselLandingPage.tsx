import React from 'react';
import { cn } from '@/shared/lib';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

type CarouselLandingPageProps = {
  children: React.ReactNode;
};

const carouselButtonStyle =
  'static translate-x-0 translate-y-0 border-clr-secondary-2 bg-clr-secondary-2 hover:bg-clr-secondary-2/80';

export const CarouselLandingPage: React.FC<CarouselLandingPageProps> = ({
  children,
}) => {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      {children}
    </Carousel>
  );
};

type CarouselContentProps = {
  children: React.ReactNode;
  className?: string;
};

export const CarouselContentLandingPage: React.FC<CarouselContentProps> = ({
  children,
  className,
}) => {
  return <CarouselContent className={className}>{children}</CarouselContent>;
};

type CarouselItemLandingPageProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  className?: string;
};

export const CarouselItemLandingPage: React.FC<
  CarouselItemLandingPageProps
> = ({ children, className }) => {
  return <CarouselItem className={className}>{children}</CarouselItem>;
};

type CarouselControlButtonsLandingPageProps =
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
  };
export const CarouselControlButtonsLandingPage: React.FC<
  CarouselControlButtonsLandingPageProps
> = ({ className }) => {
  return (
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
};
