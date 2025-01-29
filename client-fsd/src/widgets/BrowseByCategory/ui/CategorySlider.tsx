'use client';

import React, { useEffect, useState } from 'react';
import { Category } from '@/entities/Category';
import {
  ItemsCarousel,
  ItemsCarouselContent,
  ItemsCarouselControl,
  ItemsCarouselItem,
} from '@/shared/components';

import { CategoryCard } from './CategoryCard';

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
    <ItemsCarousel>
      <ItemsCarouselContent>
        {categoriesToRender.map(cat => (
          <ItemsCarouselItem key={cat.name}>
            <CategoryCard category={cat} />
          </ItemsCarouselItem>
        ))}
      </ItemsCarouselContent>
      <ItemsCarouselControl />
    </ItemsCarousel>
  );
};
