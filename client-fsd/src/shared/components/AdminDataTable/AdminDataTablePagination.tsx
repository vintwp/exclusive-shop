import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/shared/ui';
import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import React from 'react';

type Props<T> = {
  table: Table<T>;
  disabled?: boolean;
  multipleDelete?: boolean;
};

export function AdminDataTablePagination<T>({
  table,
  disabled = false,
  multipleDelete = false,
}: Props<T>) {
  return (
    <div className="mt-2 flex min-h-2 w-full items-center justify-between gap-4 px-4 py-2">
      <div className="flex-1 text-xs text-clr-text-2/50">
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div>
        {multipleDelete && table.getFilteredSelectedRowModel().rows.length ? (
          <Button
            size="xxs"
            className="text-xxs text-white"
          >
            Delete Selected
          </Button>
        ) : null}
      </div>
      <Separator
        orientation="vertical"
        className="h-4"
      />
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-xxs font-medium">Per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => {
              table.setPageSize(Number(value));
            }}
            disabled={disabled}
          >
            <SelectTrigger className="h-auto w-max gap-1 p-1 text-sm">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 40].map(pageSize => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="h-4"
      />
      <div className="flex gap-2 text-xxs">
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            className="hidden h-6 w-6 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage() || disabled}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || disabled}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || disabled}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-6 w-6 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage() || disabled}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="flex items-center justify-center font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
