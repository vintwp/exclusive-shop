import React from 'react';
import { Input } from '@/shared/ui';
import { Search } from 'lucide-react';
import { cn } from '@/shared/lib';

type Props = {
  className?: string;
};

export const SearchProduct: React.FC<Props> = ({ className }) => {
  return (
    <Input
      EndAdornment={<Search />}
      placeholder="What are you looking for?"
      className={cn('bg-clr-secondary-2', className)}
    />
  );
};
