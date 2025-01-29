import React from 'react';
import { PageSection } from '@/shared/components/PageSection/PageSection';
import { getCategory } from '@/entities/Category';
import { Container } from '@/shared/ui';
import { CategorySlider } from './CategorySlider';

type Props = {};

export const BrowseByCategory: React.FC<Props> = async () => {
  const categories = await getCategory();

  return (
    <Container>
      <PageSection className="border-b-[1px] border-t-[1px]">
        <PageSection.Header>
          <PageSection.Titles>
            <PageSection.UpperTitle>Categories</PageSection.UpperTitle>
            <PageSection.PrimaryTitle>
              Browse By Category
            </PageSection.PrimaryTitle>
          </PageSection.Titles>
        </PageSection.Header>
        <CategorySlider categories={categories.ok ? categories.data : []} />
      </PageSection>
    </Container>
  );
};
