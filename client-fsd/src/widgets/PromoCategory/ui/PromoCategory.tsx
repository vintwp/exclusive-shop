import React from 'react';
import Link from 'next/link';
import { Button, Container } from '@/shared/ui';
import { getPromoCategory } from '@/entities/Promo';
import { DOMAIN } from '@/shared/config';
import { PromoCategoryTimer } from './PromoCategoryTimer';
import { PromoCategoryImage } from './PromoCategoryImage';

type Props = {};

export const PromoCategory: React.FC<Props> = async () => {
  const category = await getPromoCategory();

  return category.ok ? (
    <Container>
      <div className="flex justify-between gap-7 bg-black px-3 py-4 text-white md:px-14 md:py-16">
        <div className="w-full basis-full md:max-w-[450px] md:basis-1/2">
          <p className="mb-6 text-base leading-tight text-clr-button sm:mb-8">
            Categories
          </p>
          <h3 className="text-3xl leading-tight tracking-wider lg:text-5xl lg:leading-tight">
            {category.data.text}
          </h3>
          <PromoCategoryTimer
            timerEnds={category.data.timerEnds}
            className="mx-auto mb-10 mt-8 w-full sm:mx-0"
          />
          <Button
            asChild
            className="mx-auto block w-[max-content] bg-clr-button px-12 py-4 hover:bg-clr-button/75
              sm:mx-0"
          >
            <Link href="/speakers">Buy Now</Link>
          </Button>
        </div>
        <PromoCategoryImage
          src={`${DOMAIN}/${category.data.image}`}
          alt="Speakers Promo"
        />
      </div>
    </Container>
  ) : null;
};
