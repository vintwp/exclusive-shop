import React from 'react';
import { ItemCard, TItem } from '@/entities/Item';
import {
  ItemsCarousel,
  ItemsCarouselContent,
  ItemsCarouselControl,
  ItemsCarouselItem,
} from '@/shared/components';

type Props = {
  items: TItem[];
};

export const OurItemsCarousel: React.FC<Props> = ({ items }) => {
  const slidesToRender = items.reduce(
    (total, item, idx) => {
      if (idx === 0) {
        total.push([item]);

        return total;
      }

      if (total[total.length - 1].length < 2) {
        const itemToAdd = [...total[total.length - 1], item];

        total.splice(total.length - 1, 1, itemToAdd);

        return total;
      }

      total.push([item]);

      return total;
    },
    [] as Array<Array<TItem>>,
  );

  return (
    <ItemsCarousel>
      <ItemsCarouselContent showItemsBorder>
        {slidesToRender.map((itemsToRender, idx) => (
          <ItemsCarouselItem
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            variant="card"
          >
            <div className="flex w-full flex-col items-center gap-6 md:gap-14">
              {itemsToRender.map(item => (
                <ItemCard
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </ItemsCarouselItem>
        ))}
      </ItemsCarouselContent>
      <ItemsCarouselControl />
    </ItemsCarousel>
  );
};
