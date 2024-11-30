import { Category, Store } from "@prisma/client";


export type TCategoryResponseDB = Category & {
  primaryStore: Store;
  additionalStores: Array<{store: Store}>;
}


export type TCategoryRequest = Omit<Category, 'createdAt' | 'updatedAt' | 'url' | 'image' | 'displayOnMainPage'> & {
  id: string,
  name: string,
  primaryStoreId: string,
  additionalStoreId: string,
  displayOnMainPage: string,
}

export type TCategoryResponseServer = Omit<Category, 'id'> & {id: string} & {
  primaryStore: Omit<Store, 'id'> & {id: string};
  additionalStores: Array<Omit<Store, 'id'> & {id: string}>;
}
