import React from 'react';
import {
  PageSectionUpperTitle,
  PageSectionPrimaryTitle,
  PageSection,
} from '@/shared/components/PageSection/PageSection';
import { getFlashSales, ItemCard } from '@/entities/Item';
import {
  CarouselContentLandingPage,
  CarouselControlButtonsLandingPage,
  CarouselItemLandingPage,
  CarouselLandingPage,
} from '@/shared/components';
import { FlashSalesTimer } from '@/features/FlashSalesTimer';
import { Button, Container } from '@/shared/ui';
import Link from 'next/link';

type Props = {};

export const FlashSales: React.FC<Props> = async () => {
  const flashSalesItems = await getFlashSales();

  return (
    <Container type="fluid">
      <div className="overflow-hidden pl-4 [@media(min-width:1202px)]:pl-[calc((100%-1202px)/2+1rem)]">
        <PageSection className="py-0 lg:py-0">
          <PageSectionUpperTitle
            title="Today's"
            className="mb-3"
          />
          <PageSectionPrimaryTitle
            title="Flash sales"
            className="flex-wrap items-end justify-start gap-4"
          >
            <div className="sm:ml-20">
              <FlashSalesTimer
                deadline={
                  flashSalesItems.ok ? flashSalesItems.data.timerEnds : '0'
                }
              />
            </div>
          </PageSectionPrimaryTitle>
          <CarouselLandingPage>
            <CarouselContentLandingPage className="-ml-[30px]">
              {flashSalesItems.ok &&
                flashSalesItems.data.items.map(item => (
                  <CarouselItemLandingPage
                    key={item.id}
                    className="flex basis-full justify-center pl-[15px] sm:basis-[300px] sm:justify-start
                      sm:pl-[30px]"
                  >
                    <ItemCard item={item} />
                  </CarouselItemLandingPage>
                ))}
            </CarouselContentLandingPage>
            <CarouselControlButtonsLandingPage
              className="absolute -top-8 right-4 flex -translate-y-full gap-2 md:-top-10 lg:-top-14
                [@media(min-width:1202px)]:right-[calc((100%-1202px)+32px)]"
            />
          </CarouselLandingPage>
        </PageSection>
      </div>
      <div className="-ml-4 flex justify-center py-[30px] lg:py-[60px]">
        <Button asChild>
          <Link
            href="/flash-sales"
            className="px-12 py-4"
          >
            View All Products
          </Link>
        </Button>
      </div>
    </Container>
  );
};
