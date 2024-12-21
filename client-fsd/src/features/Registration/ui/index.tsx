/* eslint-disable import/no-extraneous-dependencies */

'use client';

import { Button, Spinner } from '@/shared/ui';
import Link from 'next/link';
import React, { useState } from 'react';
import { AuthFormInput } from '@/shared/components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GoogleIcon from '@/shared/assets/icons/google.svg';
import Image from 'next/image';
import { TSignupSchema, signupSchema } from '../models/signupFormSchema';
import { createUser } from '../api';
import { signInByGoogle } from '../api/auth.oauth';

export const Registration: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TSignupSchema>({
    mode: 'onBlur',
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<TSignupSchema> = async data => {
    const req = await createUser(data);

    if (!req.ok) {
      setErrorMessage(req.message!);
    }
  };

  const authGoogle = async () => {
    await signInByGoogle();
  };

  return (
    <div className="w-full md:py-16">
      <h3 className="mb-3 text-2xl font-medium lg:mb-6 lg:text-4xl">
        Create an account
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
        <AuthFormInput
          placeholder="Confirm password"
          type="password"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
          onChange={() => {
            clearErrors('confirmPassword');
          }}
        />

        {errorMessage && (
          <div className="rounded-sm border-[1px] border-red-200 bg-clr-secondary-3/5 px-2 py-4">
            <p className="text-clr-secondary-3">{errorMessage}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner size="small" />
            ) : (
              <span>Create Account</span>
            )}
          </Button>
        </div>
      </form>
      <Button
        variant="outline"
        className="group flex w-full items-center gap-4"
        onClick={() => authGoogle()}
      >
        <Image
          src={GoogleIcon}
          width={24}
          height={24}
          priority
          alt="Sign up with Google"
          className="transition-opacity group-hover:opacity-80"
        />
        <span>Sign up with Google</span>
      </Button>
      <p className="mt-4 flex gap-4">
        <span>Already have account?</span>
        <Button
          variant="link"
          size="link"
          asChild
          className="font-semibold after:w-full hover:opacity-80"
        >
          <Link href="/api/auth/signin">Log in</Link>
        </Button>
      </p>
    </div>
  );
};
