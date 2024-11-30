import { User } from "@prisma/client";

type TUserResponse = {
  user: Omit<User, 'password'>,
  access_token: string;
  refresh_token: string;
};

export { type TUserResponse };