/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import ApiError from '../models/apiError';

type AxiosErrorMessage = {
  message?: string;
};

type AxiosErrorResponse = AxiosErrorMessage & {
  status?: number;
};

const axiosInstance = axios.create();

const headerWithAuth = (accessToken: string | undefined) => {
  const header: Pick<AxiosRequestConfig, 'headers'> = {
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  };

  return header;
};

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError<AxiosErrorMessage>) => {
    const response: AxiosErrorResponse = {
      status: error.status || 400,
      message: error.response?.data?.message || 'Unexpected message',
    };

    return Promise.reject(response);
  },
);

class ApiRequest {
  async getData<T>(
    url: string,
    accessToken?: string,
    reqData?: Partial<T>,
    config?: AxiosRequestConfig,
  ) {
    try {
      const request = await axiosInstance.get<T>(url, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
        data: reqData ? { ...reqData } : undefined,
        ...config,
      });

      return request.data;
    } catch (err) {
      const error = err as AxiosError;

      throw new ApiError({
        status: error.status,
        message: error.message,
      });
    }
  }

  async postData<T>(
    url: string,
    data: Partial<T>,
    accessToken?: string,
    config?: AxiosRequestConfig,
  ) {
    try {
      const request = await axiosInstance.post<T>(url, data, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
        ...config,
      });

      return request.data;
    } catch (err) {
      const error = err as AxiosErrorResponse;

      throw new ApiError({
        status: error.status,
        message: error.message,
      });
    }
  }

  async postFormData<T>(url: string, formData: FormData, accessToken?: string) {
    try {
      const request = await axiosInstance.postForm<T>(url, formData, {
        ...headerWithAuth(accessToken),
      });

      return request.data;
    } catch (err) {
      const error = err as AxiosErrorResponse;

      throw new ApiError({
        status: error.status,
        message: error.message,
      });
    }
  }

  async putFormData<T>(url: string, formData: FormData, accessToken?: string) {
    try {
      const request = await axiosInstance.putForm<T>(url, formData, {
        ...headerWithAuth(accessToken),
      });

      return request.data;
    } catch (err) {
      const error = err as AxiosErrorResponse;

      throw new ApiError({
        status: error.status,
        message: error.message,
      });
    }
  }

  async putData<T>(
    url: string,
    data: Partial<T>,
    accessToken?: string,
    config?: AxiosRequestConfig,
  ) {
    try {
      const request = await axiosInstance.put<T>(url, data, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
        ...config,
      });

      return request.data;
    } catch (err) {
      const error = err as AxiosErrorResponse;

      throw new ApiError({
        status: error.status,
        message: error.message,
      });
    }
  }

  async deleteData<T, K = string>(
    url: string,
    params: K,
    accessToken?: string,
    config?: AxiosRequestConfig,
  ) {
    try {
      const request = await axiosInstance.delete(`${url}/${params}`, {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
        ...config,
      });

      return request.data as T;
    } catch (err) {
      const error = err as AxiosErrorResponse;

      throw new ApiError({
        status: error.status,
        message: error.message,
      });
    }
  }
}

export default new ApiRequest();
