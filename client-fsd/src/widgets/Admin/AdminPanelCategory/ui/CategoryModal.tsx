/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import {
  FormInput,
  FileUpload,
  CheckboxLabeled,
  Overlay,
  MultipleSelector,
  createOptions,
  MultipleSelectorOption,
} from '@/shared/components';
import { AdminDataTableModal } from '@/shared/components/AdminDataTable';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getStore, Store } from '@/entities/Store';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { getCategoryById } from '@/entities/Category';
import { converUrlToFileObject, deleteProperty } from '@/shared/lib';
import { DOMAIN } from '@/shared/config';
import { CategorySubmit } from '@/entities/Category/model';
import { categoryFormSchema, TCategoryFormSchema } from '../types';

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editId?: string;
  handleCreate: (data: CategorySubmit) => Promise<void>;
  handleEdit?: (data: CategorySubmit) => Promise<void>;
};

export const CategoryModal: React.FC<Props> = ({
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
    getFieldState,
    formState: { errors, isSubmitting, isValid, isDirty },
    setValue,
    getValues,
  } = useForm<TCategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      primaryStoreId: undefined,
      additionalStores: [],
      displayOnMainPage: false,
      image: undefined,
    },
  });

  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TCategoryFormSchema> = async data => {
    if (editId) {
      const isNewIcon = getFieldState('image').isDirty;
      const dataToSubmit = isNewIcon ? data : deleteProperty(data, 'image');
      const additionalStores =
        data.additionalStores as MultipleSelectorOption[];

      if (!handleEdit) {
        return;
      }

      await handleEdit({
        id: editId,
        additionalStores,
        ...dataToSubmit,
      });

      reset();

      return;
    }

    if (!editId) {
      await handleCreate({
        ...data,
      });

      reset();
    }
  };

  useEffect(() => {
    if (editId) {
      setLoading(true);
      getCategoryById(editId)
        .then(res => {
          setValue('name', res.ok ? res.data.name : '');
          setValue('primaryStoreId', res.ok ? res.data.primaryStoreId : '');
          setValue(
            'displayOnMainPage',
            res.ok ? res.data.displayOnMainPage : false,
          );

          if (res.ok) {
            // add selected additional stores
            const addCategories = res.data.additionalStores.map(store => ({
              value: `${store.id}`,
              label: `${store.name}`,
            })) as MultipleSelectorOption[];

            setValue('additionalStores', addCategories);

            // add image to modal
            converUrlToFileObject(`${DOMAIN}/${res.data.image}`).then(
              resImg => {
                setValue('image', [resImg]);
              },
            );
          }
        })
        .catch(() => {
          setValue('name', '');
          setValue('primaryStoreId', '');
          setValue('displayOnMainPage', false);
        })
        .finally(() => {
          setLoading(false);
        });

      return;
    }

    reset();
  }, [editId]);

  useEffect(() => {
    const getStores = async () => {
      return getStore();
    };

    getStores().then(result => {
      if (result.ok) {
        setStores(result.data);
      }
    });
  }, []);

  return (
    <AdminDataTableModal
      title={`${editId ? 'Edit Category' : 'Create Category'}`}
      id="category"
      open={open}
      onOpenChange={onOpenChange}
      isLoading={isSubmitting}
      isDisable={!isValid || (!isValid && isDirty)}
      submitButtonTitle={`${editId ? 'Save Changes' : 'Create'}`}
    >
      {loading && <Overlay loading />}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="category"
      >
        <div className="flex flex-col gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <p className="mb-1 font-semibold">Category name:</p>
                  <FormInput
                    label=""
                    type="text"
                    onChange={onChange}
                    value={value}
                    error={errors.name?.message}
                    placeholder="Enter new category name"
                  />
                </div>
              );
            }}
          />

          <Controller
            name="primaryStoreId"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <p className="mb-1 font-semibold">Primary store:</p>
                  <Select
                    onValueChange={onChange}
                    value={value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a global store for category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {stores.map(store => (
                          <SelectItem
                            key={store.name}
                            value={store.id}
                          >
                            {store.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              );
            }}
          />

          <Controller
            name="additionalStores"
            control={control}
            render={({ field: { onChange, value } }) => {
              const opt = createOptions(stores, 'id', 'name', {
                id: getValues('primaryStoreId'),
              });

              return (
                <div>
                  <p className="mb-1 font-semibold">Additional stores</p>
                  <MultipleSelector
                    options={opt}
                    onChange={onChange}
                    value={value}
                  />
                </div>
              );
            }}
          />

          <Controller
            name="displayOnMainPage"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <CheckboxLabeled
                  onCheckedChange={onChange}
                  checked={value}
                  title="Display category on main page"
                />
              );
            }}
          />

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <FileUpload
                  allowedFiles="image"
                  title="Category Icon"
                  onChange={onChange}
                  files={value}
                  preview
                />
              );
            }}
          />
        </div>
      </form>
    </AdminDataTableModal>
  );
};
