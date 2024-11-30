import { User } from "@prisma/client";

type TUserUpdate = Omit<User, 'oauthId' | 'role' | 'createdAt' | 'updatedAt' | 'phonenum'> & {
  password?: string;
  newPassword?: string;
}
export { type TUserUpdate };