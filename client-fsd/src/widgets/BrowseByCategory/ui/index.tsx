import React from 'react';
import {
  PageSectionUpperTitle,
  PageSectionPrimaryTitle,
  PageSection,
} from '@/shared/components/PageSection/PageSection';
import { getCategory } from '@/entities/Category';
import { CategorySlider } from './CategorySlider';

type Props = {};

export const BrowseByCategory: React.FC<Props> = async () => {
  const categories = await getCategory();

  return (
    <PageSection>
      <PageSectionUpperTitle title="Categories" />
      <PageSectionPrimaryTitle title="Browse By Category" />
      <CategorySlider categories={categories.ok ? categories.data : []} />
    </PageSection>
  );
};
