/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/ui';
import { Search as IconSearch } from 'lucide-react';
import { cn } from '@/shared/lib';
import { useDebounce } from 'use-debounce';
import { SearchList } from './SearchList';
import { TSearch } from '../models/TSearch';

// #region Trigger and Close Button Styles
const closeButtonStyle = cn(
  'top-28',
  'p-0',
  '[&>button>svg]:h-6',
  '[&>button>svg]:w-6',
  '[&>button]:left-[calc(100%+0.5rem)]',
  '[&>button]:top-[0.5rem]',
  '[&>button]:h-6',
  '[&>button]:w-6',
  '[&>button]:text-clr-secondary-2',
  'focus:[&>button]:ring-0',
  'focus:[&>button]:ring-offset-0',
);

const searchButtonStyle = cn(
  'relative flex items-center gap-3 px-3 py-2',
  'rounded-md border-[1px]',
  'hover:[&:not(:focus-within)]:border-clr-primary/50',
  'focus-within:border-clr-primary/50',
  'focus:border-clr-primary/50',
  'transition-colors',
  'text-clr-primary',
  'w-full',
  'justify-between',
  'border-clr-secondary-2',
  'py-2',
  'bg-clr-secondary-2',
  'border-clr-secondary-2',
  'hover:bg-clr-secondary-2/70',
  'hover:border-red-200',
);
// #endregion

type Props = {
  handleSearch: (query: string) => Promise<TSearch[]>;
};

export const Search: React.FC<Props> = ({ handleSearch }) => {
  const [searchResult, setSearchResult] = useState<TSearch[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery] = useDebounce(query, 1000);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);

      handleSearch(debouncedQuery)
        .then(res => {
          setSearchResult(res);
        })
        .finally(() => {
          setIsSearching(false);
        });
    }
  }, [debouncedQuery]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full justify-end">
          {/* search string as button for large devices */}
          <Button
            variant="default"
            className={cn(
              searchButtonStyle,
              'hidden md:flex',
              'overflow-hidden',
            )}
          >
            <span className="truncate text-xs text-black/50">
              {debouncedQuery || 'What are you looking for?'}
            </span>
            <IconSearch className="flex-shrink-0" />
          </Button>

          {/* button search  for small devices */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <IconSearch />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className={closeButtonStyle}>
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
        <div className="relative">
          <Input
            EndAdornment={<IconSearch />}
            placeholder="What are you looking for?"
            className="min-w-[1px] border-none bg-clr-secondary-2"
            onChange={handleQueryChange}
            value={query}
          />
          <div className="absolute mt-2 w-full overflow-hidden bg-clr-secondary-2 md:rounded-md">
            <SearchList
              query={debouncedQuery}
              items={searchResult}
              loading={isSearching}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
