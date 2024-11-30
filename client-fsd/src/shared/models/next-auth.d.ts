/* eslint-disable import/no-extraneous-dependencies */
import '@auth/core/types';
import '@auth/core/jwt';

import { type DefaultSession } from 'next-auth';
import { UserRole } from './types';

declare module 'next-auth' {
  interface User {
    role: UserRole;
    access_token: string;
    refresh_token: string;
  }

  interface Session {
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession['user'];
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    user: Pick<User, 'id' | 'email'> & {
      role: UserRole;
    };
    access_token: string;
    refresh_token: string;
  }
}
