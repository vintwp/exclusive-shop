import { prisma } from "../prisma";
import { Store } from "@prisma/client";
import { createUrl } from "../lib";

class StoreService {
  async create(name: NonNullable<string>) {
    const req = await prisma.store.create({
      data: {
        name,
        url: createUrl(name),
      }
    });

    return req as Store;
  }

  async update(store: Pick<Store, 'id' | 'name'>) {
    const { id, name } = store;

    const req = await prisma.store.update({
      where: {
        id
      }, data: {
        name,
        url: createUrl(name)
      }
    });

    return req as Store;
  }

  async get() {
    const req = await prisma.store.findMany();
    
    return req as Array<Store>;
  }

  async delete(id: number) {
    const req = await prisma.store.delete({
      where: {
        id,
      }
    });

    return req as Store
  }
}
//   async addCategories(storeId: number, categoryId: number | number[]) {
//     const updatedStoreCategories = await prisma.store.update({
//       where: {
//         id: storeId
//       }, data: {
//         categories: {
//           connectOrCreate: {

//           }
//         }
//       }
//     });

//     return updatedStoreCategories as Store;
//   }
// }

export default new StoreService();