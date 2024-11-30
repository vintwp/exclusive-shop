/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import {
  Category,
  createCategory,
  deleteCategory,
  updateCategory,
  CategorySubmit,
} from '@/entities/Category';
import {
  AdminDataTable,
  useAdminDataTable,
  useAdminDataTableModal,
} from '@/shared/components';
import { Button, useToast } from '@/shared/ui';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  createMultipartFormData,
  createValuesFromMultiselect,
} from '@/shared/lib';
import { CategoryModal } from './CategoryModal';
import { columns } from '../models';

type Props = {
  data: Category[];
};

export const DataTable: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const { table, editRowId, deleteRowId, clearRowIds } =
    useAdminDataTable<Category>(data, columns);

  const { open, setOpen } = useAdminDataTableModal(editRowId);

  const handleOnOpenChange = (value: boolean) => {
    if (!value) {
      clearRowIds();
    }

    setOpen(value);
  };

  const handleCreateCategory = async (dataCategory: CategorySubmit) => {
    const formData = await createMultipartFormData(
      {
        name: dataCategory.name,
        primaryStoreId: dataCategory.primaryStoreId,
        displayOnMainPage: dataCategory.displayOnMainPage,
      },
      dataCategory.image,
    );

    const category = await createCategory(formData);

    if (category.ok) {
      toast({
        description: `${dataCategory.name} store was created`,
      });

      setOpen(false);
      router.refresh();
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setLoading(true);

    await deleteCategory(id);

    toast({
      description: 'Store was deleted',
    });

    router.refresh();

    setLoading(false);
  };

  const handleEditCategory = async (dataCategory: CategorySubmit) => {
    const formData = await createMultipartFormData(
      {
        name: dataCategory.name,
        primaryStoreId: dataCategory.primaryStoreId,
        displayOnMainPage: dataCategory.displayOnMainPage,
        additionalStoreId: createValuesFromMultiselect(
          dataCategory.additionalStores,
        ),
      },
      dataCategory.image,
    );

    const category = await updateCategory(dataCategory?.id || '', formData);

    if (category.ok) {
      toast({
        description: `${dataCategory.name} store was updated`,
      });

      setOpen(false);
      router.refresh();
    }

    clearRowIds();
  };

  useEffect(() => {
    if (deleteRowId) {
      handleDeleteCategory(deleteRowId);
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
      <CategoryModal
        open={open}
        onOpenChange={handleOnOpenChange}
        handleCreate={handleCreateCategory}
        handleEdit={handleEditCategory}
        editId={editRowId}
      />
    </div>
  );
};
