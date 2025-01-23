'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib';
import { OptionButton, Rating } from '@/shared/components';

import { DOMAIN } from '@/shared/config';
import Link from 'next/link';
import { Button } from '@/shared/ui';
import { IOption, TItem } from '../model';
import { NewItemTag } from './NewItemTag';
import { DiscountItemTag } from './DiscountItemTag';

type Props = {
  item: TItem;
};

export const ItemCard: React.FC<Props> = ({ item }) => {
  const renderOptions = () => {
    if (item.itemGroupOptions.COLOR) {
      return (
        <div className="relative flex gap-2">
          {item.itemGroupOptions.COLOR.map(opt => (
            <OptionButton
              key={opt.id}
              type="COLOR"
              href={opt.url}
              color={opt.COLOR[1]}
              active={opt.COLOR[0] === item.itemOptions.COLOR}
            />
          ))}
        </div>
      );
    }

    if (Object.keys(item.itemGroupOptions).length === 1) {
      const option = Object.keys(
        item.itemGroupOptions,
      )[0] as keyof typeof IOption;

      return (
        <div className="relative flex gap-2">
          {item.itemGroupOptions[option].map(opt => (
            <OptionButton
              key={opt.id}
              type="TEXT"
              href={opt.url}
              content={opt[option]}
              active={opt[option] === item.itemOptions[option]}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={cn(
        'group relative flex h-full w-full max-w-[270px] flex-col',
        `after:absolute after:-bottom-[7px] after:-left-[7px] after:-right-[7px]
        after:-top-[7px] after:z-[-1] after:border-clr-secondary-2 after:p-2
        after:content-[""] hover:after:border-[1px]`,
      )}
    >
      <div className="hover:cursor-pointer">
        <div
          className="relative mb-3 flex h-[250px] w-full max-w-[270px] items-center justify-center
            overflow-hidden rounded-sm bg-clr-secondary-2 p-3"
        >
          <Image
            src={`${DOMAIN}/${item.images[0]}`}
            width={149}
            height={149}
            alt={item.name}
          />
          <Button
            className="absolute bottom-0 left-0 z-50 w-full translate-y-full rounded-none bg-black/90
              py-3 text-xs text-white transition-all hover:bg-black group-hover:translate-y-0"
            onClick={() => alert('click add')}
          >
            Add to Cart
          </Button>
        </div>
        <Link
          href={`${item.url}`}
          className={cn(
            `mb-2 block min-h-12 text-base font-medium text-black underline-offset-2
            group-hover:underline`,
            "after:absolute after:inset-0 after:h-full after:w-full after:content-['']",
          )}
        >
          <span className="line-clamp-2">{item.name}</span>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          {item.priceDiscount < item.price && (
            <span className="text-clr-secondary-3">$ {item.priceDiscount}</span>
          )}
          <span
            className={cn(item.priceDiscount < item.price && 'line-through')}
          >
            $ {item.price}
          </span>
        </div>
        <div className="flex gap-2">
          <Rating
            style={{ maxWidth: 100 }}
            value={item.review.avgRating}
            readOnly
          />
          <span className="text-sm font-semibold leading-[20px] text-black/50">
            ({item.review.reviewsQty})
          </span>
        </div>
        {renderOptions()}
      </div>
      <div className="absolute left-3 top-3 flex flex-col gap-1">
        <NewItemTag isNew={item.isNew} />
        <DiscountItemTag discount={item.discount} />
      </div>
    </div>
  );
};
