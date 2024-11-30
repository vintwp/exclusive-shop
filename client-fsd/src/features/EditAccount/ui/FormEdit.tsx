/* eslint-disable @typescript-eslint/naming-convention */

'use client';

import React, { useEffect, useState } from 'react';
import { ErrorMessage, FormInput } from '@/shared/components';
import { Button } from '@/shared/ui';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserUpdate, updateUser } from '@/entities/User';
import { editFormSchema, TEditSchema } from '../models/editFormSchema';

type Props = {
  user: User;
};

export const FormEdit: React.FC<Props> = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const userDefaultValues = {
    name: user.name || '',
    lastName: user.lastName || '',
    email: user.email || '',
    adress: user.adress || '',
    password: '',
    newPassword: '',
    newConfirmPassword: '',
  };

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty, isSubmitSuccessful },
    reset,
    getValues,
  } = useForm<TEditSchema>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      ...userDefaultValues,
    },
  });

  const onSubmit: SubmitHandler<TEditSchema> = async data => {
    const userToUpdate = {
      id: user.id,
      email: data.email,
      name: data.name,
      lastName: data.lastName,
      adress: data.adress,
      password: data.password,
      newPassword: data.newPassword,
    } as UserUpdate;

    const req = await updateUser(userToUpdate);

    if (req.status === 'error') {
      setErrorMessage(req.message);
    }
  };

  const onCancel = () => {
    reset({
      ...userDefaultValues,
    });
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        ...getValues(),
        password: '',
        newPassword: '',
        newConfirmPassword: '',
      });
    }
  }, [isSubmitSuccessful, getValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2">
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="First Name"
              type="text"
              onChange={onChange}
              value={value}
              error={errors?.name?.message}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Last Name"
              type="text"
              onChange={onChange}
              value={value}
              error={errors?.lastName?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Email"
              type="text"
              onChange={onChange}
              value={value}
              error={errors?.email?.message}
            />
          )}
        />
        <Controller
          name="adress"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormInput
              label="Adress"
              type="text"
              onChange={onChange}
              value={value}
              error={errors?.adress?.message}
            />
          )}
        />
        <div className="col-span-full w-full lg:col-span-2">
          <p className="mb-2 text-sm font-semibold">Password changes</p>
          <div className="flex flex-col gap-4">
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  type="password"
                  placeholder="Current Password"
                  onChange={onChange}
                  value={value}
                  error={errors?.password?.message}
                />
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  type="password"
                  placeholder="New Password"
                  onChange={onChange}
                  value={value}
                  error={errors?.newPassword?.message}
                />
              )}
            />
            <Controller
              name="newConfirmPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  type="password"
                  placeholder="Confirm New Password"
                  onChange={onChange}
                  value={value}
                  error={errors?.newConfirmPassword?.message}
                />
              )}
            />
          </div>
        </div>
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <div className="mt-2 flex justify-end gap-8">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={!isDirty}
        >
          Cancel
        </Button>
        <Button
          className="px-6 lg:px-12"
          type="submit"
          loading={isSubmitting}
          disabled={!isDirty}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};
