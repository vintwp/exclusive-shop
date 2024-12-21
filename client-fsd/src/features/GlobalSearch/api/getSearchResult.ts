'use server';

import { axios } from '@/shared/api';
import { SEARCH_API } from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { TSearch } from '../models/TSearch';

export async function getSearchResult(query: string) {
  try {
    const queryStringEncoded = encodeURI(query);

    const request = await axios.getData<TSearch[]>(
      `${SEARCH_API}?query=${queryStringEncoded}`,
    );

    return {
      ok: true,
      data: request,
    } as ResponseApi<TSearch[]>;
  } catch (err) {
    const error = err as ApiError;

    throw new ApiError({
      status: error.status,
      message: error.message,
    });
  }
}
