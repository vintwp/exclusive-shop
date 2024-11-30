'use server';

import axios from '@/shared/api/axios';
import { auth, USER_UPDATE_PROFILE } from '@/shared/config';
import { ApiError, ApiResponse } from '@/shared/models';
import { User, UserUpdate } from '../model';

const updateUser = async (userUpdated: UserUpdate) => {
  const authSession = await auth();

  if (authSession) {
    const accessToken = authSession.access_token;

    try {
      const req = await axios.postData<User, UserUpdate>(
        USER_UPDATE_PROFILE,
        userUpdated,
        accessToken,
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

export { updateUser };
