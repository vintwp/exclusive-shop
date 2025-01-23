import bcrypt from 'bcrypt';
import { prisma } from "../prisma";
import ApiError from '../error/ApiError';
import { $Enums, User } from '@prisma/client';
import { deleteProperties, generateJwt, vefiryJwt, dateInISO, hashPassword, comparePassword } from '../lib';
import { TUserResponse, TUserUpdate } from '../types';
import { TUserLoginResponse } from '../src/types/User';

const defaultRole = $Enums.Role.USER;


// #region Common Functions 

function createResponseUser(user: User) {
  const accessToken = generateJwt({ userId: user.id, email: user.email, role: user.role }, 'access');
  const refreshToken = generateJwt({ userId: user.id, email: user.email, role: user.role }, 'refresh');

  const response: TUserLoginResponse<'id' | 'email' | 'role'> = {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    access_token: accessToken,
    refresh_token: refreshToken,
  };

  return response;
};

async function createUserInDB(
  email: string, password?: string, oauthId?: string, role = defaultRole
) {
  const hashedPassword = password ? await hashPassword(password): undefined;

  const user = await prisma.user.create({
    data: {
      email,
      password: password && hashedPassword,
      oauthId: oauthId && oauthId,
      role,
      wishlist: {
        create: {}
      },
      cart: {
        create: {}
      }
    },
  });

  const response = createResponseUser(user);

  return response;
};

// #endregion


class UserService {
  async registration(email: string, password: string, role = defaultRole) {
    
    if (!email || !password) {
      throw ApiError.badRequest('No email or password provided');
    }

    const isUserExist = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (isUserExist) {
      throw ApiError.alreadyExist('Email is used. Please provide another email');
    };
    
    try {
      const user = await createUserInDB(email, password, role);

      return user;
    } catch (error) {
      throw ApiError.internal('Error caused by internal fault.');
    }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    });

    if (!user) {
      throw ApiError.forbidden('User is not found');
    }

    const isTruePass = await comparePassword(password, user.password);

    if (!isTruePass) {
      throw ApiError.forbidden('Password is incorrect');
    }

    const response = createResponseUser(user);

    return response;
  }

  async loginOAuth(email: string, id: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        oauthId: id,
      }
    });

    try {
      if (!user) {
        const user = await createUserInDB(email, undefined, id);

        return user;
      }

      const response = createResponseUser(user);

      return response;
    } catch (error) {
      throw ApiError.internal('Error caused by internal fault.');
    }
  }

  async getProfile(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id: +id,
      }
    });

    if (!user) {
      throw ApiError.forbidden('User is not found');
    }

    const userResponse = deleteProperties(
      user,
      ['password'],
    );

    return userResponse;
  }

  async updateProfile(id: string, updateData: TUserUpdate) {
    const { password: passwordFromDB } = await prisma.user.findUnique({
      where: {
        id: +id,
      }
    });

    const {
      password: userPasswordCurrent,
      newPassword: userPasswordNew
    } = updateData;

    const updateUserData = deleteProperties(updateData, ['id', 'newPassword', 'password']);

    if (passwordFromDB && userPasswordNew) {
      const isValidPassword = bcrypt.compareSync(userPasswordCurrent, passwordFromDB);

      if (!isValidPassword) {
        throw ApiError.forbidden('Incorrect password. Please provide correct password again');
      }

      const hashedNewPassword = await bcrypt.hash(userPasswordNew, 5);

      const req = await prisma.user.update({
        where: {
          id: +id,
        }, data: {
          ...updateUserData,
          password: hashedNewPassword,
        }
      });

      const userResponse = deleteProperties(req, ['password', 'createdAt', 'updatedAt', 'role']);

      return userResponse;
    }

    if (passwordFromDB && !userPasswordNew || !userPasswordNew) {
      const req = await prisma.user.update({
        where: {
          id: +id,
        }, data: {
          ...updateUserData,
        }
      });

      const userResponse = deleteProperties(req, ['password', 'createdAt', 'updatedAt', 'role']);

      return userResponse;
    }

    if (!passwordFromDB && userPasswordNew) {
      const hashedNewPassword = await bcrypt.hash(userPasswordNew, 5);

      const req = await prisma.user.update({
        where: {
          id: +id,
        }, data: {
          ...updateUserData,
          password: hashedNewPassword,
        }
      });

      const userResponse = deleteProperties(req, ['password', 'createdAt', 'updatedAt', 'role']);

      return userResponse;
    }
  }

  async refreshToken(token: string) {
    try {
      const verifiedToken = vefiryJwt(token, 'refresh');
      if (!verifiedToken) {
        throw ApiError.forbidden('Token in not valid. Try to login again');
      }

      const { email, userId, role, exp } = verifiedToken;

      const accessToken = generateJwt({ userId, email, role }, 'access');


      // checking token to expire 10 minutes or less
      const refreshToken
        =  exp * 1000 - Date.now() <= 10 * 60 * 1000
          ? generateJwt({ userId, email, role }, 'refresh')
          : token;


      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      }

    } catch {
      throw ApiError.forbidden('Token in not valid. Try to login again');
    }
  }

  async getAll() {
    const users = await prisma.user.findMany();

    return users;
  }

};

export default new UserService();