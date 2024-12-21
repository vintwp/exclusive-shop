import { User as UserDB } from "@prisma/client";
import { Tokens } from "../Tokens";

type TUserRegistration = Pick<UserDB, 'email' | 'password'>;

type TUserLogin = Partial<Pick<UserDB, 'email' | 'password'>> & { oAuthId?: string };

// type TUserLoginResponse = { user: Omit<UserDB, 'password'> } & Tokens;

type TUserLoginResponse<K extends keyof UserDB> = {
  user: {
    [key in K]: UserDB[key];
  }
} & Tokens;

type TUserResponse = Omit<UserDB, 'password'>;

type TUserUpdate = Omit<UserDB, 'id' | 'oauthId' | 'role' | 'createdAt' | 'updatedAt' | 'password'> & {
  password?: string;
  newPassword?: string;
}


export type { TUserRegistration, TUserLoginResponse, TUserResponse, TUserLogin, TUserUpdate };