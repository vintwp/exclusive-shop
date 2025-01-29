import { ItemCard, TItem } from '@/entities/Item';
import {
  ItemsCarousel,
  ItemsCarouselContent,
  ItemsCarouselItem,
} from '@/shared/components';
import React from 'react';

type Props = {
  items: TItem[];
};

export const BestSellersCarousel: React.FC<Props> = ({ items }) => {
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
    </ItemsCarousel>
  );
};
