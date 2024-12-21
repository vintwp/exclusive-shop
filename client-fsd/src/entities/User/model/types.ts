import type { UserRole } from '@/shared/models';

type User = {
  id: string;
  oauthId: string | null;
  email: string;
  name: string | null;
  lastName: string | null;
  phonenum: string | null;
  adress: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

type UserUpdate = Omit<
  User,
  'id' | 'role' | 'createdAt' | 'updatedAt' | 'oauthId'
> & {
  password?: string;
  newPassword?: string;
  newConfirmPassword?: string;
};

export type { User, UserUpdate };
