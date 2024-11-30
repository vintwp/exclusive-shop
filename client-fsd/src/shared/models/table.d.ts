/* eslint-disable @typescript-eslint/no-unused-vars */
import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    deleteData?: (id: string) => void;
    editData?: (id: string) => void;
    editableRowId?: string;
  }

  interface ColumnMeta<TData extends RowData, TValue> {
    openEditWindow?: boolean;
  }
}
