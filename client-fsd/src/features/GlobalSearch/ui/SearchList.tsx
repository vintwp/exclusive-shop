import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Spinner,
} from '@/shared/ui';
import React from 'react';
import Link from 'next/link';
import { TSearch } from '../models/TSearch';

type Props = {
  query: string;
  items?: TSearch[];
  loading?: boolean;
};

export const SearchList: React.FC<Props> = ({
  query,
  items = [],
  loading = false,
}) => {
  const listRender = () => {
    switch (true) {
      case query.length > 0 && items.length === 0:
        return <p className="py-4 text-clr-text-2">No results found.</p>;
      case query.length > 0 && items.length > 0:
        return (
          <ul className="flex flex-col gap-2 py-4 text-clr-text-2">
            {items.map(item => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="block w-full hover:text-clr-button-hov hover:underline"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        );
      case loading:
        return (
          <div className="py-4">
            <Spinner
              size="medium"
              className="text-clr-text-2"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return listRender();
};
