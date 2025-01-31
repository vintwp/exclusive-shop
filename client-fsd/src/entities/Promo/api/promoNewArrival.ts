import axios from '@/shared/api/axios';
import { ApiError, ResponseApi } from '@/shared/models';
import { PROMO_NEW_ARRIVAL_API } from '@/shared/config';
import { TPromoNewArrival } from '../model';

const getPromoNewArrival = async () => {
  try {
    const newArrival = await axios.getData<TPromoNewArrival[]>(
      PROMO_NEW_ARRIVAL_API,
    );

    return {
      ok: true,
      data: newArrival,
    } as ResponseApi<TPromoNewArrival[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { getPromoNewArrival };
