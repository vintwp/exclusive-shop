import React from 'react';
import Link from 'next/link';
import { PageSection } from '@/shared/components';
import { Button, Container } from '@/shared/ui';
import { getBestSelling } from '@/entities/Item';
import { BestSellersCarousel } from './BestSellersCarousel';

type Props = {};

export const BestSellers: React.FC<Props> = async () => {
  const bestSellingItems = await getBestSelling();
  const itemsToRender = bestSellingItems.ok ? bestSellingItems.data : [];

  return (
    <Container>
      <PageSection>
        <PageSection.Header className="justify-between">
          <PageSection.Titles>
            <PageSection.UpperTitle>This Month</PageSection.UpperTitle>
            <PageSection.PrimaryTitle>
              Best Selling Products
            </PageSection.PrimaryTitle>
          </PageSection.Titles>
          <Button asChild>
            <Link
              href="/best-sellers"
              className="px-12"
            >
              View All
            </Link>
          </Button>
        </PageSection.Header>
        <BestSellersCarousel items={itemsToRender} />
      </PageSection>
    </Container>
  );
};
