/* eslint-disable @typescript-eslint/indent */
import React from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { AdminDataTableWrapper } from './AdminDataTableWrapper';
import { AdminDataTablePagination } from './AdminDataTablePagination';
import { Overlay } from '../Overlay';

type Props<T> = {
  table: Table<T>;
  loading?: boolean;
  multipleDelete?: boolean;
};

export function AdminDataTable<T>({
  table,
  loading = false,
  multipleDelete = false,
}: Props<T>) {
  return (
    <div className="relative">
      <AdminDataTableWrapper>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    className="w-auto last:w-12 [&:nth-child(-n+2)]:w-12"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className="w-auto last:w-12 [&:nth-child(-n+2)]:w-12"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow className="px-2">No results.</TableRow>
          )}
        </TableBody>
        {loading && <Overlay loading />}
      </AdminDataTableWrapper>
      <AdminDataTablePagination
        table={table}
        disabled={loading}
        multipleDelete={multipleDelete}
      />
    </div>
  );
}
