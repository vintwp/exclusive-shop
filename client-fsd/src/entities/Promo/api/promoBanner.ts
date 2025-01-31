import axios from '@/shared/api/axios';
import { ApiError, ResponseApi } from '@/shared/models';
import { PROMO_BANNER_API } from '@/shared/config';
import { TPromoBanner } from '../model';

const getPromoBanner = async () => {
  try {
    const banner = await axios.getData<TPromoBanner[]>(PROMO_BANNER_API);

    return {
      ok: true,
      data: banner,
    } as ResponseApi<TPromoBanner[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { getPromoBanner };
