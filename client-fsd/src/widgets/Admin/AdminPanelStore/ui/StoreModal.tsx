/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect } from 'react';
import { z } from 'zod';
import { FormInput } from '@/shared/components';
import { AdminDataTableModal } from '@/shared/components/AdminDataTable';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getStoreById, Store } from '@/entities/Store';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editId?: string;
  handleCreate?: (data: string) => Promise<void>;
  handleEdit?: (data: Pick<Store, 'id' | 'name'>) => Promise<void>;
};

const storeFormSchema = z.object({
  name: z.string().min(1),
});

type StoreFormSchemaType = z.infer<typeof storeFormSchema>;

export const StoreModal: React.FC<Props> = ({
  editId,
  open,
  onOpenChange,
  handleCreate,
  handleEdit,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
    setValue,
  } = useForm<StoreFormSchemaType>({
    resolver: zodResolver(storeFormSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<StoreFormSchemaType> = async data => {
    if (editId) {
      await handleEdit({
        id: editId,
        name: data.name,
      });
      reset();

      return;
    }

    await handleCreate(data.name);
    reset();
  };

  useEffect(() => {
    if (editId) {
      const getStore = async () => {
        const receivedStore = await getStoreById(editId);

        return receivedStore;
      };

      getStore()
        .then(res => {
          if (res.ok) {
            setValue('name', res.data.name);
          }
        })
        .catch(() => setValue('name', ''));
    }
  }, [editId]);

  return (
    <AdminDataTableModal
      title={`${editId ? 'Edit Store' : 'Create Store'}`}
      description="Create/Edit global store (clothes, electronics, appliances, etc.)"
      id="store"
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isSubmitting}
      isDisable={!isValid}
      submitButtonTitle={`${editId ? 'Save Changes' : 'Create'}`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="store"
      >
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <FormInput
                label=""
                type="text"
                onChange={onChange}
                value={value}
                error={errors.name?.message}
                placeholder="Enter new store name"
              />
            );
          }}
        />
      </form>
    </AdminDataTableModal>
  );
};
