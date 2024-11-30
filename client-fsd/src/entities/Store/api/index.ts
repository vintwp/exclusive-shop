'use server';

import axios from '@/shared/api/axios';
import { auth, STORE_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { Store } from '../model';

const createStore = async (name: string): Promise<ResponseApi<Store>> => {
  const authSession = await auth();

  try {
    const req = await axios.postData<Store>(
      STORE_API,
      { name },
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

const getStore = async (): Promise<ResponseApi<Store[]>> => {
  try {
    const req = await axios.getData<Store[]>(STORE_API);

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

const getStoreById = async (id: string): Promise<ResponseApi<Store>> => {
  try {
    const req = await axios.getData<Store[]>(STORE_API);

    const store = req.filter(st => st.id === id)[0];

    return {
      ok: true,
      data: store,
    };
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    };
  }
};

const updateStore = async (
  updatedStore: Pick<Store, 'id' | 'name'>,
): Promise<ResponseApi<Store>> => {
  const authSession = await auth();

  try {
    const req = await axios.putData<Store>(
      STORE_API,
      updatedStore,
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

const deleteStore = async (id: string): Promise<ResponseApi<Store>> => {
  const authSession = await auth();

  try {
    const req = await axios.deleteData<Store>(
      STORE_API,
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

export { createStore, getStore, getStoreById, updateStore, deleteStore };
