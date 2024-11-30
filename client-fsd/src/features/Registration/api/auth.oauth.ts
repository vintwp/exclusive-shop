'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { NextAuthError } from '@/shared/models';
import { signIn } from '@/shared/config';

async function signInByGoogle() {
  try {
    await signIn('google', { redirectTo: '/' });

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

export { signInByGoogle };
