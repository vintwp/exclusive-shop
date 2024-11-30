'use server';

import axios from '@/shared/api/axios';
import { auth, CATEGORY_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { Category } from '../model';

const createCategory = async (
  data: FormData,
): Promise<ResponseApi<Category>> => {
  const authSession = await auth();

  try {
    const req = await axios.postFormData<Category>(
      CATEGORY_API,
      data,
      authSession?.access_token,
    );

    return {
      ok: true,
      data: req,
    };
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    };
  }
};

const getCategory = async (): Promise<ResponseApi<Category[]>> => {
  try {
    const req = await axios.getData<Category[]>(CATEGORY_API);

    return {
      ok: true,
      data: req,
    };
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    };
  }
};

const getCategoryById = async (id: string): Promise<ResponseApi<Category>> => {
  try {
    const category = await axios.getData<Category>(`${CATEGORY_API}/${id}`);

    return {
      ok: true,
      data: category,
    };
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    };
  }
};

const updateCategory = async (
  id: string,
  data: FormData,
): Promise<ResponseApi<Category>> => {
  const authSession = await auth();

  try {
    const req = await axios.putFormData<Category>(
      `${CATEGORY_API}/${id}`,
      data,
      authSession?.access_token,
    );

    return {
      ok: true,
      data: req,
    };
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    };
  }
};

const deleteCategory = async (id: string): Promise<ResponseApi<Category>> => {
  const authSession = await auth();

  try {
    const req = await axios.deleteData<Category>(
      CATEGORY_API,
      id,
      authSession?.access_token,
    );

    return {
      ok: true,
      data: req,
    };
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    };
  }
};

export {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
