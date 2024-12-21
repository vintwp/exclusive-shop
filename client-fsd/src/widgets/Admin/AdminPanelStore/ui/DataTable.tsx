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
    const res = await deleteStore(id);

    if (res.ok) {
      toast({
        variant: 'successful',
        description: res.message || 'Store was deleted',
      });
    }

    if (!res.ok) {
      toast({
        variant: 'destructive',
        title: `Code : ${res.status}`,
        description: res.message,
      });
    }

    setLoading(false);
    clearRowIds();
    router.refresh();
  };

  const handleCreateStore = async (name: string) => {
    const store = await createStore(name);

    if (store.ok) {
      toast({
        variant: 'successful',
        description: 'Store was deleted',
      });
    }

    if (!store.ok) {
      toast({
        variant: 'destructive',
        title: `Code : ${store.status}`,
        description: store.message,
      });
    }

    setOpen(false);
    router.refresh();
  };

  const handleEditStore = async (dataStore: Pick<Store, 'id' | 'name'>) => {
    const store = await updateStore(dataStore);

    if (store.ok) {
      toast({
        variant: 'successful',
        description: 'Store was updated',
      });
    }

    if (!store.ok) {
      toast({
        variant: 'destructive',
        title: `Code : ${store.status}`,
        description: store.message,
      });
    }

    setOpen(false);
    setLoading(false);
    clearRowIds();
    router.refresh();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
