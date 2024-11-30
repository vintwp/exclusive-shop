/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-param-reassign */
import { NextAuthConfig } from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthError, ApiError } from '@/shared/models';
import { ApiRequest } from '@/shared/api';
import {
  AUTH_SECRET,
  LOGIN_REFRESH,
  LOGIN_URL,
  AUTH_GOOGLE_ID,
  AUTH_GOOGLE_SECRET,
} from '../env-variables';
import { TResponseUser, TCredentials, TOAuthCredentials } from './types';

type RefreshedTokens = {
  access_token: string;
  refresh_token: string;
};

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const request = await ApiRequest.postData<
            TResponseUser,
            TCredentials
          >(LOGIN_URL, { ...credentials } as TCredentials);
          const { user, access_token, refresh_token } = request;

          return {
            ...user,
            access_token,
            refresh_token,
          };
        } catch (err) {
          const error = err as ApiError;

          throw new NextAuthError(error.message);
        }
      },
    }),
    Google({
      clientId: AUTH_GOOGLE_ID,
      clientSecret: AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/api/auth/signin',
  },
  secret: AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (profile && account) {
        const { email } = profile;
        const { providerAccountId } = account;

        try {
          const request = await ApiRequest.postData<
            TResponseUser,
            TOAuthCredentials
          >(LOGIN_URL, {
            email,
            oAuthId: providerAccountId,
          } as TOAuthCredentials);

          const { access_token, refresh_token, user: requestedUser } = request;

          token.user = requestedUser;

          return {
            ...token,
            access_token,
            refresh_token,
          };
        } catch {
          return { ...token };
        }
      }

      if (user) {
        const { id, email, role, access_token, refresh_token } = user;

        const userJWT = { id, email, role };

        token.user = userJWT;

        return { ...token, access_token, refresh_token };
      }

      const { access_token, refresh_token } = token;
      const accessTokenDecoded = jwtDecode(access_token);

      if (
        accessTokenDecoded?.exp &&
        Date.now() >= accessTokenDecoded.exp * 1000
      ) {
        const tokens = await ApiRequest.getData<RefreshedTokens>(
          LOGIN_REFRESH,
          refresh_token,
        );

        return {
          ...token,
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        };
      }

      return { ...token, access_token, refresh_token };
    },
    async session({ session, token }) {
      const sessionUser = { ...session.user, ...token.user };

      session.access_token = token.access_token;
      session.user = sessionUser;

      return session;
    },
  },
};
