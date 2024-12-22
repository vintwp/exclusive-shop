'use client';

import { Button, Spinner } from '@/shared/ui';
import React from 'react';
import Link from 'next/link';
import { useLocalStorage } from '@/shared/hooks';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib';
import { Overlay } from '@/shared/components';
import { relative } from 'path';
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
  const router = useRouter();
  const [recentlyQueries, setRecentlyQueries] = useLocalStorage<TSearch[]>(
    'searchQueries',
    [],
  );

  const handleClickLink = (
    e: React.MouseEvent<HTMLAnchorElement>,
    searchElement: TSearch,
  ) => {
    e.preventDefault();

    // add searched element to local storage
    setRecentlyQueries(currentlyQueries => {
      const hasCurrentQuery = currentlyQueries.find(
        q => q.id === searchElement.id,
      );

      if (hasCurrentQuery) {
        return [...currentlyQueries];
      }

      if (currentlyQueries.length > 10) {
        return [...currentlyQueries.slice(1), searchElement];
      }

      return [...currentlyQueries, searchElement];
    });

    router.push(searchElement.url);
  };

  const handleClearRecentlyQueries = () => {
    setRecentlyQueries([]);
  };

  const handleDeleteRecentlyQuery = (id: string) => {
    setRecentlyQueries(currentlyQueries => {
      return [...currentlyQueries.filter(q => q.id !== id)];
    });
  };

  const listRender = () => {
    switch (true) {
      case query.length > 0 && !loading && items.length === 0:
        return <p className="text-clr-text-2">No results found.</p>;
      case query.length > 0 && items.length > 0 && !loading:
        return (
          <ul className="flex flex-col gap-2 text-clr-text-2">
            {items.map(item => (
              <li key={item.id}>
                <Link
                  href={item.url}
                  className="block w-full hover:text-clr-button-hov hover:underline"
                  onClick={e => handleClickLink(e, item)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'realtive px-3',
        (loading || items.length || recentlyQueries.length) && 'py-4',
      )}
    >
      {loading && <Overlay loading />}

      {listRender()}

      {recentlyQueries.length > 0 && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-bold">Search History</span>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 font-light text-blue-400 hover:text-blue-200"
              onClick={handleClearRecentlyQueries}
            >
              Clear
            </Button>
          </div>
          <ul className="flex flex-col gap-1">
            {recentlyQueries.map(recentQuery => (
              <li
                className="flex items-center justify-between text-clr-text-2"
                key={recentQuery.id}
              >
                <Link
                  href={recentQuery.url}
                  className="hover:text-clr-button-hov hover:underline"
                >
                  {recentQuery.name}
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-3 w-3"
                  onClick={() => handleDeleteRecentlyQuery(recentQuery.id)}
                >
                  <X />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
