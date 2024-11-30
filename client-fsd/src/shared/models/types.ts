const role = {
  admin: 'ADMIN',
  user: 'USER',
} as const;

type UserRole = (typeof role)[keyof typeof role];

type Credentials = {
  email: string;
  password: string;
};

export type { UserRole, Credentials };
