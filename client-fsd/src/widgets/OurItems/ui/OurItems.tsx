import React from 'react';
import Link from 'next/link';
import { getOurItems } from '@/entities/Item';
import { PageSection } from '@/shared/components';
import { Button, Container } from '@/shared/ui';
import { OurItemsCarousel } from './OurItemsCarousel';

type Props = {};

export const OurItems: React.FC<Props> = async () => {
  const ourItems = await getOurItems(10);
  const itemsToRender = ourItems.ok ? ourItems.data : [];

  return (
    <Container>
      <PageSection>
        <PageSection.Header>
          <PageSection.Titles>
            <PageSection.UpperTitle>Our Products</PageSection.UpperTitle>
            <PageSection.PrimaryTitle>
              Explore Our Products
            </PageSection.PrimaryTitle>
          </PageSection.Titles>
        </PageSection.Header>
        <OurItemsCarousel items={itemsToRender} />
        <div className="mt-7 flex justify-center md:mt-14">
          <Button asChild>
            <Link href="our-products">View All Products</Link>
          </Button>
        </div>
      </PageSection>
    </Container>
  );
};
