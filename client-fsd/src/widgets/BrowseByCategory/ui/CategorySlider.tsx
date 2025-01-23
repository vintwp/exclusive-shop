'use client';

import React, { useEffect, useState } from 'react';
import { Category } from '@/entities/Category';
import { DOMAIN } from '@/shared/config';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/components';
import { cn } from '@/shared/lib';
import { CategorySliderButton } from './CategorySliderButton';

type Props = {
  categories: Category[];
};

export const CategorySlider: React.FC<Props> = ({ categories }) => {
  const [categoriesToRender, setCategoriesToRender] = useState<Category[]>([]);

  useEffect(() => {
    setCategoriesToRender(
      categories.filter(category => category.displayOnMainPage),
    );
  }, [categories]);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-[30px]">
        {categoriesToRender.map(cat => (
          <CarouselItem
            key={cat.name}
            className="basis-1/2 pl-[15px] md:basis-1/3 lg:basis-1/6"
          >
            <div className="pl-[15px]">
              <div
                className="group flex h-full cursor-pointer flex-col justify-center rounded-sm border-2
                  border-black/30 px-2 py-2 transition-colors hover:border-clr-secondary-3
                  hover:bg-clr-secondary-3 hover:text-white lg:py-6"
              >
                <div className="mx-auto mb-4 h-[56px] w-[56px] p-[3px]">
                  <div
                    style={{
                      maskSize: 'cover',
                      mask: `url(${DOMAIN}/${cat.image})`,
                      WebkitMaskSize: 'cover',
                    }}
                    className={cn(
                      'hover h-[56px] w-[56px] bg-black transition-colors group-hover:bg-white',
                    )}
                  />
                </div>

                <p className="truncate text-center leading-normal">
                  {cat.name}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute -top-8 right-0 flex -translate-y-full gap-2 md:-top-10 lg:-top-14">
        <CategorySliderButton type="previous" />
        <CategorySliderButton type="next" />
      </div>
    </Carousel>
  );
};
