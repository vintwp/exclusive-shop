'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormInput, ErrorMessage } from '@/shared/components';
import { Button, Spinner } from '@/shared/ui';
import { TSigninSchema, signinSchema } from '../models/signinFormSchema';
import { signInByCredentials } from '../api';

export const Authorization: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TSigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<TSigninSchema> = async data => {
    const req = await signInByCredentials(data);

    if (req && !req.ok) {
      setErrorMessage(req.message);
    }

    if (!req && errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="w-full md:py-16">
      <h3 className="mb-3 text-2xl font-medium lg:mb-6 lg:text-4xl">
        Log in to Exclusive
      </h3>
      <p className="font-base">Enter your details below</p>
      <form
        className="mb-4 mt-6 flex flex-col gap-5 md:mt-12 md:gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AuthFormInput
          placeholder="Email"
          errorMessage={errors.email?.message}
          {...register('email')}
          autoComplete="on"
          onChange={() => {
            clearErrors('email');
          }}
        />
        <AuthFormInput
          placeholder="Password"
          type="password"
          {...register('password')}
          errorMessage={errors.password?.message}
          autoComplete="on"
          onChange={() => {
            clearErrors('password');
          }}
        />

        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}

        <div className="flex justify-between">
          <Button
            type="submit"
            className="w-36"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner size="small" /> : <span>Log In</span>}
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-clr-button-2 hover:bg-transparent hover:text-clr-button-hov"
          >
            <Link href="/forgot-password">Forget Password?</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};
