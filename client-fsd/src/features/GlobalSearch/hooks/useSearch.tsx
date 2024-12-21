'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export const useSearch = (queryString: string) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce(queryString, 1000);

  return [debouncedQuery];
};
