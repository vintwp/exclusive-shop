'use server';

import { NextAuthError, ResponseApi } from '@/shared/models';
import { signIn } from '@/shared/config';
import { isRedirectError } from 'next/dist/client/components/redirect';
import type { TCredentials } from '../../models/types';

async function signInByCredentials(data: TCredentials) {
  try {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirectTo: '/',
    });

    return {
      ok: true,
      message: 'test',
    } as ResponseApi<never>;
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof NextAuthError) {
      return {
        status: 403,
        message: error.message,
      } as ResponseApi;
    }

    return {
      status: 400,
      message: 'Unexpected message',
    } as ResponseApi;
  }
}

export { signInByCredentials };
