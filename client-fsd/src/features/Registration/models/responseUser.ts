import { User } from '@/entities/User/model';

type TResponseUser = Pick<User, 'id' | 'email' | 'role'> & {
  access_token: string;
};

export type { TResponseUser };
