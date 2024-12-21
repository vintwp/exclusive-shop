'use server';

import axios from '@/shared/api/axios';
import { auth, USER_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { User } from '../model';

const getUser = async () => {
  const authSession = await auth();

  if (authSession) {
    const userId = authSession.user.id;
    const accessToken = authSession.access_token;

    try {
      const req = await axios.getData<User>(
        `${USER_API}/${userId}`,
        accessToken,
      );

      return {
        ok: true,
        data: req,
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

export { getUser };
