'use client';

import { useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { Checkbox } from '@/shared/ui';
import { AdminDataTableRowActions } from '../AdminDataTableRowActions';

export const useAdminDataTable = <T extends { id: string }>(
  data: T[],
  columnsData: Array<ColumnDef<T>>,
) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [editRowId, setEditRowId] = useState<string>('');
  const [deleteRowId, setDeleteRowId] = useState<string>('');
  const selectedRows = Object.keys(rowSelection).map(rowId => rowId);

  const columns = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columnsData,
    {
      id: 'actions',
      cell: ({ row }) => {
        const handleDelete = () => {
          setDeleteRowId(row.original.id);
        };

        const handleEdit = () => {
          setEditRowId(row.original.id);
        };

        return (
          <div className="flex justify-center">
            <AdminDataTableRowActions
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </div>
        );
      },
    },
  ] as Array<ColumnDef<T>>;

  const clearRowIds = () => {
    setEditRowId('');
    setDeleteRowId('');
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: row => row.id, // for selected rows took rowId from DB instead rowId in table
  });

  return { table, editRowId, deleteRowId, clearRowIds, selectedRows };
};
