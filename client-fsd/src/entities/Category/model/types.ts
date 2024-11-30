import { MultipleSelectorOption } from '@/shared/components';

/* eslint-disable @typescript-eslint/indent */
type StoreGeneral = {
  id: string;
  name: string;
  url: string;
  [key: string]: string;
};

type CategoryBasic = {
  id: string;
  name: string;
  primaryStoreId: string;
  store: string;
  image: string;
  displayOnMainPage: boolean;
  url: string;
  createdAt: string;
  updatedAt: string;
};

type CategoryFromServer = CategoryBasic & {
  primaryStore: StoreGeneral;
  additionalStores: StoreGeneral[];
};

type Category = CategoryBasic & {
  primaryStore: StoreGeneral;
  additionalStores: StoreGeneral[];
};

type CategorySubmit = Omit<
  CategoryBasic,
  'store' | 'createdAt' | 'updatedAt' | 'id' | 'image' | 'url'
> & { id?: string; image?: File[]; additionalStores: MultipleSelectorOption[] };

export type { Category, CategoryFromServer, CategorySubmit };
