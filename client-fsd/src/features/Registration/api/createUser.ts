'use server';

import { LOGIN_REG } from '@/shared/config';
import { axios } from '@/shared/api';
import { ApiError, Credentials, ResponseApi } from '@/shared/models';
import { TResponseUser } from '../models/responseUser';

const createUser = async (credentials: Credentials) => {
  try {
    const request = await axios.postData<TResponseUser, Credentials>(
      LOGIN_REG,
      credentials,
    );

    const res: ResponseApi<TResponseUser> = {
      ok: true,
      data: request,
    };

    return res;
  } catch (err) {
    const error = err as ApiError;

    const res: ResponseApi = {
      status: error.status,
      message: error.message,
    };

    return res;
  }
};

export { createUser };
