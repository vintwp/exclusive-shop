'use server';

import { signOut } from '@/shared/config';

const signOutAction = async () => {
  await signOut({
    redirectTo: '/',
  });
};

export { signOutAction };
