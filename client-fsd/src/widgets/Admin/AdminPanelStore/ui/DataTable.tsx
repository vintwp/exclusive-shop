/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

'use client';

import React, { useEffect, useState } from 'react';

import { createStore, deleteStore, Store, updateStore } from '@/entities/Store';

import { useRouter } from 'next/navigation';
import { Button, useToast } from '@/shared/ui';
import {
  useAdminDataTable,
  AdminDataTable,
  useAdminDataTableModal,
} from '@/shared/components';
import { StoreModal } from './StoreModal';

export const dataForColumns = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
];

type Props = {
  data: Store[];
};

export const DataTable: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState<boolean>(false);

  const { table, editRowId, deleteRowId, clearRowIds } =
    useAdminDataTable<Store>(data, dataForColumns);

  const { open, setOpen } = useAdminDataTableModal(editRowId);

  const handleDeleteStore = async (id: string) => {
    setLoading(true);
    await deleteStore(id);
    toast({
      description: 'Store was deleted',
    });
    router.refresh();
    setLoading(false);
  };

  const handleCreateStore = async (name: string) => {
    const store = await createStore(name);

    if (store.ok) {
      toast({
        description: `${name} store was created`,
      });
      setOpen(false);
      router.refresh();
    }
  };

  const handleEditStore = async (dataStore: Pick<Store, 'id' | 'name'>) => {
    const store = await updateStore(dataStore);

    if (store.ok) {
      toast({
        description: `${store.data.name} store was updated`,
      });
      setOpen(false);
      clearRowIds();
      router.refresh();
    }

    setOpen(false);
  };

  const handleOnOpenChange = (value: boolean) => {
    if (!value) {
      clearRowIds();
    }

    setOpen(value);
  };

  useEffect(() => {
    if (deleteRowId) {
      handleDeleteStore(deleteRowId);
    }
  }, [deleteRowId]);

  return (
    <div className="relative">
      <AdminDataTable
        table={table}
        loading={loading}
        multipleDelete={false}
      />
      <div className="mt-2">
        <Button
          size="xxs"
          onClick={() => setOpen(true)}
        >
          Create +
        </Button>
      </div>

      <StoreModal
        open={open}
        onOpenChange={handleOnOpenChange}
        handleCreate={handleCreateStore}
        handleEdit={handleEditStore}
        editId={editRowId}
      />
    </div>
  );
};
