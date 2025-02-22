'use server';

import axios from '@/shared/api/axios';
import {
  auth,
  ITEM_API,
  ITEM_SALES,
  ITEM_BEST_SELLING,
  ITEM_OUR,
} from '@/shared/config';
import { ApiError, ResponseApi } from '@/shared/models';
import { TItem } from '../model';

const getItemById = async (id: string) => {
  try {
    const item = await axios.getData<TItem>(`${ITEM_API}/${id}`);

    return {
      ok: true,
      data: item,
    } as ResponseApi<TItem>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getFlashSales = async () => {
  type TFlashSales = {
    items: TItem[];
    timerEnds: string;
  };

  try {
    const items = await axios.getData<TFlashSales>(ITEM_SALES);

    return {
      ok: true,
      data: items,
    } as ResponseApi<TFlashSales>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getBestSelling = async (qty = 10) => {
  try {
    const items = await axios.getData<TItem[]>(
      `${ITEM_BEST_SELLING}?${qty && `query=${qty}`}`,
    );

    return {
      ok: true,
      data: items,
    } as ResponseApi<TItem[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

const getOurItems = async (qty: number) => {
  try {
    const items = await axios.getData<TItem[]>(
      `${ITEM_OUR}?${qty && `query=${qty}`}`,
    );

    return {
      ok: true,
      data: items,
    } as ResponseApi<TItem[]>;
  } catch (err) {
    const error = err as ApiError;

    return {
      status: error.status,
      message: error.message,
    } as ResponseApi;
  }
};

export { getItemById, getFlashSales, getBestSelling, getOurItems };
