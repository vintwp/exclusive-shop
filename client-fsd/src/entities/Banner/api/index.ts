import axios from '@/shared/api/axios';
import { ApiError, ResponseApi } from '@/shared/models';
import { BANNER_API } from '@/shared/config';
import { TBanner } from '../model';

const getBanner = async () => {
  try {
    const banner = await axios.getData<TBanner[]>(BANNER_API);

    return {
      ok: true,
      data: banner,
    } as ResponseApi<TBanner[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { getBanner };
