import React from 'react';
import { PageSection } from '@/shared/components/PageSection/PageSection';
import { getFlashSales } from '@/entities/Item';
import { Container } from '@/shared/ui';
import { Timer } from './Timer';
import { FlashSalesCarousel } from './FlashSalesCarousel';

type Props = {};

export const FlashSales: React.FC<Props> = async () => {
  const flashSalesItems = await getFlashSales();
  const itemsToRender = flashSalesItems.ok ? flashSalesItems.data.items : [];
  const timerEnds = flashSalesItems.ok ? flashSalesItems.data.timerEnds : '';

  return (
    <Container
      type="fluid"
      align="left"
    >
      <PageSection className="pt-0 lg:pt-0">
        <PageSection.Header className="flex flex-wrap gap-4 [@media(min-width:468px)]:flex-nowrap">
          <PageSection.Titles className="flex-[1_1_100%] [@media(min-width:468px)]:flex-[0_1_auto]">
            <PageSection.UpperTitle>Today&apos;s</PageSection.UpperTitle>
            <PageSection.PrimaryTitle className="leading-none">
              Flash sales
            </PageSection.PrimaryTitle>
          </PageSection.Titles>
          <Timer timerEnds={timerEnds} />
        </PageSection.Header>
        <FlashSalesCarousel items={itemsToRender} />
      </PageSection>
    </Container>
  );
};
