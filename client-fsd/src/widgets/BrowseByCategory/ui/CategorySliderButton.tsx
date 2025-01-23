import { CarouselNext, CarouselPrevious } from '@/shared/components';
import React from 'react';

type Props = {
  type: 'previous' | 'next';
};

const styles =
  'static translate-x-0 translate-y-0 border-clr-secondary-2 bg-clr-secondary-2 hover:bg-clr-secondary-2/80';

export const CategorySliderButton: React.FC<Props> = ({ type }) => {
  if (type === 'previous') {
    return <CarouselPrevious className={styles} />;
  }

  return <CarouselNext className={styles} />;
};
