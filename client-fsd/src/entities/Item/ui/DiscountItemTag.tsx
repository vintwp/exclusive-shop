import React from 'react';

type Props = {
  discount: number;
};

export const DiscountItemTag: React.FC<Props> = ({ discount }) => {
  return discount ? (
    <div className="rounded-sm bg-clr-secondary-3 px-3 py-1 text-xs leading-none text-white">
      -{discount}%
    </div>
  ) : null;
};
