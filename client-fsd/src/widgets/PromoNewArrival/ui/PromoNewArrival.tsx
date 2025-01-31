import { getPromoNewArrival } from '@/entities/Promo';
import { PageSection } from '@/shared/components';
import { DOMAIN } from '@/shared/config';
import { cn } from '@/shared/lib';
import { Container } from '@/shared/ui';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const styles = cn(
  'relative flex p-6 bg-black text-white group hover:pointer overflow-hidden',
  'md:first:col-span-2 md:first:row-span-2',
  'md:[&:nth-child(2)]:col-span-2',
  'md:[&:nth-child(3)]:col-span-1',
  'md:[&:nth-child(4)]:col-span-1',
);

export const PromoNewArrival: React.FC<Props> = async () => {
  const newArrivals = await getPromoNewArrival();

  return newArrivals.ok ? (
    <Container>
      <PageSection>
        <PageSection.Header>
          <PageSection.Titles>
            <PageSection.UpperTitle>Featured</PageSection.UpperTitle>
            <PageSection.PrimaryTitle>New Arrival</PageSection.PrimaryTitle>
          </PageSection.Titles>
        </PageSection.Header>
        <div
          className={cn(
            'grid gap-4 md:gap-[30px]',
            'md:grid-cols-4',
            'grid-flow-row auto-rows-[minmax(285px,1fr)]',
          )}
        >
          {newArrivals.data.map(itm => (
            <div
              key={itm.title}
              className={styles}
            >
              <div className="z-10 mt-auto flex flex-col gap-2 md:gap-4">
                <h4 className="text-xl font-semibold leading-none tracking-wider md:text-2xl md:leading-none">
                  {itm.title}
                </h4>
                <p className="text-xxs font-light md:text-sm">{itm.text}</p>
                <Link
                  href={itm.url}
                  className={cn(
                    'group font-semibold leading-6 underline underline-offset-[6px]',
                    `decoration-clr-text-2 after:absolute after:left-0 after:top-0 after:h-full
                      after:w-full after:content-[""]`,
                  )}
                >
                  Shop Now
                </Link>
              </div>
              <Image
                src={`${DOMAIN}/${itm.image}`}
                alt={itm.title}
                fill
                className="scale-[1.1] object-cover transition-all group-hover:scale-[1]"
              />
            </div>
          ))}
        </div>
      </PageSection>
    </Container>
  ) : null;
};
