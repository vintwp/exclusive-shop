'use server';

import axios from '@/shared/api/axios';
import { ApiError, ResponseApi } from '@/shared/models';
import { auth, CONTACT_MESSAGE_API } from '@/shared/config';
import { ContactMessage } from '../model';

type ContactMessageToCreate = Omit<ContactMessage, 'id' | 'createdAt'>;

const getContactMessages = async () => {
  const authSession = await auth();

  try {
    const req = await axios.getData<ContactMessage[]>(
      CONTACT_MESSAGE_API,
      authSession?.access_token,
    );

    return {
      ok: true,
      data: req,
    } as ResponseApi<ContactMessage[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const createContactMessage = async (data: ContactMessageToCreate) => {
  try {
    const message = await axios.postData<ContactMessageToCreate>(
      CONTACT_MESSAGE_API,
      data,
    );

    return {
      ok: true,
      data: message,
    } as ResponseApi<ContactMessage>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { getContactMessages, createContactMessage };
