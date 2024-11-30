'use server';

import axios from '@/shared/api/axios';
import { auth, USER_GET_PROFILE } from '@/shared/config';
import { ApiError, ApiResponse } from '@/shared/models';
import { User } from '../model';

type UserId = {
  id: string;
};

const getUser = async () => {
  const authSession = await auth();

  if (authSession) {
    const userId = authSession.user.id;
    const accessToken = authSession.access_token;

    try {
      const req = await axios.getData<User, UserId>(
        USER_GET_PROFILE,
        accessToken,
        { id: userId },
      );

      return {
        status: 'ok',
        data: req,
      } as ApiResponse<'success', User>;
    } catch (err) {
      const error = err as ApiError;

      return {
        status: 'error',
        message: error.message,
      } as ApiResponse<'error'>;
    }
  }

  return {
    status: 'error',
    message: 'Unexpected Error',
  } as ApiResponse<'error'>;
};

export { getUser };
