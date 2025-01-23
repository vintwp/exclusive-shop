import React from 'react';
import {
  PageSectionUpperTitle,
  PageSectionPrimaryTitle,
  PageSection,
} from '@/shared/components/PageSection/PageSection';
import { Button, Container } from '@/shared/ui';
import Link from 'next/link';
import { getBestSelling, ItemCard } from '@/entities/Item';
import {
  CarouselContentLandingPage,
  CarouselItemLandingPage,
  CarouselLandingPage,
} from '@/shared/components';

type Props = {};

export const BestSellers: React.FC<Props> = async () => {
  const bestSellingItems = await getBestSelling(4);

  return (
    <Container>
      <PageSection>
        <PageSectionUpperTitle title="This Month" />
        <PageSectionPrimaryTitle
          title="Best Selling Products"
          className="items-center"
        >
          <Button asChild>
            <Link
              href="/best-sellers"
              className="px-12"
            >
              View All
            </Link>
          </Button>
        </PageSectionPrimaryTitle>
        <CarouselLandingPage>
          <CarouselContentLandingPage className="-ml-[30px]">
            {bestSellingItems.ok &&
              bestSellingItems.data.map(item => (
                <CarouselItemLandingPage
                  key={item.id}
                  className="flex basis-full justify-center pl-[15px] sm:basis-[300px] sm:justify-start
                    sm:pl-[30px]"
                >
                  <ItemCard item={item} />
                </CarouselItemLandingPage>
              ))}
          </CarouselContentLandingPage>
        </CarouselLandingPage>
      </PageSection>
    </Container>
  );
};
