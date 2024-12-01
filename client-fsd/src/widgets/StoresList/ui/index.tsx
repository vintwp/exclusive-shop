import Link from 'next/link';
import React from 'react';
import { Store } from '@/entities/Store';

type Props = {
  stores: Store[];
};

export const StoresList: React.FC<Props> = ({ stores }) => {
  return (
    <div className="flex">
      <div className="border-r-[1px] border-clr-text-2/25 pb-12 pt-4 lg:pb-32 lg:pr-4 lg:pt-10">
        {stores.map(store => (
          <Link
            key={store.name}
            className="block capitalize transition-colors hover:text-clr-secondary-3
              [&:not(:last-child)]:mb-4"
            href={`${store.url}`}
          >
            {store.name}
          </Link>
        ))}
      </div>
      <div className="pb-12 pt-4 lg:pb-32 lg:pl-11 lg:pt-10">right</div>
    </div>
  );
};
