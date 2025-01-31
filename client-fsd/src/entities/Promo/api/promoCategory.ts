import axios from '@/shared/api/axios';
import { ApiError, ResponseApi } from '@/shared/models';
import { PROMO_CATEGORY_API } from '@/shared/config';
import { TPromoCategory } from '../model';

const getPromoCategory = async () => {
  try {
    const category = await axios.getData<TPromoCategory>(PROMO_CATEGORY_API);

    return {
      ok: true,
      data: category,
    } as ResponseApi<TPromoCategory>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { getPromoCategory };
