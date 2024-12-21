'use server';

import axios from '@/shared/api/axios';
import { auth, CATEGORY_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { Category } from '../model';

const createCategory = async (data: FormData) => {
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
    } as ResponseApi<Category>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getCategory = async () => {
  try {
    const req = await axios.getData<Category[]>(CATEGORY_API);

    return {
      ok: true,
      data: req,
    } as ResponseApi<Category[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getCategoryById = async (id: string) => {
  try {
    const category = await axios.getData<Category>(`${CATEGORY_API}/${id}`);

    return {
      ok: true,
      data: category,
    } as ResponseApi<Category>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const updateCategory = async (id: string, data: FormData) => {
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
    } as ResponseApi<Category>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const deleteCategory = async (id: string) => {
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
    } as ResponseApi<Category>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
