import { User } from 'next-auth';

export type TResponseUser = {
  user: Pick<User, 'id' | 'email' | 'role'>;
  access_token: string;
  refresh_token: string;
};

export type TCredentials = {
  email: string;
  password: string;
};

export type TOAuthCredentials = {
  email: string;
  oAuthId: string;
};
