import { ItemCard, TItem } from '@/entities/Item';
import {
  ItemsCarousel,
  ItemsCarouselContent,
  ItemsCarouselControl,
  ItemsCarouselItem,
} from '@/shared/components';
import { cn } from '@/shared/lib';
import React from 'react';

type Props = {
  items: TItem[];
};

export const FlashSalesCarousel: React.FC<Props> = ({ items }) => {
  return (
    <ItemsCarousel>
      <ItemsCarouselContent showItemsBorder>
        {items.map(item => (
          <ItemsCarouselItem
            key={item.id}
            variant="card"
          >
            <ItemCard item={item} />
          </ItemsCarouselItem>
        ))}
      </ItemsCarouselContent>
      <ItemsCarouselControl
        className={cn(
          'right-0',
          '[@media(min-width:1202px)]:right-[calc((100%-1202px)+32px)]',
          '[@media(max-width:468px)]:-top-20',
        )}
      />
    </ItemsCarousel>
  );
};
