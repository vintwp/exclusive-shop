import { Category } from '@/entities/Category';
import { DOMAIN } from '@/shared/config';
import { cn } from '@/shared/lib';
import React from 'react';

type Props = {
  category: Category;
};

export const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div
      className="group flex h-full cursor-pointer flex-col justify-center rounded-sm border-2
        border-black/30 px-2 py-2 transition-colors hover:border-clr-secondary-3
        hover:bg-clr-secondary-3 hover:text-white lg:py-6"
    >
      <div className="mx-auto mb-4 h-[56px] w-[56px] p-[3px]">
        <div
          style={{
            maskSize: 'cover',
            mask: `url(${DOMAIN}/${category.image})`,
            WebkitMaskSize: 'cover',
          }}
          className={cn(
            'hover h-[56px] w-[56px] bg-black transition-colors group-hover:bg-white',
          )}
        />
      </div>

      <p className="truncate text-center leading-normal">{category.name}</p>
    </div>
  );
};
