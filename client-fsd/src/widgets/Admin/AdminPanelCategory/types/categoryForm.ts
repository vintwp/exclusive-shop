import { Category } from '@/entities/Category';

type TCategoryFormFields =
  | 'name'
  | 'primaryStoreId'
  | 'additionalStores'
  | 'displayOnMainPage'
  | 'id';

export type TCategoryForm = Pick<Category, TCategoryFormFields> & {
  image: File[];
};
