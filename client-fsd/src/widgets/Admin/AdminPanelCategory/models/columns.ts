import { Category } from '@/entities/Category';

export const columns = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'primaryStore',
    header: 'Primary Store',
    cell: ({ row }) => {
      const stores = row.original as Category;

      return stores.primaryStore.name;
    },
  },
  {
    accessorKey: 'additionalStores',
    header: 'Additional Stores',
    cell: ({ row }) => {
      const stores = row.original as Category;

      if (!stores.additionalStores) {
        return '-';
      }

      return stores.additionalStores.map(val => val.name).join(', ');
    },
  },
  {
    accessorKey: 'displayOnMainPage',
    header: 'Display on main',
  },
];
