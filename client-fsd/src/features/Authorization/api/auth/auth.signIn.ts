'use server';

import { NextAuthError } from '@/shared/models';
import { signIn } from '@/shared/config';
import { isRedirectError } from 'next/dist/client/components/redirect';
import type { TCredentials } from '../../models/types';

async function signInByCredentials(data: TCredentials) {
  try {
    const req = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirectTo: '/',
    });

    return {
      ok: true,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof NextAuthError) {
      return {
        error: true,
        errorMessage: error.message,
      };
    }

    return {
      error: true,
      errorMessage: 'Unexpected message',
    };
  }
}

export { signInByCredentials };
