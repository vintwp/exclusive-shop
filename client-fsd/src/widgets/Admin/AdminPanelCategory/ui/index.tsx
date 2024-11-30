import React from 'react';
import { getCategory } from '@/entities/Category';
import { DataTable } from './DataTable';

export const AdminPanelCategory: React.FC = async () => {
  const categories = await getCategory();

  return (
    <div className="flex flex-col">
      <DataTable data={categories.ok ? categories.data : []} />
    </div>
  );
};
