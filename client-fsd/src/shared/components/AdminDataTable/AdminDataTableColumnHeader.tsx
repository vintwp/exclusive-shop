import { Column } from '@tanstack/react-table';
import { Button } from '@/shared/ui';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/shared/lib';

import React from 'react';

type Props<T, P> = {
  column: Column<T, P>;
  title: string;
  className?: string;
};

export function AdminDataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Props<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleClick = () => {
    const currentFilter = column.getIsSorted();

    if (currentFilter === 'desc') {
      column.toggleSorting(undefined);

      return;
    }

    column.toggleSorting();
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="data-[state=open]:bg-accent -ml-3 h-8 hover:bg-transparent hover:text-black/50"
        onClick={handleClick}
      >
        <span>{title}</span>
        <ChevronsUpDown
          className={cn(
            'ml-1 h-3 w-3',
            column.getIsSorted() === 'desc' &&
              '[&>*:nth-child(2)]:text-transparent',
            column.getIsSorted() === 'asc' &&
              '[&>*:nth-child(1)]:text-transparent',
          )}
        />
      </Button>
    </div>
  );
}
