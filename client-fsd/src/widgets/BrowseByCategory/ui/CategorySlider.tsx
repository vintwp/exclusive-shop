'use client';

import React, { useEffect, useState } from 'react';
import { Category } from '@/entities/Category';
import { Carousel, CarouselContent, CarouselItem } from '@/shared/ui';
import Link from 'next/link';
import { CategoryCard } from './CategoryCard';
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
    <Carousel className="w-full">
      <CarouselContent className="-ml-[30px]">
        {categoriesToRender.map(cat => (
          <CarouselItem
            key={cat.name}
            className="basis-1/2 self-stretch pl-[30px] md:basis-1/3 lg:basis-1/6"
          >
            <Link href={`${cat.primaryStore.url}/${cat.url}`}>
              <CategoryCard category={cat} />
            </Link>
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
