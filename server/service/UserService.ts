import bcrypt from 'bcrypt';
import { prisma } from "../prisma";
import ApiError from '../error/ApiError';
import { $Enums, User } from '@prisma/client';
import { deleteProperties, generateJwt, vefiryJwt, dateInISO, hashPassword, comparePassword } from '../lib';
import { TUserResponse, TUserUpdate } from '../types';

const defaultRole = $Enums.Role.USER;

class UserService {
  async registration(email: string, password: string, role = defaultRole) {
    
    if (!email || !password) {
      throw ApiError.badRequest('No email or password provided');
    }

    const userToCreate = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userToCreate) {
      throw ApiError.alreadyExist('Email is used. Please provide another email');
    }

    const hashedPassword = await hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      }
    });

    const jwtTokenAccess = generateJwt({ userId: user.id, email: user.email, role: user.role });
    const jwtTokenRefresh = generateJwt({ userId: user.id, email: user.email, role: user.role }, 'refresh');

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      access_token: jwtTokenAccess,
      refresh_token: jwtTokenRefresh,
    } as TUserResponse;
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

    const accessToken = generateJwt({ userId: user.id, email: user.email, role: user.role }, 'access');
    const refreshToken = generateJwt({ userId: user.id, email: user.email, role: user.role }, 'refresh');

    const userResponse = deleteProperties<User>(
      user,
      ['password', 'name', 'adress', 'createdAt', 'phonenum', 'updatedAt'],
    );

    // const cart = await prisma.basket.findUnique({
    //   where: {
    //     userId: user.id
    //   }
    // });

    // const wishlist = await prisma.wishlist.findUnique({
    //   where: {
    //     userId: user.id
    //   }
    // });

    return {
      user: userResponse,
      access_token: accessToken,
      refresh_token: refreshToken,
    } as TUserResponse;
  }

  async loginOAuth(email: string, id: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
        oauthId: id,
      }
    });

    if (!user) {
      const user = await prisma.user.create({
        data: {
          email,
          role: defaultRole,
          oauthId: id,
        }
      });
  
      await prisma.basket.create({
        data: {
          userId: user.id,
        }
      });
  
      await prisma.wishlist.create({
        data: {
          userId: user.id,
        }
      });

      const userResponse = deleteProperties(
        user,
        ['password', 'name', 'adress', 'createdAt', 'phonenum', 'updatedAt'],
      );

      const accessToken = generateJwt({
        userId: userResponse.id,
        email,
        role: userResponse.role,
      }, 'access');
      const refreshToken = generateJwt({
        userId: userResponse.id,
        email,
        role: userResponse.role,
      }, 'refresh');

      return {
        user: userResponse,
        access_token: accessToken,
        refresh_token: refreshToken,
      } as TUserResponse;

    }

    const userResponse = deleteProperties(
      user,
      ['password', 'name', 'adress', 'createdAt', 'phonenum', 'updatedAt'],
    );

    const accessToken = generateJwt({
      userId: userResponse.id,
      email,
      role: userResponse.role,
    }, 'access');
    const refreshToken = generateJwt({
      userId: userResponse.id,
      email,
      role: userResponse.role,
    }, 'refresh');

    return {
      user: userResponse,
      access_token: accessToken,
      refresh_token: refreshToken,
    } as TUserResponse;
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

    const userResponse = deleteProperties<User>(
      user,
      ['password'],
    );

    return userResponse;
  }

  async updateProfile(userUpdateData: TUserUpdate) {
    const { id: dbUserId, password: dbUserPasswordHashed } = await prisma.user.findUnique({
      where: {
        id: userUpdateData.id,
      }
    });

    const {
      id: updateUserId,
      password: updateUserPassword,
      newPassword: updateUserNewPassword
    } = userUpdateData;

    const updateUserData = deleteProperties<TUserUpdate>(userUpdateData, ['id', 'newPassword', 'password']);
    const dbUserPassword = dbUserPasswordHashed === '[null]' ? null : dbUserPasswordHashed;

    const currentDate = dateInISO();

    if (dbUserPassword && updateUserNewPassword) {
      const isValidPassword = bcrypt.compareSync(updateUserPassword, dbUserPasswordHashed);

      if (!isValidPassword) {
        throw ApiError.forbidden('Incorrect password. Please provide correct password again');
      }

      const hashedNewPassword = await bcrypt.hash(updateUserNewPassword, 5);

      const req = await prisma.user.update({
        where: {
          id: updateUserId,
        }, data: {
          ...updateUserData,
          password: hashedNewPassword,
          updatedAt: currentDate
        }
      });

      const userResponse = deleteProperties<User>(req, ['password', 'createdAt', 'updatedAt', 'role']);

      return userResponse;
    }

    if (dbUserPassword && !updateUserNewPassword || !updateUserNewPassword) {
      const req = await prisma.user.update({
        where: {
          id: updateUserId,
        }, data: {
          ...updateUserData,
          updatedAt: currentDate
        }
      });

      const userResponse = deleteProperties<User>(req, ['password', 'createdAt', 'updatedAt', 'role']);

      return userResponse;
    }

    if (!dbUserPassword && updateUserNewPassword) {
      const hashedNewPassword = await bcrypt.hash(updateUserNewPassword, 5);

      const req = await prisma.user.update({
        where: {
          id: updateUserId,
        }, data: {
          ...updateUserData,
          password: hashedNewPassword,
          updatedAt: currentDate,
        }
      });

      const userResponse = deleteProperties<User>(req, ['password', 'createdAt', 'updatedAt', 'role']);

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