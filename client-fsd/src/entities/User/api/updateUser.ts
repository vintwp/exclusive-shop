'use server';

import axios from '@/shared/api/axios';
import { auth, USER_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { User, UserUpdate } from '../model';

const updateUser = async (id: string, userUpdated: UserUpdate) => {
  const authSession = await auth();

  if (authSession) {
    const accessToken = authSession.access_token;

    try {
      const req = await axios.postData<User, UserUpdate>(
        `${USER_API}/${id}`,
        userUpdated,
        accessToken,
      );

      return {
        ok: true,
        data: req,
        message: 'You profile has been successfully updated',
      } as ResponseApi<User>;
    } catch (err) {
      const error = err as ApiError;

      return {
        status: error.status,
        message: error.message,
      } as ResponseApi;
    }
  }

  return {
    status: 400,
    message: 'Unexpected error',
  } as ResponseApi;
};

export { updateUser };
