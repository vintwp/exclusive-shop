import React from 'react';
import { getStore } from '@/entities/Store';
import { DataTable } from './DataTable';

export const AdminPanelStore: React.FC = async () => {
  const stores = await getStore();

  return (
    <div className="flex flex-col">
      <DataTable data={stores.ok ? stores.data : []} />
    </div>
  );
};
