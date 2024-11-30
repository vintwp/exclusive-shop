'use server';

import { LOGIN_REG } from '@/shared/config';
import { ApiRequest } from '@/shared/api';
import { ApiError, ApiResponse, Credentials } from '@/shared/models';
import { TResponseUser } from '../models/responseUser';

const createUser = async (credentials: Credentials) => {
  try {
    const request = await ApiRequest.postData<TResponseUser, Credentials>(
      LOGIN_REG,
      credentials,
    );

    const res: ApiResponse<'success', TResponseUser> = {
      status: 'success',
      data: request,
    };

    return res;
  } catch (err) {
    const error = err as ApiError;

    const res: ApiResponse<'error'> = {
      status: 'error',
      code: error.status,
      message: error.message,
    };

    return res;
  }
};

export { createUser };
