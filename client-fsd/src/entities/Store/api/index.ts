'use server';

import axios from '@/shared/api/axios';
import { auth, STORE_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { Store } from '../model';

const createStore = async (name: string) => {
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
    } as ResponseApi<Store>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getStore = async () => {
  try {
    const req = await axios.getData<Store[]>(STORE_API);

    return {
      ok: true,
      data: req,
    } as ResponseApi<Store[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getStoreById = async (id: string) => {
  try {
    const req = await axios.getData<Store[]>(STORE_API);

    const store = req.filter(st => st.id === id)[0];

    return {
      ok: true,
      data: store,
    } as ResponseApi<Store>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const updateStore = async (updatedStore: Pick<Store, 'id' | 'name'>) => {
  const authSession = await auth();

  try {
    const req = await axios.putData<Store>(
      `${STORE_API}/${updatedStore.id}`,
      updatedStore,
      authSession?.access_token,
    );

    return {
      ok: true,
      data: req,
    } as ResponseApi<Store>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const deleteStore = async (id: string) => {
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
    } as ResponseApi<Store>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { createStore, getStore, getStoreById, updateStore, deleteStore };
