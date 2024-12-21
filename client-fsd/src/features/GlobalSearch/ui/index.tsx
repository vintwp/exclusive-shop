import React from 'react';

import { Search } from './Search';
import { getSearchResult } from '../api';

type Props = {
  className?: string;
};

export const GlobalSearch: React.FC<Props> = async ({ className }) => {
  const handleSearch = async (query: string) => {
    'use server';

    const req = await getSearchResult(query);

    if (req.ok) {
      return req.data;
    }

    return [];
  };

  return (
    <div className={className}>
      <Search handleSearch={handleSearch} />
    </div>
  );
};
